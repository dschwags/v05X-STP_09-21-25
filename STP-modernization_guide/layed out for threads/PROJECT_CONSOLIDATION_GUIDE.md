# Technical Architecture Specification

**Document Version:** 2.0  
**Release Date:** September 2025  
**Last Updated:** September 2025  
**Part of:** [Scholarship Tracker Pro Modernization Suite](master_modernization_guide.md)

**Author:** David Schwager / BrewX  
**Contact:** bugx@brewx.com  
**Copyright Notice:** © 2025 David Schwager / BrewX. All rights reserved.

---

## Technology Stack

### Core Technologies
```
FRAMEWORK: Next.js 14+ (App Router, React Server Components)
AUTHENTICATION: NextAuth.js v5 (clean implementation, no legacy locks)
DATABASE: PostgreSQL (institutional scalability)
ORM: Prisma (type-safe, migration-friendly)
STATE MANAGEMENT: Zustand + React Query (minimal complexity)
STYLING: Tailwind CSS (existing design preservation)
FORMS: React Hook Form + Zod validation (type-safe)
UI COMPONENTS: shadcn/ui (component consistency)
DEPLOYMENT: Vercel/AWS (institutional reliability)
RUNTIME: Edge Runtime compatible
```

### Development Quality Assurance
```
TYPESCRIPT: Strict mode enabled
BUGX METHODOLOGY: Integrated by default
TESTING: Jest + React Testing Library + Playwright
LINTING: ESLint + Prettier + TypeScript strict rules
VALIDATION: Zod schemas for all data structures
ERROR MONITORING: Sentry or similar for production
PERFORMANCE: Web Vitals monitoring and optimization
```

---

## Database Architecture

### Core Entity Relationships
```typescript
interface DatabaseSchema {
  users: User[];              // Core user accounts
  institutions: Institution[]; // Educational institutions (NEW)
  scholarships: Scholarship[]; // Available scholarships
  applications: Application[]; // User scholarship applications
  financialGoals: FinancialGoal[]; // Financial planning data
  requirements: Requirement[]; // Scholarship requirements
  userConnections: UserConnection[]; // Parent/counselor linking
  documentReferences: DocumentReference[]; // Link-based documents
  bugxMetrics: BugXSession[]; // BugX usage tracking
}

// Relationship mapping
User -> Applications (1:many)
User -> FinancialGoals (1:many) 
User -> UserConnections (1:many)
Institution -> Users (1:many)
Institution -> Scholarships (1:many)
Scholarship -> Applications (1:many)
Scholarship -> Requirements (1:many)
Application -> DocumentReferences (1:many)
```

### User Entity (Complete)
```typescript
interface User {
  id: string; // UUIDs for easier cross-system compatibility
  name: string;
  email: string;
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
  
  // Institutional Context
  institutionId?: string;
  institution?: Institution;
  
  // Migration tracking
  migratedFrom?: string;
  migrationDate?: Date;
  legacyUserId?: string;
  
  // System Fields
  isActive: boolean;
  emailVerified: boolean;
  preferences: UserPreferences; // JSON field
  resetToken?: string;
  resetTokenExpiry?: Date;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  notifications: {
    deadlineReminders: boolean;
    statusUpdates: boolean;
    newScholarships: boolean;
  };
  dashboard: {
    defaultView: 'overview' | 'scholarships' | 'financial';
    compactMode: boolean; // For space optimization
  };
  privacy: {
    profileVisibility: 'public' | 'connections_only' | 'private';
    allowParentAccess: boolean;
  };
}
```

### Institution Entity (Institutional Licensing)
```typescript
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
  
  // Relationships
  users: User[];
  scholarships: Scholarship[];
  
  // System Fields
  createdAt: Date;
  updatedAt: Date;
}
```

### Document Reference Entity (Link-Based Security)
```typescript
interface DocumentReference {
  id: string;
  type: 'transcript' | 'essay' | 'financial_doc' | 'recommendation' | 'portfolio';
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

// Security validation for external links
const validateExternalUrl = (url: string): boolean => {
  const allowedDomains = [
    'drive.google.com',
    'dropbox.com', 
    'onedrive.live.com',
    'icloud.com',
    'box.com'
  ];
  
  try {
    const urlObj = new URL(url);
    return allowedDomains.some(domain => urlObj.hostname.includes(domain));
  } catch {
    return false;
  }
};
```

---

## Authentication & Security

### NextAuth.js v5 Implementation
```typescript
// Clean authentication configuration
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { comparePasswords } from "@/lib/auth/password"

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })
        
        if (user && await comparePasswords(credentials.password, user.passwordHash)) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          }
        }
        return null
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.sub
      session.user.role = token.role
      return session
    }
  }
})
```

