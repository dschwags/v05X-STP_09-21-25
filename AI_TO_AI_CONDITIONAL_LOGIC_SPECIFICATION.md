# 🤖 AI-TO-AI: JOIN STP CONDITIONAL LOGIC SPECIFICATION

**For AI Implementation Partner**  
**Source**: Scholarship Tracker Pro Registration System  
**Target**: New Build Implementation  
**Extraction Date**: 2025-09-19  

---

## 📋 **OVERVIEW**

This document provides **complete conditional logic specifications** extracted from the working Join STP registration form. Use this as a **direct implementation guide** for replicating the exact conditional field behavior in your new build.

### **🎯 Core Functionality**
- **Role-based form rendering** (Student, Parent, Counselor)  
- **Dynamic field visibility** based on user selections
- **Nested conditional logic** for education level sub-options
- **Context-sensitive validation** and form state management

---

## 🧠 **CONDITIONAL LOGIC ARCHITECTURE**

### **Primary Role Selection Logic**
```typescript
type UserRole = 'Student' | 'Parent' | 'Counselor';

// Master conditional logic configuration
interface RegistrationConditionalLogic {
  [K in UserRole]: {
    showEducationLevel: boolean;
    showInstitutionField: boolean;
    standardFields: string[];
    // Role-specific properties...
  };
}
```

### **State Management Pattern**
```typescript
const [selectedRole, setSelectedRole] = useState<UserRole>('Student');
const [selectedEducationLevel, setSelectedEducationLevel] = useState<string>('');
const [formData, setFormData] = useState<Record<string, string>>({});

// Safe role change handler with reset logic
const handleRoleChange = useCallback((role: UserRole) => {
  setSelectedRole(role);
  setSelectedEducationLevel(''); // CRITICAL: Reset education when role changes
  setError(null);
}, []);
```

---

## 🎓 **STUDENT ROLE CONDITIONAL LOGIC**

### **Education Level Options & Sub-Fields**
```typescript
Student: {
  showEducationLevel: true,
  showInstitutionField: false, // Handled by education sub-options
  educationLevelOptions: {
    "Currently enrolled (specify school below)": {
      showField: "Current Institution",
      placeholder: "Enter your current school or university name",
      fieldType: "text"
    },
    "Accepted/Planning to attend (specify school below)": {
      showField: "Future Institution", 
      placeholder: "Enter the school you'll be attending",
      fieldType: "text"
    },
    "Applying to multiple schools": {
      showField: false,
      displayNote: "You can add schools later in your profile",
      noteType: "info"
    },
    "Community college planning 4-year transfer": {
      showField: "Current Institution",
      placeholder: "Enter your current community college name",
      fieldType: "text"
    },
    "Military/Veteran pursuing education": {
      showField: false,
      displayNote: "Veteran-specific resources note",
      noteType: "veteran-resources"
    },
    "Adult learner/Returning to school": {
      showField: false,
      displayNote: "Adult learner resources note", 
      noteType: "adult-learner-resources"
    },
    "Working toward specific funding goal": {
      showField: false,
      displayNote: null,
      noteType: null
    },
    "Exploring options to maximize scholarships": {
      showField: false,
      displayNote: null,
      noteType: null
    },
    "Other (please describe)": {
      showField: "Please describe your situation",
      placeholder: "Please describe your situation/goal/path",
      fieldType: "textarea" // IMPORTANT: textarea for detailed description
    }
  },
  standardFields: ["Full Name", "Email Address", "Password", "Phone Number (Optional)"],
  additionalFields: ["Education Level", "Expected Graduation Year"]
}
```

