import { z } from 'zod';
import { UserRole, EducationLevel, EducationalStatus } from '@/lib/db/schema';

// Base validation schema for common fields
const baseRegistrationSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(100, 'First name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'First name can only contain letters, spaces, hyphens, and apostrophes'),
  
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(100, 'Last name must be less than 100 characters')
    .regex(/^[a-zA-Z\s'-]+$/, 'Last name can only contain letters, spaces, hyphens, and apostrophes'),
  
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .trim(),
  
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters long')
    .max(100, 'Password must be less than 100 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one lowercase letter, one uppercase letter, and one number'
    ),
  
  phoneNumber: z
    .string()
    .optional()
    .refine((val) => !val || /^\+?[\d\s\-\(\)\.]+$/.test(val), {
      message: 'Please enter a valid phone number'
    }),
  
  role: z.enum(['student', 'parent', 'counselor'] as const, {
    errorMap: () => ({ message: 'Please select a valid role' })
  })
});

// Student-specific validation
const studentRegistrationSchema = baseRegistrationSchema.extend({
  role: z.literal('student'),
  
  educationalStatus: z.enum([
    'accepted_planning_to_attend',
    'currently_enrolled',
    'graduated',
    'gap_year',
    'transferring'
  ] as const, {
    errorMap: () => ({ message: 'Please select your educational status' })
  }),
  
  educationLevel: z.enum([
    'high_school',
    'undergraduate',
    'graduate',
    'doctoral',
    'post_doctoral'
  ] as const, {
    errorMap: () => ({ message: 'Please select your education level' })
  }),
  
  expectedGraduationYear: z
    .number()
    .optional()
    .refine((val) => {
      if (val === undefined) return true;
      const currentYear = new Date().getFullYear();
      return val >= currentYear && val <= currentYear + 10;
    }, {
      message: 'Graduation year must be between current year and 10 years from now'
    }),
  
  futureInstitution: z
    .string()
    .max(255, 'Institution name must be less than 255 characters')
    .optional()
    .refine((val) => !val || val.trim().length > 0, {
      message: 'Institution name cannot be empty if provided'
    }),
});

// Parent-specific validation
const parentRegistrationSchema = baseRegistrationSchema.extend({
  role: z.literal('parent'),
  
  childEmail: z
    .string()
    .email('Please enter a valid email address for your child')
    .max(255, 'Email must be less than 255 characters')
    .toLowerCase()
    .trim()
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: 'Child email cannot be empty if provided'
    }),
});

// Counselor-specific validation
const counselorRegistrationSchema = baseRegistrationSchema.extend({
  role: z.literal('counselor'),
  
  institution: z
    .string()
    .min(1, 'Institution name is required for counselors')
    .max(255, 'Institution name must be less than 255 characters')
    .trim(),
  
  institutionType: z
    .string()
    .max(100, 'Institution type must be less than 100 characters')
    .optional()
    .refine((val) => !val || val.trim().length > 0, {
      message: 'Institution type cannot be empty if provided'
    }),
});

// Union schema that validates based on role
export const registrationSchema = z.discriminatedUnion('role', [
  studentRegistrationSchema,
  parentRegistrationSchema,
  counselorRegistrationSchema
]);

// Individual role schemas export
export const studentSchema = studentRegistrationSchema;
export const parentSchema = parentRegistrationSchema;
export const counselorSchema = counselorRegistrationSchema;

// Type exports
export type RegistrationFormData = z.infer<typeof registrationSchema>;
export type StudentRegistrationData = z.infer<typeof studentRegistrationSchema>;
export type ParentRegistrationData = z.infer<typeof parentRegistrationSchema>;
export type CounselorRegistrationData = z.infer<typeof counselorRegistrationSchema>;

// Validation helper functions
export function validateRegistration(data: unknown): { 
  success: true; 
  data: RegistrationFormData; 
} | { 
  success: false; 
  errors: Record<string, string[]>; 
} {
  try {
    const validatedData = registrationSchema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const formattedErrors: Record<string, string[]> = {};
      
      error.errors.forEach((err) => {
        const path = err.path.join('.');
        if (!formattedErrors[path]) {
          formattedErrors[path] = [];
        }
        formattedErrors[path].push(err.message);
      });
      
      return { success: false, errors: formattedErrors };
    }
    
    return { 
      success: false, 
      errors: { general: ['An unexpected validation error occurred'] } 
    };
  }
}

// Role-specific validation helper
export function validateByRole(role: UserRole, data: unknown) {
  switch (role) {
    case 'student':
      return studentSchema.safeParse(data);
    case 'parent':
      return parentSchema.safeParse(data);
    case 'counselor':
      return counselorSchema.safeParse(data);
    default:
      throw new Error(`Unknown role: ${role}`);
  }
}

// Field validation for real-time feedback
export function validateField(fieldName: string, value: any, role?: UserRole) {
  try {
    // Simple validation without complex pick operations
    if (fieldName === 'firstName' || fieldName === 'lastName') {
      z.string().min(1, 'Required').parse(value);
    } else if (fieldName === 'email') {
      z.string().email('Invalid email').parse(value);
    } else if (fieldName === 'password') {
      z.string().min(6, 'At least 6 characters').parse(value);
    } else if (fieldName === 'phoneNumber') {
      // Optional field, only validate if provided
      if (value && value.trim() !== '') {
        z.string().min(1, 'Invalid phone number').parse(value);
      }
    } else {
      // For other fields, just check if not empty when required
      if (value && typeof value === 'string' && value.trim() === '') {
        throw new Error('Required field cannot be empty');
      }
    }
    return { success: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { 
        success: false, 
        error: error.errors[0]?.message || 'Invalid value' 
      };
    }
    return { success: false, error: error instanceof Error ? error.message : 'Validation error' };
  }
}

// Email domain validation for institutional licensing
export function validateInstitutionalEmail(email: string, institutionDomain?: string): boolean {
  if (!institutionDomain) return true;
  
  const emailDomain = email.split('@')[1]?.toLowerCase();
  return emailDomain === institutionDomain.toLowerCase();
}

// Password strength checker
export function checkPasswordStrength(password: string): {
  score: number;
  feedback: string[];
  isValid: boolean;
} {
  const feedback: string[] = [];
  let score = 0;
  
  if (password.length >= 8) score += 1;
  else feedback.push('At least 8 characters');
  
  if (/[a-z]/.test(password)) score += 1;
  else feedback.push('At least one lowercase letter');
  
  if (/[A-Z]/.test(password)) score += 1;
  else feedback.push('At least one uppercase letter');
  
  if (/\d/.test(password)) score += 1;
  else feedback.push('At least one number');
  
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    score += 1;
    feedback.unshift('Strong password!');
  } else {
    feedback.push('Consider adding special characters for extra security');
  }
  
  return {
    score,
    feedback,
    isValid: score >= 4 // Minimum requirements met
  };
}