### Password Security
```typescript
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

// Modern password hashing
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12; // Industry standard for 2025
  return await bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash);
};

// Password reset system
interface PasswordReset {
  token: string; // Cryptographically secure random token
  userId: string;
  expiresAt: Date; // 1-hour expiration
  isUsed: boolean;
}

export const generateResetToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};
```

### Role-Based Access Control
```typescript
interface UserPermissions {
  // Student permissions (full control)
  student: {
    canCreateScholarships: true;
    canEditScholarships: true;
    canDeleteScholarships: true;
    canViewFinancialData: true;
    canEditFinancialData: true;
    canManageConnections: true;
    canShareDocuments: true;
  };
  
  // Parent permissions (supportive access)
  parent: {
    canCreateScholarships: true;
    canEditScholarships: true;
    canDeleteScholarships: false; // Student approval required
    canViewFinancialData: true;
    canEditFinancialData: true;
    canAddDocumentLinks: true;
    canViewSensitiveFinancials: true;
  };
  
  // Counselor permissions (professional guidance)
  counselor: {
    canCreateScholarships: true;
    canEditScholarships: true;
    canDeleteScholarships: false;
    canViewFinancialData: false; // Privacy protection
    canViewScholarshipProgress: true;
    canAddInstitutionalScholarships: true;
    canViewSensitiveFinancials: false;
  };
}

// Access control middleware
export const requirePermission = (permission: keyof UserPermissions[keyof UserPermissions]) => {
  return async (req: NextRequest) => {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.redirect('/login');
    }
    
    const userPermissions = UserPermissions[session.user.role];
    if (!userPermissions[permission]) {
      return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 });
    }
    
    return NextResponse.next();
  };
};
```

---

## API Architecture

### RESTful API Design
```typescript
// API route structure
app/api/
├── auth/
│   ├── login/route.ts
│   ├── register/route.ts
│   └── reset-password/route.ts
├── users/
│   ├── [id]/route.ts
│   ├── [id]/scholarships/route.ts
│   └── [id]/financial-goals/route.ts
├── scholarships/
│   ├── route.ts
│   ├── [id]/route.ts
│   └── [id]/applications/route.ts
├── institutions/
│   ├── route.ts
│   ├── [id]/route.ts
│   └── [id]/users/route.ts
└── upload/
    ├── documents/route.ts
    └── scholarships/route.ts
```

### BugX-Safe API Patterns
```typescript
// BugX compliant API route template
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // BugX: Always validate session first
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // BugX: Validate user exists (prevent legacy locks)
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });
    
    if (!user) {
      // BugX: Clear invalid session to prevent legacy locks
      await signOut({ redirect: false });
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }
    
    // BugX: Validate permissions
    if (!hasPermission(user, 'view', params.id)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    // Process request safely
    const result = await safeDataRetrieval(params.id);
    return NextResponse.json(result);
    
  } catch (error) {
    // BugX: Comprehensive error handling
    console.error('API Error:', error);
    await logBugXError(error, 'api_route', { userId: session?.user?.id, route: req.url });
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}

// Safe data retrieval with BugX patterns
const safeDataRetrieval = async (id: string) => {
  const bugxSession = new BugXSession('data_retrieval', 'existing_debugging');
  
  try {
    await bugxSession.startValidation({
      issueType: 'integration',
      complexity: 'simple',
      validationLevel: 'minimal',
      estimatedRisk: 'low'
    });
    
    const data = await prisma.scholarship.findUnique({
      where: { id },
      include: {
        applications: true,
        requirements: true,
        documentReferences: true
      }
    });
    
    await bugxSession.endDebugging('success');
    return data;
    
  } catch (error) {
    await bugxSession.endDebugging('failure');
    throw error;
  }
};
```

---

## File Upload Security

### Database File Upload (Scholarship Data Only)
```typescript
const scholarshipDatabaseUpload = {
  allowedFormats: ['.csv', '.xlsx', '.json'],
  maxFileSize: 10 * 1024 * 1024, // 10MB
  requiredColumns: ['title', 'amount', 'deadline', 'provider'],
  
  scanForMaliciousContent: async (file: File): Promise<boolean> => {
    const content = await file.text();
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /data:.*base64/i,
      /eval\(/i,
      /onclick/i,
      /onerror/i,
      /onload/i
    ];
    
    return !suspiciousPatterns.some(pattern => pattern.test(content));
  },
  
  validateDataStructure: async (parsedData: any[]): Promise<ValidationResult> => {
    const requiredFields = ['title', 'provider', 'amount', 'deadline'];
    const errors: string[] = [];
    
    parsedData.forEach((row, index) => {
      requiredFields.forEach(field => {
        if (!row[field]) {
          errors.push(`Row ${index + 1}: Missing required field '${field}'`);
        }
      });
      
      // Validate data types
      if (row.amount && (isNaN(row.amount) || row.amount <= 0)) {
        errors.push(`Row ${index + 1}: Invalid amount value`);
      }
      
      if (row.deadline && !Date.parse(row.deadline)) {
        errors.push(`Row ${index + 1}: Invalid deadline format`);
      }
    });
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }
};
```