### **Student Conditional Rendering Logic**
```jsx
{/* Education Level Dropdown - Student Only */}
{selectedRole === 'Student' && currentRoleLogic.showEducationLevel && (
  <div>
    <Label htmlFor="educationLevel">Education Level</Label>
    <Select value={selectedEducationLevel} onValueChange={handleEducationLevelChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select your education level" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(currentRoleLogic.educationLevelOptions || {}).map((option) => (
          <SelectItem key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)}

{/* Institution Field - Text Input */}
{selectedRole === 'Student' && 
 selectedEducationLevel && 
 currentEducationOption.showField && 
 currentEducationOption.fieldType === 'text' && (
  <div>
    <Label htmlFor="institution">{currentEducationOption.showField}</Label>
    <Input
      id="institution"
      type="text"
      placeholder={currentEducationOption.placeholder || ''}
      value={formData.institution || ''}
      onChange={(e) => handleInputChange('institution', e.target.value)}
    />
  </div>
)}

{/* Description Field - Textarea */}
{selectedRole === 'Student' && 
 selectedEducationLevel && 
 currentEducationOption.showField && 
 currentEducationOption.fieldType === 'textarea' && (
  <div>
    <Label htmlFor="description">{currentEducationOption.showField}</Label>
    <Textarea
      id="description"
      placeholder={currentEducationOption.placeholder || ''}
      value={formData.description || ''}
      onChange={(e) => handleInputChange('description', e.target.value)}
    />
  </div>
)}

{/* Expected Graduation Year - Student Only */}
{selectedRole === 'Student' && (
  <div>
    <Label htmlFor="graduationYear">Expected Graduation Year</Label>
    <Input
      id="graduationYear"
      type="number"
      placeholder="2025"
      value={formData.graduationYear || ''}
      onChange={(e) => handleInputChange('graduationYear', e.target.value)}
    />
  </div>
)}
```

---

## 👨‍👩‍👧‍👦 **PARENT ROLE CONDITIONAL LOGIC**

### **Parent Configuration**
```typescript
Parent: {
  showEducationLevel: false,     // HIDE education fields
  showInstitutionField: false,   // HIDE institution fields
  hideFields: ["Education Level", "Institution fields"],
  standardFields: ["Full Name", "Email Address", "Password", "Phone Number (Optional)"],
  additionalFeatures: {
    childLinking: true,
    displayNote: "You'll be able to link with your student after account creation"
  }
}
```

### **Parent Conditional Rendering Logic**
```jsx
{/* Parent Information Note */}
{selectedRole === 'Parent' && currentRoleLogic.additionalFeatures?.displayNote && (
  <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded">
    <p className="text-sm">{currentRoleLogic.additionalFeatures.displayNote}</p>
  </div>
)}

{/* Education fields are completely hidden for Parent role */}
{/* No education level dropdown */}
{/* No institution fields */}
{/* No graduation year field */}
```

---

## 🎓 **COUNSELOR ROLE CONDITIONAL LOGIC**

### **Counselor Configuration**
```typescript
Counselor: {
  showEducationLevel: false,     // HIDE student education fields
  showInstitutionField: true,    // SHOW counselor institution field
  institutionField: {
    label: "Institution/Organization",
    placeholder: "Enter your school, organization, or institution name",
    fieldType: "text",
    required: true               // REQUIRED field for counselors
  },
  standardFields: ["Full Name", "Email Address", "Password", "Phone Number (Optional)"]
}
```

### **Counselor Conditional Rendering Logic**
```jsx
{/* Counselor Institution Field - Required */}
{selectedRole === 'Counselor' && currentRoleLogic.showInstitutionField && (
  <div>
    <Label htmlFor="counselorInstitution">
      {currentRoleLogic.institutionField?.label || 'Institution/Organization'}
    </Label>
    <Input
      id="counselorInstitution"
      type="text"
      placeholder={currentRoleLogic.institutionField?.placeholder || ''}
      value={formData.counselorInstitution || ''}
      onChange={(e) => handleInputChange('counselorInstitution', e.target.value)}
      required={currentRoleLogic.institutionField?.required || false}
    />
  </div>
)}

{/* No education level fields for Counselor */}
{/* No graduation year field for Counselor */}
```

