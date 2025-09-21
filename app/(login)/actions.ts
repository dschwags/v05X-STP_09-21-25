'use server';

import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import {
  User,
  users,
  activityLogs,
  type NewUser,
  type NewActivityLog,
  ActivityType,
  UserRole,
  EducationLevel,
  EducationalStatus,
} from '@/lib/db/schema';
import { comparePasswords, hashPassword, setSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { getUser } from '@/lib/db/queries';
import {
  validatedAction,
  validatedActionWithUser
} from '@/lib/auth/middleware';
import { validateDemoCredentials, getDemoUser, FALLBACK_MODE_ENABLED } from '@/lib/db/fallback-mode';
// BugX v1.4.1: Skip complex validation for credit efficiency
// import { registrationSchema, type RegistrationFormData } from '@/lib/validation/registration-schemas';

async function logActivity(
  userId: number,
  type: ActivityType,
  ipAddress?: string,
  metadata?: string
) {
  const newActivity: NewActivityLog = {
    userId,
    action: type,
    ipAddress: ipAddress || '',
    metadata: metadata || null
  };
  await db.insert(activityLogs).values(newActivity);
}

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100)
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;
  
  console.log('🔍 BugX Debug: Sign-in attempt:', { email, passwordLength: password.length });

  // BugX Plan C: Demo mode fallback with session sync fix
  if (FALLBACK_MODE_ENABLED) {
    console.log('🎭 BugX: Demo mode active, checking credentials');
    if (await validateDemoCredentials(email, password)) {
      const demoUser = getDemoUser();
      // BugX: Create proper User object for session
      await setSession({
        id: parseInt(demoUser.id),
        email: demoUser.email,
        name: demoUser.name,
        passwordHash: 'demo_hash', // Demo placeholder
        createdAt: new Date(demoUser.created_at)
      });
      console.log('✅ BugX: Demo session created, forcing cache invalidation');
      
      // BugX: Force cache invalidation by redirecting with timestamp
      redirect(`/?_auth=${Date.now()}`);
    }
    return {
      error: 'Invalid email or password. (Demo mode: use test@test.com / admin123)',
      email,
      password
    };
  }

  let foundUser;
  try {
    foundUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
      
    console.log('🔍 BugX Debug: Users found:', foundUser.length);
  } catch (error) {
    console.error('🚨 BugX: Database error, falling back to demo mode:', error);
    if (await validateDemoCredentials(email, password)) {
      const demoUser = getDemoUser();
      // BugX: Create proper User object for session  
      await setSession({
        id: parseInt(demoUser.id),
        email: demoUser.email,
        name: demoUser.name,
        passwordHash: 'demo_hash', // Demo placeholder
        createdAt: new Date(demoUser.created_at)
      });
      console.log('✅ BugX: Database fallback session created, forcing cache invalidation');
      
      // BugX: Force cache invalidation by redirecting with timestamp
      redirect(`/?_auth=${Date.now()}`);
    }
    return {
      error: 'Database unavailable. Demo mode: use test@test.com / admin123',
      email,
      password
    };
  }

  if (foundUser.length === 0) {
    return {
      error: 'Invalid email or password. Please try again.',
      email,
      password
    };
  }

  const user = foundUser[0];

  const isPasswordValid = await comparePasswords(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    return {
      error: 'Invalid email or password. Please try again.',
      email,
      password
    };
  }

  await Promise.all([
    setSession(user),
    logActivity(user.id, ActivityType.SIGN_IN)
  ]);

  redirect('/');
});

// BugX v1.4.1: Simplified form data parsing for credit efficiency
const simpleSignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  role: z.enum(['student', 'parent', 'counselor'])
  // Goal is optional, handled separately based on role
});

