/**
 * Morgan Davis's Scholarship Portfolio (9 Scholarships)
 * Community college transfer with business focus
 */
const createMorganScholarshipPortfolio = (): Scholarship[] => {
  return [
    // TRANSFER-SPECIFIC SCHOLARSHIPS
    {
      id: 'sch_101',
      userId: 'user2',
      title: 'Community College Transfer Excellence Award',
      provider: 'Illinois State University System',
      amount: 3000,
      deadline: new Date('2025-01-15'),
      status: 'awarded',
      category: 'Merit',
      description: 'Supporting successful community college students transferring to 4-year institutions',
      documentRequirements: [],
      academicRequirements: [],
      activityRequirements: [],
      financialRequirements: [],
      processRequirements: [],
      completion: 100,
      completionText: 'Awarded - $3000',
      isInstitutionalScholarship: false,
      bugxValidated: true,
      createdAt: new Date('2024-10-01'),
      updatedAt: new Date('2024-12-20')
    },

    {
      id: 'sch_102',
      userId: 'user2',
      title: 'Phi Theta Kappa Transfer Scholarship',
      provider: 'Phi Theta Kappa Honor Society',
      amount: 2500,
      deadline: new Date('2025-02-01'),
      status: 'submitted',
      category: 'Merit',
      description: 'Exclusive scholarship for Phi Theta Kappa members transferring to 4-year universities',
      documentRequirements: [
        createDocumentRequirement('req_101', 'PTK Membership Verification', true),
        createDocumentRequirement('req_102', 'Transfer Institution Acceptance Letter', true)
      ],
      academicRequirements: [],
      activityRequirements: [],
      financialRequirements: [],
      processRequirements: [],
      completion: 100,
      completionText: '2/2 completed',
      isInstitutionalScholarship: false,
      bugxValidated: true,
      createdAt: new Date('2024-11-15'),
      updatedAt: new Date('2025-01-25')
    },

    {
      id: 'sch_103',
      userId: 'user2',
      title: 'Non-Traditional Student Support Grant',
      provider: 'Adult Learner Foundation',
      amount: 1800,
      deadline: new Date('2025-03-01'),
      status: 'in_progress',
      category: 'Need-Based',
      description: 'Financial assistance for students who took a non-traditional path to higher education',
      documentRequirements: [
        createDocumentRequirement('req_111', 'Personal Statement on Educational Journey', false),
        createDocumentRequirement('req_112', 'Academic Transcript (Community College)', true)
      ],
      academicRequirements: [],
      activityRequirements: [],
      financialRequirements: [
        createFinancialRequirement('req_113', 'FAFSA Documentation', false),
        createFinancialRequirement('req_114', 'Income Tax Information', false)
      ],
      processRequirements: [
        createProcessRequirement('req_115', 'Online Application Form', true)
      ],
      completion: 40,
      completionText: '2/5 completed',
      isInstitutionalScholarship: false,
      bugxValidated: true,
      createdAt: new Date('2024-12-01'),
      updatedAt: new Date('2025-01-20')
    },

    // CAREER-FOCUSED SCHOLARSHIPS
    {
      id: 'sch_104',
      userId: 'user2',
      title: 'Business Administration Scholarship',
      provider: 'Springfield Chamber of Commerce',
      amount: 2000,
      deadline: new Date('2025-04-01'),
      status: 'in_progress',
      category: 'Merit',
      description: 'Supporting future business leaders in the Springfield community',
      documentRequirements: [
        createDocumentRequirement('req_121', 'Business Career Goals Essay', true),
        createDocumentRequirement('req_122', 'Professor Recommendation Letter', true),
        createDocumentRequirement('req_123', 'Business Project Portfolio', false)
      ],
      academicRequirements: [
        createAcademicRequirement('req_124', 'Minimum 3.5 GPA in Business Courses', true)
      ],
      activityRequirements: [
        createActivityRequirement('req_125', 'Business-Related Extracurricular Activity', false)
      ],
      financialRequirements: [],
      processRequirements: [],
      completion: 60,
      completionText: '3/5 completed',
      isInstitutionalScholarship: false,
      bugxValidated: true,
      createdAt: new Date('2024-12-15'),
      updatedAt: new Date('2025-01-18')
    },

    {
      id: 'sch_105',
      userId: 'user2',
      title: 'Small Business Development Award',
      provider: 'Entrepreneur Foundation',
      amount: 1500,
      deadline: new Date('2025-05-15'),
      status: 'draft',
      category: 'Merit',
      description: 'Encouraging entrepreneurship and small business development',
      documentRequirements: [
        createDocumentRequirement('req_131', 'Business Plan Outline', true),
        createDocumentRequirement('req_132', 'Mentor Recommendation', false),
        createDocumentRequirement('req_133', 'Entrepreneurship Course Certificate', false)
      ],
      academicRequirements: [],
      activityRequirements: [
        createActivityRequirement('req_134', 'Business Competition Participation', false),
        createActivityRequirement('req_135', 'Internship or Work Experience', false)
      ],
      financialRequirements: [],
      processRequirements: [],
      completion: 20,
      completionText: '1/5 completed',
      isInstitutionalScholarship: false,
      bugxValidated: false,
      createdAt: new Date('2025-01-05'),
      updatedAt: new Date('2025-01-16')
    },

    {
      id: 'sch_106',
      userId: 'user2',
      title: 'Women in Business Leadership Grant',
      provider: 'Professional Women Network',
      amount: 2200,
      deadline: new Date('2025-06-01'),
      status: 'not_started',
      category: 'Diversity',
      description: 'Empowering women to pursue leadership roles in business',
      documentRequirements: [],
      academicRequirements: [],
      activityRequirements: [],
      financialRequirements: [],
      processRequirements: [],
      completion: 0,
      completionText: '0/0 completed',
      isInstitutionalScholarship: false,
      bugxValidated: false,
      createdAt: new Date('2025-01-12'),
      updatedAt: new Date('2025-01-12')
    },

    // LOCAL OPPORTUNITIES
    {
      id: 'sch_107',
      userId: 'user2',
      title: 'City Council Student Achievement Award',
      provider: 'City of Springfield',
      amount: 800,
      deadline: new Date('2025-02-28'),
      status: 'submitted',
      category: 'Service',
      description: 'Recognizing students who contribute to their local community',
      documentRequirements: [
        createDocumentRequirement('req_141', 'Community Involvement Documentation', true),
        createDocumentRequirement('req_142', 'City Council Member Reference', true)
      ],
      academicRequirements: [],
      activityRequirements: [
        createActivityRequirement('req_143', 'Volunteer Service Hours (50+)', true)
      ],
      financialRequirements: [],
      processRequirements: [],
      completion: 100,
      completionText: '3/3 completed',
      isInstitutionalScholarship: false,
      bugxValidated: true,
      createdAt: new Date('2024-12-20'),
      updatedAt: new Date('2025-01-22')
    },

    {
      id: 'sch_108',
      userId: 'user2',
      title: 'Local Credit Union Education Grant',
      provider: 'Springfield Federal Credit Union',
      amount: 1000,
      deadline: new Date('2024-12-15'),
      status: 'awarded',
      category: 'Need-Based',
      description: 'Supporting local students in their educational pursuits',
      documentRequirements: [],
      academicRequirements: [],
      activityRequirements: [],
      financialRequirements: [],
      processRequirements: [],
      completion: 100,
      completionText: 'Awarded - $1000',
      isInstitutionalScholarship: false,
      bugxValidated: true,
      createdAt: new Date('2024-09-01'),
      updatedAt: new Date('2024-12-20')
    },

    {
      id: 'sch_109',
      userId: 'user2',
      title: 'Hometown Heroes Scholarship',
      provider: 'Veterans of Foreign Wars Post 1234',
      amount: 1200,
      deadline: new Date('2024-11-30'),
      status: 'rejected',
      category: 'Service',
      description: 'Honoring students who demonstrate patriotism and community service',
      documentRequirements: [],
      academicRequirements: [],
      activityRequirements: [],
      financialRequirements: [],
      processRequirements: [],
      completion: 100,
      completionText: 'Application Complete - Not Selected',
      isInstitutionalScholarship: false,
      bugxValidated: true,
      createdAt: new Date('2024-09-15'),
      updatedAt: new Date('2024-12-15')
    }
  ];
};