---

## 💡 **CONTEXTUAL NOTES & MESSAGING**

### **Dynamic Note Display Logic**
```jsx
{/* Education Level Notes - Student Only */}
{selectedEducationLevel && currentEducationOption.displayNote && (
  <div className="bg-blue-50 border border-blue-200 text-blue-800 px-4 py-3 rounded">
    <p className="text-sm">{currentEducationOption.displayNote}</p>
  </div>
)}
```

### **Note Types & Styling**
```typescript
// Note type definitions
noteType: 'info' | 'veteran-resources' | 'adult-learner-resources' | null

// Styling classes for different note types
const noteStyles = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  "veteran-resources": "bg-green-50 border-green-200 text-green-800",
  "adult-learner-resources": "bg-purple-50 border-purple-200 text-purple-800"
};
```

---

## 🔄 **FORM STATE MANAGEMENT**

### **Safe Option Resolution**
```typescript
// Get current education option safely with fallback
const currentEducationOption = selectedEducationLevel && selectedRole === 'Student'
  ? (currentRoleLogic.educationLevelOptions?.[selectedEducationLevel]) || {
      showField: false,
      placeholder: '',
      fieldType: 'text' as const,
      displayNote: null,
      noteType: null
    }
  : {
      showField: false,
      placeholder: '',
      fieldType: 'text' as const,
      displayNote: null,
      noteType: null
    };
```

### **Input Change Handler**
```typescript
const handleInputChange = useCallback((field: string, value: string) => {
  try {
    setFormData(prev => ({ ...(prev || {}), [field]: value }));
    setError(null);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    setError(errorMessage);
    console.error('Input change error:', err);
  }
}, []);
```

### **Form Submission Data Structure**
```typescript
const submitData = {
  role: selectedRole,
  educationLevel: selectedEducationLevel, // Only populated for Students
  ...formData // Contains all form field values
};
```

---

## ✅ **VALIDATION SCHEMA**

### **Backend Validation Schema (Zod)**
```typescript
const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  name: z.string().min(1).max(100).optional(),
  role: z.enum(['student', 'parent', 'counselor', 'admin']).default('student'),
  phone: z.string().optional(),
  educationLevel: z.enum([
    'high_school', 
    'undergraduate', 
    'graduate', 
    'doctoral', 
    'post_doctoral'
  ]).optional(),
  educationalStatus: z.enum([
    'currently_enrolled', 
    'accepted_planning', 
    'applying_multiple', 
    'community_college', 
    'military_veteran', 
    'adult_learner', 
    'funding_goal', 
    'exploring_options', 
    'other'
  ]).optional(),
  educationalDescription: z.string().max(500).optional(),
  graduationYear: z.string().optional().transform(val => val ? parseInt(val, 10) : undefined),
  school: z.string().max(200).optional()
});
```

### **Field Validation Rules**
```typescript
// Graduation year validation
if (graduationYear && (graduationYear < 2020 || graduationYear > 2040)) {
  return { error: 'Graduation year must be between 2020 and 2040' };
}

// Name validation (supports both firstName/lastName and combined name)
const fullName = firstName && lastName ? `${firstName} ${lastName}`.trim() : name || null;
if (!fullName || fullName.trim().length === 0) {
  return { error: 'Please provide your first and last name.' };
}

// Password complexity (dual policy - frontend uses complex validation)
const passwordCheck = validatePasswordStrength(password, 'complex');
if (!passwordCheck.isValid) {
  return { error: `Password requirements not met: ${passwordCheck.errors.join(', ')}` };
}
```

---

## 🎨 **UI COMPONENTS & STYLING**

### **Role Selection Radio Group**
```jsx
<div className="flex items-center space-x-2 p-3 border rounded-lg">
  <RadioGroupItem value="Student" id="student" />
  <div className="flex-1">
    <Label htmlFor="student" className="font-medium">Student</Label>
    <p className="text-sm text-gray-500">Manage your scholarship applications and track progress</p>
  </div>
</div>
```