---

## State Management Architecture

### Zustand Store Configuration
```typescript
// Global state management with Zustand
interface AppStore {
  // User state
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Form state
  currentForm: FormData | null;
  setCurrentForm: (form: FormData | null) => void;
  
  // UI state
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  
  // Institution state
  currentInstitution: Institution | null;
  setCurrentInstitution: (institution: Institution | null) => void;
  
  // BugX state
  bugxSession: BugXSession | null;
  setBugxSession: (session: BugXSession | null) => void;
  
  // Safe update methods with BugX patterns
  safeUpdate: <T>(updater: (prev: T) => T, fallback: T) => void;
}

const useAppStore = create<AppStore>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),
  
  currentForm: null,
  setCurrentForm: (form) => set({ currentForm: form }),
  
  theme: 'system',
  setTheme: (theme) => set({ theme }),
  
  currentInstitution: null,
  setCurrentInstitution: (institution) => set({ currentInstitution: institution }),
  
  bugxSession: null,
  setBugxSession: (session) => set({ bugxSession: session }),
  
  safeUpdate: (updater, fallback) => {
    try {
      const current = get();
      const updated = updater(current);
      set(updated);
    } catch (error) {
      console.error('State update error:', error);
      set(fallback);
    }
  }
}));
```

### React Query Configuration
```typescript
// Data fetching and caching with React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // BugX: Intelligent retry logic
        if (error.status === 401 || error.status === 403) {
          return false; // Don't retry auth errors
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        // BugX: Log mutation errors for pattern analysis
        logBugXError(error, 'mutation_error');
      }
    }
  }
});

// Custom hooks with BugX integration
export const useScholarships = (userId: string) => {
  return useQuery({
    queryKey: ['scholarships', userId],
    queryFn: async () => {
      const bugxSession = new BugXSession('data_fetch', 'existing_debugging');
      
      try {
        await bugxSession.startValidation({
          issueType: 'integration',
          complexity: 'simple',
          validationLevel: 'minimal',
          estimatedRisk: 'low'
        });
        
        const response = await fetch(`/api/users/${userId}/scholarships`);
        if (!response.ok) throw new Error('Failed to fetch scholarships');
        
        const data = await response.json();
        await bugxSession.endDebugging('success');
        return data;
        
      } catch (error) {
        await bugxSession.endDebugging('failure');
        throw error;
      }
    }
  });
};
```

---

## Performance Optimization

### Edge Runtime Compatibility
```typescript
// Ensure all API routes work with Edge Runtime
export const runtime = 'edge';

// Optimize for Edge Runtime
const edgeOptimizedQuery = async (query: string, params: any[]) => {
  // Use connection pooling
  const connection = await getEdgeConnection();
  
  try {
    const result = await connection.query(query, params);
    return result;
  } finally {
    await connection.release();
  }
};
```

### Image Optimization
```typescript
// Next.js Image optimization configuration
const nextConfig = {
  images: {
    domains: ['drive.google.com', 'dropbox.com', 'onedrive.live.com'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400, // 24 hours
    dangerouslyAllowSVG: false, // Security: no SVG uploads
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@/components/ui']
  }
};
```

### Caching Strategy
```typescript
// Multi-layer caching strategy
interface CacheConfig {
  // CDN caching for static assets
  cdn: {
    maxAge: 31536000, // 1 year for immutable assets
    staleWhileRevalidate: 86400 // 24 hours
  };
  
  // API response caching
  api: {
    scholarships: 300, // 5 minutes
    userProfile: 600, // 10 minutes
    institutions: 3600 // 1 hour
  };
  
  // Database query caching
  database: {
    connectionPool: 20,
    queryTimeout: 30000, // 30 seconds
    idleTimeout: 300000 // 5 minutes
  };
}
```

---

## Monitoring and Observability

### Error Tracking
```typescript
// Comprehensive error monitoring
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  
  // BugX integration
  beforeSend(event) {
    // Add BugX context to error reports
    if (event.extra) {
      event.extra.bugxSession = getCurrentBugXSession();
      event.extra.userRole = getCurrentUserRole();
      event.extra.institutionId = getCurrentInstitutionId();
    }
    return event;
  },
  
  // Performance monitoring
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
  
  // Session replay for debugging
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0
});
```