/**
 * Parent and Counselor Research Scholarships
 * For testing export/import functionality
 */
const createParentResearchScholarships = (): Scholarship[] => {
  return [
    // Patricia Johnson (Parent) Research Scholarships
    {
      id: 'sch_201',
      userId: 'user3',
      title: 'Parent Teacher Association Scholarship',
      provider: 'Lincoln High School PTA',
      amount: 1500,
      deadline: new Date('2025-04-01'),
      status: 'research',
      category: 'Merit',
      description: 'Local PTA scholarship for graduating seniors',
      notes: 'Found at school meeting - good opportunity for Alex. Requires 3.0 GPA and community service.',
      tags: ['local', 'alex-eligible', 'community-service'],
      documentRequirements: [
        createDocumentRequirement('req_201', 'Community Service Documentation', false),
        createDocumentRequirement('req_202', 'Parent/Teacher Recommendation', false)
      ],
      academicRequirements: [
        createAcademicRequirement('req_203', 'Minimum 3.0 GPA', false)
      ],
      activityRequirements: [],
      financialRequirements: [],
      processRequirements: [],
      completion: 0,
      completionText: 'Research stage - ready for export',
      isInstitutionalScholarship: false,
      bugxValidated: false,
      createdAt: new Date('2025-01-10'),
      updatedAt: new Date('2025-01-16')
    },

    {
      id: 'sch_202',
      userId: 'user3',
      title: 'Local Hospital Healthcare Career Grant',
      provider: 'Springfield General Hospital',
      amount: 2000,
      deadline: new Date('2025-03-15'),
      status: 'research',
      category: 'Merit',
      description: 'Supporting students pursuing healthcare careers',
      notes: 'Perfect for Alex since interested in pre-med. Need to check requirements.',
      tags: ['healthcare', 'pre-med', 'alex-match'],
      documentRequirements: [
        createDocumentRequirement('req_211', 'Essay on Healthcare Career Goals', false),
        createDocumentRequirement('req_212', 'Science Teacher Recommendation', false)
      ],
      academicRequirements: [
        createAcademicRequirement('req_213', 'Science Course GPA 3.5+', false)
      ],
      activityRequirements: [
        createActivityRequirement('req_214', 'Healthcare Volunteer Experience', false)
      ],
      financialRequirements: [],
      processRequirements: [],
      completion: 0,
      completionText: 'Research stage - ready for export',
      isInstitutionalScholarship: false,
      bugxValidated: false,
      createdAt: new Date('2025-01-12'),
      updatedAt: new Date('2025-01-18')
    }
  ];
};