### **Standard Form Fields**
```jsx
<div>
  <Label htmlFor="fullName">Full Name</Label>
  <Input
    id="fullName"
    type="text"
    placeholder="Enter your full name"
    value={formData.fullName || ''}
    onChange={(e) => handleInputChange('fullName', e.target.value)}
    required
  />
</div>
```

### **Header Styling**
```jsx
{/* Exact header from screenshots */}
<div className="text-center">
  <div className="mx-auto h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
    <GraduationCap className="h-8 w-8 text-white" />
  </div>
  <h2 className="mt-6 text-3xl font-bold text-gray-900">Join STP</h2>
  <p className="mt-2 text-sm text-gray-600">
    Create your Scholarship Tracker Pro account
  </p>
</div>
```

---

## 🔧 **ERROR HANDLING & SAFETY**

### **Error Boundary Pattern**
```typescript
try {
  // Component rendering logic
  return (/* JSX structure */);
} catch (error) {
  console.error('ValidatedRegistrationForm render error:', error);
  return (
    <div className="error-fallback bg-red-50 p-4 rounded">
      <h3>Error loading registration form</h3>
      <p>Please try refreshing the page.</p>
    </div>
  );
}
```

### **Safe Event Handlers**
```typescript
const handleRoleChange = useCallback((role: UserRole) => {
  try {
    setSelectedRole(role);
    setSelectedEducationLevel(''); // Reset education level when role changes
    setError(null);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    setError(errorMessage);
    console.error('Role change error:', err);
  }
}, []);
```

---

## 🚀 **IMPLEMENTATION CHECKLIST**

### **✅ Core Features to Implement**
- [ ] **Role selection** with 3 options (Student, Parent, Counselor)
- [ ] **Dynamic field visibility** based on role selection
- [ ] **Student education level** dropdown with 9 options
- [ ] **Nested conditional fields** for education sub-options
- [ ] **Institution/organization field** for counselors (required)
- [ ] **Contextual notes** with proper styling
- [ ] **Form state reset** when changing roles
- [ ] **Proper validation** with Zod schema
- [ ] **Error boundaries** and safe handlers

### **✅ UI Components Required**
- [ ] **RadioGroup** for role selection
- [ ] **Select** for education level dropdown
- [ ] **Input** fields (text, email, password, tel, number)
- [ ] **Textarea** for detailed descriptions
- [ ] **Label** components with proper associations
- [ ] **Card** wrapper with header/content sections
- [ ] **Button** with loading states
- [ ] **Alert/Note** components for contextual messages

### **✅ State Management**
- [ ] **selectedRole** state with UserRole type
- [ ] **selectedEducationLevel** state (string)
- [ ] **formData** object for all form values
- [ ] **loading** and **error** states
- [ ] **Safe change handlers** with error boundaries
- [ ] **Form reset logic** when role changes

---

## 🎯 **IMPLEMENTATION NOTES**

### **Critical Implementation Details**
1. **Role Change Reset**: Always reset `selectedEducationLevel` when role changes
2. **Type Safety**: Use proper TypeScript types for role and education options
3. **Fallback Values**: Always provide fallback objects for conditional rendering
4. **Field IDs**: Use consistent field IDs for accessibility and form handling
5. **Error Handling**: Wrap all handlers in try-catch blocks
6. **Validation**: Implement both frontend and backend validation
7. **Accessibility**: Proper label associations and ARIA attributes

### **Performance Considerations**
- Use `useCallback` for event handlers to prevent unnecessary re-renders
- Memoize complex calculations if needed
- Safe access patterns to prevent runtime errors
- Proper cleanup of form state when unmounting

---

**🎉 This specification provides everything needed to replicate the exact conditional logic behavior from the Join STP registration form in your new build. All patterns, state management, validation rules, and UI components are documented for direct implementation.**