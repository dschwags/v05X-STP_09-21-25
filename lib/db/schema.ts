import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums for user roles and education levels
export const userRoleEnum = pgEnum('user_role', ['student', 'parent', 'counselor']);
export const educationLevelEnum = pgEnum('education_level', [
  'high_school',
  'undergraduate', 
  'graduate',
  'doctoral',
  'post_doctoral'
]);
export const educationalStatusEnum = pgEnum('educational_status', [
  'accepted_planning_to_attend',
  'currently_enrolled',
  'graduated',
  'gap_year',
  'transferring'
]);

export const users: any = pgTable('users', {
  id: serial('id').primaryKey(),
  // Basic fields
  firstName: varchar('first_name', { length: 100 }),
  lastName: varchar('last_name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  phoneNumber: varchar('phone_number', { length: 20 }),
  
  // Role-based fields
  role: userRoleEnum('role').notNull(),
  goal: varchar('goal', { length: 500 }), // Optional based on role
  
  // Educational fields (mainly for students)
  educationalStatus: educationalStatusEnum('educational_status'),
  educationLevel: educationLevelEnum('education_level'),
  expectedGraduationYear: integer('expected_graduation_year'),
  currentInstitution: varchar('current_institution', { length: 255 }),
  
  // Institution fields (for counselors)
  institutionType: varchar('institution_type', { length: 100 }),
  
  // Parent-child relationship
  parentId: integer('parent_id').references(() => users.id),
  
  // Institution association (for licensing)
  institutionId: integer('institution_id'),
  
  // Email verification
  emailVerified: boolean('email_verified').default(false),
  emailVerifiedAt: timestamp('email_verified_at'),
  
  // Timestamps
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const activityLogs = pgTable('activity_logs', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  action: text('action').notNull(),
  timestamp: timestamp('timestamp').notNull().defaultNow(),
  ipAddress: varchar('ip_address', { length: 45 }),
  metadata: text('metadata'), // JSON field for additional sharing-related data
});

export const usersRelations = relations(users, ({ many, one }) => ({
  activityLogs: many(activityLogs),
  parent: one(users, {
    fields: [users.parentId],
    references: [users.id],
    relationName: 'parent_child'
  }),
  children: many(users, {
    relationName: 'parent_child'
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

// Institution table for B2B2C licensing
export const institutions = pgTable('institutions', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  domain: varchar('domain', { length: 100 }).notNull().unique(), // for email domain validation
  type: varchar('type', { length: 100 }), // university, high_school, etc.
  address: text('address'),
  contactEmail: varchar('contact_email', { length: 255 }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const institutionsRelations = relations(institutions, ({ many }) => ({
  users: many(users),
}));

// Add institution relation to users
export const usersInstitutionRelations = relations(users, ({ one }) => ({
  institution: one(institutions, {
    fields: [users.institutionId],
    references: [institutions.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Institution = typeof institutions.$inferSelect;
export type NewInstitution = typeof institutions.$inferInsert;

// Export role enums as types
export type UserRole = 'student' | 'parent' | 'counselor';
export type EducationLevel = 'high_school' | 'undergraduate' | 'graduate' | 'doctoral' | 'post_doctoral';
export type EducationalStatus = 'accepted_planning_to_attend' | 'currently_enrolled' | 'graduated' | 'gap_year' | 'transferring';
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;

export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  SHARE_CREATED = 'SHARE_CREATED',
  SHARE_ACCESSED = 'SHARE_ACCESSED',
  SHARE_UPDATED = 'SHARE_UPDATED',
  SHARE_DELETED = 'SHARE_DELETED',
  EMAIL_VERIFIED = 'EMAIL_VERIFIED',
  PROFILE_UPDATED = 'PROFILE_UPDATED',
}