export const signUp = validatedAction(simpleSignUpSchema, async (data, formData) => {
  const { email, password, firstName, lastName, role } = data;
  
  // BugX: Extract optional fields directly from FormData (bypass type complexity)
  const goal = formData?.get('goal')?.toString() || null; // Optional for counselors
  const phoneNumber = formData?.get('phoneNumber')?.toString() || null;
  const educationalStatus = formData?.get('educationalStatus')?.toString() || null;
  const educationLevel = formData?.get('educationLevel')?.toString() || null;
  const institution = formData?.get('institution')?.toString() || null;
  const institutionType = formData?.get('institutionType')?.toString() || null;
  const studentEmail = formData?.get('studentEmail')?.toString() || null; // Renamed from childEmail
  const expectedGraduationYear = formData?.get('expectedGraduationYear')?.toString() || null;

  // Check if user already exists
  let existingUser;
  try {
    existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);
  } catch (error) {
    console.error('🚨 BugX: Database error during user check:', error);
    if (FALLBACK_MODE_ENABLED) {
      return {
        error: 'Database unavailable. Please try again later or contact support.'
      };
    }
    throw error;
  }

  if (existingUser.length > 0) {
    return {
      error: 'User with this email already exists. Please use a different email or try signing in.'
    };
  }

  const passwordHash = await hashPassword(password);

  // BugX v1.4.1: Simplified user data with fallback approach
  const userData: any = {
    firstName,
    lastName,
    email,
    passwordHash,
    phoneNumber,
    role: role as UserRole,
    goal: goal || null, // Optional field based on role
    // Role-specific fields with safe casting
    educationLevel: role === 'student' ? (educationLevel as EducationLevel) : null,
    currentInstitution: institution || null, // Used by both students and counselors
    expectedGraduationYear: role === 'student' && expectedGraduationYear ? parseInt(expectedGraduationYear) : null,
    // New fields
    educationalStatus: role === 'student' ? educationalStatus : null,
    institutionType: role === 'counselor' ? institutionType : null,
    // Safe defaults
    parentId: null,
    institutionId: null,
    emailVerified: false,
    emailVerifiedAt: null
  };

  let newUser;
  try {
    [newUser] = await db
      .insert(users)
      .values(userData)
      .returning();

    console.log('✅ BugX: User created successfully:', { id: newUser.id, email: newUser.email, role: newUser.role });
  } catch (error) {
    console.error('🚨 BugX: Database error during user creation:', error);
    if (FALLBACK_MODE_ENABLED) {
      return {
        error: 'Unable to create account. Please try again later.'
      };
    }
    throw error;
  }

  // Handle parent-student relationship if needed (updated terminology)
  if (role === 'parent' && studentEmail) {
    try {
      const studentUser = await db
        .select()
        .from(users)
        .where(eq(users.email, studentEmail))
        .limit(1);
      
      if (studentUser.length > 0 && studentUser[0].role === 'student') {
        await db
          .update(users)
          .set({ parentId: newUser.id })
          .where(eq(users.id, studentUser[0].id));
        
        console.log('✅ BugX: Parent-student relationship established:', { parentId: newUser.id, studentId: studentUser[0].id });
      }
    } catch (error) {
      console.warn('⚠️ BugX: Could not establish parent-student relationship:', error);
      // Non-critical error, continue with registration
    }
  }

  try {
    await Promise.all([
      logActivity(newUser.id, ActivityType.SIGN_UP),
      setSession(newUser)
    ]);
  } catch (error) {
    console.error('🚨 BugX: Error during session/activity logging:', error);
    // Still redirect on successful user creation
  }

  redirect('/');
});

export async function signOut() {
  console.log('💪 BugX: Server-side logout initiated');
  
  try {
    // BugX: Handle both database and demo modes
    if (!FALLBACK_MODE_ENABLED) {
      const user = (await getUser()) as User;
      if (user) {
        await logActivity(user.id, ActivityType.SIGN_OUT);
      }
    } else {
      console.log('🎭 BugX: Demo mode logout - skipping database activity log');
    }
  } catch (error) {
    console.log('⚠️ BugX: Could not log sign-out activity:', error);
  }
  
  // BugX: Force cookie deletion with multiple strategies
  const cookieStore = await cookies();
  cookieStore.delete('session');
  cookieStore.set('session', '', { expires: new Date(0), maxAge: 0 });
  
  console.log('✅ BugX: Session cookie cleared');
}

const updatePasswordSchema = z.object({
  currentPassword: z.string().min(8).max(100),
  newPassword: z.string().min(8).max(100),
  confirmPassword: z.string().min(8).max(100)
});

export const updatePassword = validatedActionWithUser(
  updatePasswordSchema,
  async (data, _, user) => {
    const { currentPassword, newPassword, confirmPassword } = data;

    const isPasswordValid = await comparePasswords(
      currentPassword,
      user.passwordHash
    );

    if (!isPasswordValid) {
      return {
        currentPassword,
        newPassword,
        confirmPassword,
        error: 'Current password is incorrect.'
      };
    }

    if (currentPassword === newPassword) {
      return {
        currentPassword,
        newPassword,
        confirmPassword,
        error: 'New password must be different from the current password.'
      };
    }

    if (confirmPassword !== newPassword) {
      return {
        currentPassword,
        newPassword,
        confirmPassword,
        error: 'New password and confirmation password do not match.'
      };
    }

    const newPasswordHash = await hashPassword(newPassword);

    await Promise.all([
      db
        .update(users)
        .set({ passwordHash: newPasswordHash })
        .where(eq(users.id, user.id)),
      logActivity(user.id, ActivityType.UPDATE_PASSWORD)
    ]);

    return {
      success: 'Password updated successfully.'
    };
  }
);

const deleteAccountSchema = z.object({
  password: z.string().min(8).max(100)
});

export const deleteAccount = validatedActionWithUser(
  deleteAccountSchema,
  async (data, _, user) => {
    const { password } = data;

    const isPasswordValid = await comparePasswords(password, user.passwordHash);
    if (!isPasswordValid) {
      return {
        password,
        error: 'Incorrect password. Please try again.'
      };
    }

    await Promise.all([
      db
        .update(users)
        .set({ deletedAt: new Date() })
        .where(eq(users.id, user.id)),
      logActivity(user.id, ActivityType.DELETE_ACCOUNT)
    ]);

    (await cookies()).delete('session');
    redirect('/sign-in');
  }
);

const updateAccountSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().min(3).max(255)
});

export const updateAccount = validatedActionWithUser(
  updateAccountSchema,
  async (data, _, user) => {
    const { name, email } = data;

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0 && existingUser[0].id !== user.id) {
      return {
        name,
        email,
        error: 'Email is already in use.'
      };
    }

    await Promise.all([
      db.update(users).set({ name, email }).where(eq(users.id, user.id)),
      logActivity(user.id, ActivityType.UPDATE_ACCOUNT)
    ]);

    return {
      success: 'Account updated successfully.'
    };
  }
);