/**
 * Counselor Institutional Scholarships
 * Dr. Rodriguez managing institutional opportunities
 */
const createCounselorInstitutionalScholarships = (): Scholarship[] => {
  return [
    {
      id: 'sch_301',
      userId: 'user4',
      title: 'Lincoln High School Excellence Award',
      provider: 'Lincoln High School',
      amount: 1000,
      deadline: new Date('2025-03-01'),
      status: 'available',
      category: 'Merit',
      description: 'Annual award for top 10% GPA students',
      notes: 'Institutional scholarship available to qualifying students',
      institutionId: 'lincoln_hs_001',
      eligibleStudents: ['user1'], // Alex qualifies
      documentRequirements: [
        createDocumentRequirement('req_301', 'Official Transcript', false),
        createDocumentRequirement('req_302', 'Counselor// Sample Data Specification - TypeScript Interfaces
// Part of: Scholarship Tracker Pro Modernization Suite
// Aligned with: Technical Architecture Specification v2.0

// ===================================================================
// CORE ENTITY INTERFACES
// ===================================================================

/**
 * User Authentication and Profile Interface
 * Supports institutional licensing with role-based access
 */
interface User {
  id: string; // UUIDs for cross-system compatibility
  email: string;
  name: string;
  passwordHash: string; // bcrypt with salt rounds 12
  role: 'student' | 'parent' | 'counselor' | 'admin';
  
  // Profile Information
  profilePicture?: string;
  phone?: string;
  dateOfBirth?: Date;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country: string; // Default: 'United States'
  
  // Educational Context (Student/Counselor specific)
  educationLevel?: 'high_school' | 'undergraduate' | 'graduate' | 'doctoral' | 'post_doctoral';
  educationalStatus?: string; // From registration conditional logic
  educationalDescription?: string;
  gpa?: number;
  graduationYear?: number;
  school?: string;
  major?: string;
  
  // Institutional Context (B2B2C licensing)
  institutionId?: string;
  institution?: Institution;
  
  // System Fields
  isActive: boolean;
  emailVerified: boolean;
  preferences: UserPreferences;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

/**
 * User Preferences for Personalization
 * Supports institutional customization
 */
interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    deadlineReminders: boolean;
    statusUpdates: boolean;
    newScholarships: boolean;
  };
  dashboard: {
    defaultView: 'overview' | 'scholarships' | 'financial';
    compactMode: boolean; // Space optimization
  };
  privacy: {
    profileVisibility: 'public' | 'connections_only' | 'private';
    allowParentAccess: boolean;
  };
}

/**
 * Institution Entity for B2B2C Licensing
 * Supports branding and customization
 */
interface Institution {
  id: string;
  name: string;
  domain: string; // For email validation
  type: 'high_school' | 'community_college' | 'university' | 'trade_school';
  
  // Geographic Information
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  
  // Branding & Customization
  branding: {
    logo?: string;
    primaryColor: string;
    secondaryColor: string;
    customCss?: string;
    welcomeMessage?: string;
  };
  
  // Configuration
  settings: {
    allowParentAccess: boolean;
    requireEmailVerification: boolean;
    customFields: CustomField[];
    scholarshipCategories: string[];
  };
  
  // Licensing
  licenseType: 'trial' | 'basic' | 'premium' | 'enterprise';
  maxStudents?: number;
  licenseStart: Date;
  licenseEnd: Date;
  isActive: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Custom Fields for Institutional Flexibility
 */
interface CustomField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'checkbox';
  isRequired: boolean;
  options?: string[]; // For select fields
  placeholder?: string;
  validationRules?: ValidationRule[];
}

interface ValidationRule {
  type: 'minLength' | 'maxLength' | 'pattern' | 'required';
  value: string | number | boolean;
  message: string;
}

// ===================================================================
// SCHOLARSHIP AND APPLICATION INTERFACES
// ===================================================================

/**
 * Scholarship Entity with Comprehensive Tracking
 * Supports both institutional and external scholarships
 */
interface Scholarship {
  id: string;
  userId: string; // Creator/owner
  title: string;
  provider: string;
  amount: number;
  deadline: Date;
  status: ScholarshipStatus;
  category: ScholarshipCategory;
  
  // Optional Details
  applicationUrl?: string;
  organizationUrl?: string;
  description?: string;
  notes?: string;
  tags?: string[];
  
  // Requirement Tracking
  documentRequirements: Requirement[];
  academicRequirements: Requirement[];
  activityRequirements: Requirement[];
  financialRequirements: Requirement[];
  processRequirements: Requirement[];
  
  // Progress Tracking
  completion: number; // 0-100 percentage
  completionText: string; // "3/5 completed" or "Awarded - $2500"
  
  // Institutional Context
  institutionId?: string;
  isInstitutionalScholarship: boolean;
  eligibleStudents?: string[]; // For counselor-managed scholarships
  
  // BugX Integration
  bugxValidated: boolean;
  lastValidation?: Date;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Scholarship Status Types
 */
type ScholarshipStatus = 
  | 'not_started'
  | 'draft' 
  | 'in_progress'
  | 'submitted'
  | 'under_review'
  | 'awarded'
  | 'rejected'
  | 'research'      // For parent/counselor research
  | 'available';    // For institutional scholarships

/**
 * Scholarship Categories
 */
type ScholarshipCategory = 
  | 'Merit'
  | 'Need-Based'
  | 'STEM'
  | 'Service'
  | 'Diversity'
  | 'Research'
  | 'Athletics'
  | 'Arts'
  | 'Local'
  | 'Institutional';

/**
 * Requirement Tracking Interface
 * Supports dynamic requirements and progress monitoring
 */
interface Requirement {
  id: string;
  label: string;
  type: 'document' | 'academic' | 'activity' | 'financial' | 'process';
  isRequired: boolean;
  isCompleted: boolean;
  completedDate?: Date;
  notes?: string;
  documentReference?: DocumentReference;
}

// ===================================================================
// USER RELATIONSHIP INTERFACES
// ===================================================================

/**
 * User Connection System
 * Supports parent-student and counselor-student relationships
 */
interface UserConnection {
  id: string;
  parentUserId: string; // Parent or Counselor
  childUserId: string;  // Student
  connectionType: 'parent' | 'counselor';
  isActive: boolean;
  
  // Permission System
  permissions: ConnectionPermissions;
  
  // Access Control
  canStudentRevoke: boolean;
  requiresStudentApproval: boolean;
  
  // Audit Trail
  accessLog: AccessLogEntry[];
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Permission System for User Connections
 * Role-based access control
 */
interface ConnectionPermissions {
  canViewApplications: boolean;
  canViewFinancialGoals: boolean;
  canViewProgress: boolean;
  canEditProfile: boolean;
  canSubmitApplications: boolean;
  canReceiveNotifications: boolean;
  canAddDocumentLinks: boolean;
  canCreateScholarships: boolean;
  canViewSensitiveFinancials: boolean;
}

/**
 * Access Log for Audit Trail
 */
interface AccessLogEntry {
  action: string;
  resource: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  result: 'success' | 'failure' | 'unauthorized';
}

// ===================================================================
// DOCUMENT AND SECURITY INTERFACES
// ===================================================================

/**
 * Document Reference System
 * Link-based security approach (no file uploads)
 */
interface DocumentReference {
  id: string;
  type: 'transcript' | 'essay' | 'financial_doc' | 'recommendation' | 'portfolio' | 'other';
  title: string;
  externalUrl?: string; // Google Drive, Dropbox, OneDrive, iCloud
  description?: string;
  uploadedBy: string; // User ID
  sharedWith: string[]; // Parent/counselor IDs with permission
  
  // Audit Trail
  dateAdded: Date;
  accessCount: number;
  lastAccessed?: Date;
  
  // Security
  allowedDomains: string[]; // Validation list
  isVerified: boolean; // Link accessibility check
  
  // Relationships
  applicationId?: string;
  scholarshipId?: string;
  userId: string;
}

// ===================================================================
// FINANCIAL TRACKING INTERFACES
// ===================================================================

/**
 * Financial Goals and Planning
 * Comprehensive financial tracking
 */
interface FinancialGoal {
  id: string;
  userId: string;
  
  // Education Cost Planning
  totalEducationCost: number;
  currentSavings: number;
  expectedFamilyContribution: number;
  scholarshipsAwarded: number;
  scholarshipsPending: number;
  fundingGap: number;
  
  // Detailed Expenses
  expenses: EducationExpenses;
  
  // Funding Sources
  fundingSources: FundingSources;
  
  // Timeline
  academicYear: number; // 2025, 2026, etc.
  isActive: boolean;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Education Expenses Breakdown
 */
interface EducationExpenses {
  tuition: number;
  housing: number;
  meals: number;
  books: number;
  transportation: number;
  personal: number;
  technology?: number;
  healthInsurance?: number;
  other?: number;
}

/**
 * Funding Sources Breakdown
 */
interface FundingSources {
  family: number;
  savings: number;
  scholarships: number; // Already awarded
  workStudy: number;
  studentLoans: number; // Projected need
  grants: number;
  other?: number;
}

// ===================================================================
// AUTHENTICATION AND SECURITY INTERFACES
// ===================================================================

/**
 * Password Security Configuration
 */
interface PasswordRequirements {
  minLength: number;
  requireUppercase: boolean;
  requireLowercase: boolean;
  requireSpecialChar: boolean;
  requireNumber: boolean;
  pattern: RegExp;
}

/**
 * Security Validation Results
 */
interface SecurityValidation {
  isValid: boolean;
  requirements: {
    [key: string]: boolean;
  };
  strength: 'weak' | 'medium' | 'strong' | 'very_strong';
}

// ===================================================================
// BUGX INTEGRATION INTERFACES
// ===================================================================

/**
 * BugX Session Tracking
 * Integrated quality assurance
 */
interface BugXSession {
  id: string;
  userId?: string;
  sessionType: 'validation' | 'debugging' | 'testing';
  status: 'active' | 'completed' | 'failed';
  
  // Validation Context
  issueType: 'integration' | 'ui' | 'data' | 'performance';
  complexity: 'simple' | 'medium' | 'complex';
  validationLevel: 'minimal' | 'standard' | 'comprehensive';
  estimatedRisk: 'low' | 'medium' | 'high';
  
  // Results
  result?: 'success' | 'failure';
  errors?: string[];
  warnings?: string[];
  metrics?: Record<string, number>;
  
  // Timestamps
  startTime: Date;
  endTime?: Date;
  duration?: number;
}

// ===================================================================
// USER ACCOUNT FACTORY FUNCTIONS
// ===================================================================

/**
 * Password Security Configuration
 * Standard test password: P@ssword1
 */
const PASSWORD_REQUIREMENTS: PasswordRequirements = {
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true,
  requireSpecialChar: true,
  requireNumber: true,
  pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/
};

const STANDARD_TEST_PASSWORD = 'P@ssword1';
const STANDARD_PASSWORD_HASH = '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewMcZZf.KqJQKq0m'; // bcrypt hash

/**
 * Base User Factory
 * Creates users with proper validation and BugX integration
 */
const createBaseUser = (overrides: Partial<User>): User => {
  const baseUser: User = {
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    email: '',
    name: '',
    passwordHash: STANDARD_PASSWORD_HASH,
    role: 'student',
    country: 'United States',
    isActive: true,
    emailVerified: true,
    preferences: {
      theme: 'light',
      notifications: {
        deadlineReminders: true,
        statusUpdates: true,
        newScholarships: true
      },
      dashboard: {
        defaultView: 'overview',
        compactMode: false
      },
      privacy: {
        profileVisibility: 'connections_only',
        allowParentAccess: true
      }
    },
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2025-01-15')
  };

  return { ...baseUser, ...overrides };
};

/**
 * Test User 1: Alex Johnson (High School Senior)
 * Primary test student with parent connection
 */
const createAlexJohnson = (): User => {
  return createBaseUser({
    id: 'user1',
    email: 'alex.johnson@email.com',
    name: 'Alex Johnson',
    role: 'student',
    phone: '(555) 123-4567',
    dateOfBirth: new Date('2006-03-15'), // High school senior
    address: '123 Main Street',
    city: 'Springfield',
    state: 'Illinois',
    zipCode: '62701',
    educationLevel: 'high_school',
    educationalStatus: 'Currently enrolled (specify school below)',
    school: 'Lincoln High School',
    gpa: 3.7,
    graduationYear: 2025,
    major: 'Undecided - considering Pre-Medicine',
    preferences: {
      theme: 'light',
      notifications: {
        deadlineReminders: true,
        statusUpdates: true,
        newScholarships: true
      },
      dashboard: {
        defaultView: 'scholarships',
        compactMode: false
      },
      privacy: {
        profileVisibility: 'connections_only',
        allowParentAccess: true
      }
    }
  });
};

/**
 * Test User 2: Morgan Davis (Community College Transfer)
 * Transfer student with different educational path
 */
const createMorganDavis = (): User => {
  return createBaseUser({
    id: 'user2',
    email: 'morgan.davis@email.com',
    name: 'Morgan Davis',
    role: 'student',
    phone: '(555) 234-5678',
    dateOfBirth: new Date('2003-08-22'), // Community college transfer
    address: '456 Oak Avenue',
    city: 'Springfield',
    state: 'Illinois',
    zipCode: '62702',
    educationLevel: 'undergraduate',
    educationalStatus: 'Community college planning 4-year transfer',
    school: 'Springfield Community College',
    gpa: 3.9,
    graduationYear: 2026, // Transfer completion
    major: 'Business Administration',
    preferences: {
      theme: 'dark',
      notifications: {
        deadlineReminders: true,
        statusUpdates: true,
        newScholarships: false
      },
      dashboard: {
        defaultView: 'financial',
        compactMode: true
      },
      privacy: {
        profileVisibility: 'private',
        allowParentAccess: false
      }
    }
  });
};

/**
 * Test User 3: Patricia Johnson (Parent)
 * Parent account linked to Alex Johnson
 */
const createPatriciaJohnson = (): User => {
  return createBaseUser({
    id: 'user3',
    email: 'patricia.johnson@email.com',
    name: 'Patricia Johnson',
    role: 'parent',
    phone: '(555) 123-4567', // Same as Alex for family
    address: '123 Main Street', // Same as Alex
    city: 'Springfield',
    state: 'Illinois',
    zipCode: '62701',
    preferences: {
      theme: 'system',
      notifications: {
        deadlineReminders: true,
        statusUpdates: true,
        newScholarships: true
      },
      dashboard: {
        defaultView: 'overview',
        compactMode: false
      },
      privacy: {
        profileVisibility: 'connections_only',
        allowParentAccess: true // N/A for parent role
      }
    },
    createdAt: new Date('2024-09-05'),
    updatedAt: new Date('2025-01-12')
  });
};

/**
 * Test User 4: Dr. Michael Rodriguez (School Counselor)
 * Professional counselor managing multiple students
 */
const createDrRodriguez = (): User => {
  return createBaseUser({
    id: 'user4',
    email: 'michael.rodriguez@lincolnhs.edu',
    name: 'Dr. Michael Rodriguez',
    role: 'counselor',
    phone: '(555) 345-6789',
    address: '789 Education Drive',
    city: 'Springfield',
    state: 'Illinois',
    zipCode: '62703',
    institutionId: 'lincoln_hs_001',
    school: 'Lincoln High School',
    preferences: {
      theme: 'light',
      notifications: {
        deadlineReminders: true,
        statusUpdates: true,
        newScholarships: true
      },
      dashboard: {
        defaultView: 'overview',
        compactMode: true
      },
      privacy: {
        profileVisibility: 'public',
        allowParentAccess: false // N/A for counselor
      }
    },
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2025-01-08')
  });
};

/**
 * User Connection Factory Functions
 * Creates relationships between users with proper permissions
 */
const createParentStudentConnection = (parentId: string, studentId: string): UserConnection => {
  return {
    id: `connection_${parentId}_${studentId}`,
    parentUserId: parentId,
    childUserId: studentId,
    connectionType: 'parent',
    isActive: true,
    permissions: {
      canViewApplications: true,
      canViewFinancialGoals: true,
      canViewProgress: true,
      canEditProfile: false,
      canSubmitApplications: false,
      canReceiveNotifications: true,
      canAddDocumentLinks: true,
      canCreateScholarships: true,
      canViewSensitiveFinancials: true
    },
    canStudentRevoke: true,
    requiresStudentApproval: false, // Under 18
    accessLog: [
      {
        action: 'view_scholarships',
        resource: `${studentId}_scholarships`,
        timestamp: new Date('2025-01-15T10:30:00Z'),
        ipAddress: '192.168.1.100',
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        result: 'success'
      }
    ],
    createdAt: new Date('2024-09-05'),
    updatedAt: new Date('2025-01-15')
  };
};

const createCounselorStudentConnection = (counselorId: string, studentId: string): UserConnection => {
  return {
    id: `connection_${counselorId}_${studentId}`,
    parentUserId: counselorId,
    childUserId: studentId,
    connectionType: 'counselor',
    isActive: true,
    permissions: {
      canViewApplications: true,
      canViewFinancialGoals: false, // Privacy protection
      canViewProgress: true,
      canEditProfile: false,
      canSubmitApplications: false,
      canReceiveNotifications: true,
      canAddDocumentLinks: true,
      canCreateScholarships: true,
      canViewSensitiveFinancials: false
    },
    canStudentRevoke: true,
    requiresStudentApproval: true, // Professional relationship
    accessLog: [],
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2025-01-10')
  };
};

/**
 * Institution Factory for Testing
 * Lincoln High School test institution
 */
const createLincolnHighSchool = (): Institution => {
  return {
    id: 'lincoln_hs_001',
    name: 'Lincoln High School',
    domain: 'lincolnhs.edu',
    type: 'high_school',
    address: '100 Education Drive',
    city: 'Springfield',
    state: 'Illinois',
    zipCode: '62703',
    country: 'United States',
    branding: {
      primaryColor: '#003366',
      secondaryColor: '#FFD700',
      welcomeMessage: 'Welcome to Lincoln High School Scholarship Tracker'
    },
    settings: {
      allowParentAccess: true,
      requireEmailVerification: true,
      customFields: [],
      scholarshipCategories: ['Merit', 'Need-Based', 'STEM', 'Service', 'Local']
    },
    licenseType: 'trial',
    maxStudents: 100,
    licenseStart: new Date('2024-08-01'),
    licenseEnd: new Date('2025-07-31'),
    isActive: true,
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2025-01-15')
  };
};

/**
 * Complete Test User Suite Factory
 * Creates all test users and their relationships
 */
const createTestUserSuite = () => {
  // Create users
  const alex = createAlexJohnson();
  const morgan = createMorganDavis();
  const patricia = createPatriciaJohnson();
  const drRodriguez = createDrRodriguez();
  
  // Create institution
  const lincolnHS = createLincolnHighSchool();
  
  // Create relationships
  const parentStudentConnection = createParentStudentConnection('user3', 'user1');
  const counselorAlexConnection = createCounselorStudentConnection('user4', 'user1');
  const counselorMorganConnection = createCounselorStudentConnection('user4', 'user2');
  
  return {
    users: [alex, morgan, patricia, drRodriguez],
    institution: lincolnHS,
    connections: [parentStudentConnection, counselorAlexConnection, counselorMorganConnection],
    testCredentials: {
      password: STANDARD_TEST_PASSWORD,
      passwordValidation: PASSWORD_REQUIREMENTS
    }
  };
};