### Performance Monitoring
```typescript
// Web Vitals tracking
export function reportWebVitals(metric: NextWebVitalsMetric) {
  // BugX: Track performance metrics
  const bugxMetrics = {
    name: metric.name,
    value: metric.value,
    id: metric.id,
    label: metric.label,
    timestamp: Date.now(),
    userAgent: navigator.userAgent,
    userId: getCurrentUserId(),
    institutionId: getCurrentInstitutionId()
  };
  
  // Send to analytics
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/performance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(bugxMetrics)
    });
  }
}
```

---

## Deployment Architecture

### Environment Configuration
```typescript
// Environment-specific configurations
interface EnvironmentConfig {
  development: {
    database: 'postgresql://localhost:5432/scholarship_tracker_dev';
    redis: 'redis://localhost:6379';
    nextauth_secret: 'dev-secret-key';
    nextauth_url: 'http://localhost:3000';
  };
  
  staging: {
    database: process.env.DATABASE_URL;
    redis: process.env.REDIS_URL;
    nextauth_secret: process.env.NEXTAUTH_SECRET;
    nextauth_url: process.env.NEXTAUTH_URL;
  };
  
  production: {
    database: process.env.DATABASE_URL;
    redis: process.env.REDIS_URL;
    nextauth_secret: process.env.NEXTAUTH_SECRET;
    nextauth_url: process.env.NEXTAUTH_URL;
    sentry_dsn: process.env.SENTRY_DSN;
    monitoring_enabled: true;
  };
}
```

### Migration Strategy
```typescript
// Database migration with BugX safety checks
interface MigrationPlan {
  // Pre-migration validation
  preMigrationChecks: [
    'backup_database',
    'validate_schema_compatibility',
    'check_data_integrity',
    'verify_connection_pools'
  ];
  
  // Migration execution
  migrationSteps: [
    'create_new_tables',
    'migrate_user_data',
    'migrate_scholarship_data',
    'migrate_application_data',
    'update_indexes',
    'verify_data_consistency'
  ];
  
  // Post-migration validation
  postMigrationChecks: [
    'validate_all_relationships',
    'test_critical_user_flows',
    'verify_performance_benchmarks',
    'run_bugx_validation_suite'
  ];
  
  // Rollback plan
  rollbackProcedure: [
    'stop_new_connections',
    'restore_from_backup',
    'validate_rollback_success',
    'resume_normal_operations'
  ];
}
```

---

## Security Considerations

### FERPA Compliance
```typescript
interface FERPACompliance {
  dataClassification: {
    educationalRecords: 'protected';
    personalIdentifiers: 'protected';
    financialInformation: 'protected';
    scholarshipApplications: 'protected';
  };
  
  accessControls: {
    studentRecords: 'student_only_unless_consent';
    parentAccess: 'under_18_or_explicit_consent';
    counselorAccess: 'legitimate_educational_interest';
    institutionAccess: 'need_to_know_basis';
  };
  
  auditRequirements: {
    logAllAccess: true;
    retainAuditLogs: '3_years';
    includeUserIdentification: true;
    trackDataModifications: true;
  };
}
```

### Data Encryption
```typescript
// Encryption for sensitive data
import crypto from 'crypto';

const encryptSensitiveData = (data: string): string => {
  const algorithm = 'aes-256-gcm';
  const key = crypto.scryptSync(process.env.ENCRYPTION_KEY!, 'salt', 32);
  const iv = crypto.randomBytes(16);
  
  const cipher = crypto.createCipher(algorithm, key);
  cipher.setAAD(Buffer.from('scholarship-tracker', 'utf8'));
  
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  const authTag = cipher.getAuthTag();
  
  return `${iv.toString('hex')}:${authTag.toString('hex')}:${encrypted}`;
};

const decryptSensitiveData = (encryptedData: string): string => {
  const [ivHex, authTagHex, encrypted] = encryptedData.split(':');
  const algorithm = 'aes-256-gcm';
  const key = crypto.scryptSync(process.env.ENCRYPTION_KEY!, 'salt', 32);
  
  const decipher = crypto.createDecipher(algorithm, key);
  decipher.setAuthTag(Buffer.from(authTagHex, 'hex'));
  decipher.setAAD(Buffer.from('scholarship-tracker', 'utf8'));
  
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
};
```

---

*Technical Architecture Specification v2.0*  
*© 2025 David Schwager / BrewX. All rights reserved.*  
*Part of Scholarship Tracker Pro Modernization Suite*