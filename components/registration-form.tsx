'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, EyeOff, GraduationCap, Users, UserCheck, Loader2 } from 'lucide-react';
import { UserRole, EducationLevel, EducationalStatus } from '@/lib/db/schema';

interface RegistrationFormProps {
  onSubmit: (data: RegistrationFormData) => Promise<void>;
  isLoading?: boolean;
  error?: string;
}

export interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  role: UserRole;
  
  // Educational fields (primarily for students)
  educationalStatus?: EducationalStatus;
  educationLevel?: EducationLevel;
  expectedGraduationYear?: number;
  futureInstitution?: string;
  
  // Parent fields
  childEmail?: string;
  
  // Counselor fields
  institution?: string;
  institutionType?: string;
}

const roleOptions = [
  {
    value: 'student' as UserRole,
    label: 'Student',
    icon: GraduationCap,
    description: 'Manage your scholarship applications and track progress'
  },
  {
    value: 'parent' as UserRole,
    label: 'Parent',
    icon: Users,
    description: 'Monitor and support your child\'s scholarship journey'
  },
  {
    value: 'counselor' as UserRole,
    label: 'Counselor',
    icon: UserCheck,
    description: 'Guide students and manage scholarship programs'
  }
];

const educationalStatusOptions = [
  { value: 'accepted_planning_to_attend', label: 'Accepted/Planning to attend (specify school below)' },
  { value: 'currently_enrolled', label: 'Currently enrolled' },
  { value: 'graduated', label: 'Graduated' },
  { value: 'gap_year', label: 'Gap year' },
  { value: 'transferring', label: 'Transferring' }
];

const educationLevelOptions = [
  { value: 'high_school', label: 'High School' },
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'doctoral', label: 'Doctoral' },
  { value: 'post_doctoral', label: 'Post-Doctoral' }
];

export default function RegistrationForm({ onSubmit, isLoading = false, error }: RegistrationFormProps) {
  const [formData, setFormData] = useState<RegistrationFormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    role: 'student'
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());

  const updateField = (field: keyof RegistrationFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  const isFormValid = () => {
    const basicValid = formData.firstName && formData.lastName && formData.email && formData.password && formData.role;
    
    if (formData.role === 'student') {
      return basicValid && formData.educationalStatus && formData.educationLevel;
    }
    
    return basicValid;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-center text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Join STP
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Create your Scholarship Tracker Pro account
        </p>
      </div>

      <Card className="sm:mx-auto sm:w-full sm:max-w-md bg-white dark:bg-gray-800 shadow-xl">
        <CardHeader className="pb-6">
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
            Create Account
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            Fill in your information to get started
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                I am a...
              </Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value: UserRole) => updateField('role', value)}
                className="space-y-3"
              >
                {roleOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <RadioGroupItem value={option.value} id={option.value} />
                    <option.icon className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <Label htmlFor={option.value} className="text-sm font-medium text-gray-900 dark:text-white cursor-pointer block">
                        {option.label}
                      </Label>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Basic Information */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => updateField('firstName', e.target.value)}
                    placeholder="First name"
                    className="rounded-lg"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => updateField('lastName', e.target.value)}
                    placeholder="Last name"
                    className="rounded-lg"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="Enter your email"
                  className="rounded-lg"
                  required
                />
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => updateField('password', e.target.value)}
                    placeholder="Enter your password"
                    className="rounded-lg pr-10"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Must be at least 8 characters long
                </p>
              </div>
            </div>

            {/* Student-specific Fields */}
            {formData.role === 'student' && (
              <div className="space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Educational Status
                  </Label>
                  <RadioGroup
                    value={formData.educationalStatus}
                    onValueChange={(value: EducationalStatus) => updateField('educationalStatus', value)}
                    className="space-y-2"
                  >
                    {educationalStatusOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`status-${option.value}`} />
                        <Label htmlFor={`status-${option.value}`} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Education Level
                  </Label>
                  <RadioGroup
                    value={formData.educationLevel}
                    onValueChange={(value: EducationLevel) => updateField('educationLevel', value)}
                    className="space-y-2"
                  >
                    {educationLevelOptions.map((option) => (
                      <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem value={option.value} id={`level-${option.value}`} />
                        <Label htmlFor={`level-${option.value}`} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                {formData.educationLevel && (
                  <div>
                    <Label htmlFor="graduationYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Expected Graduation Year
                    </Label>
                    <Input
                      id="graduationYear"
                      type="number"
                      value={formData.expectedGraduationYear || ''}
                      onChange={(e) => updateField('expectedGraduationYear', parseInt(e.target.value) || undefined)}
                      placeholder={currentYear.toString()}
                      min={currentYear}
                      max={currentYear + 10}
                      className="rounded-lg"
                    />
                  </div>
                )}

                {(formData.educationalStatus === 'accepted_planning_to_attend' || formData.educationalStatus === 'currently_enrolled') && (
                  <div>
                    <Label htmlFor="futureInstitution" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {formData.educationalStatus === 'accepted_planning_to_attend' ? 'Future Institution' : 'Current Institution'}
                    </Label>
                    <Input
                      id="futureInstitution"
                      type="text"
                      value={formData.futureInstitution || ''}
                      onChange={(e) => updateField('futureInstitution', e.target.value)}
                      placeholder="Enter the school you'll be attending"
                      className="rounded-lg"
                    />
                  </div>
                )}
              </div>
            )}

            {/* Parent-specific Fields */}
            {formData.role === 'parent' && (
              <div className="space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                <div>
                  <Label htmlFor="childEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Child's Email <Badge variant="secondary" className="ml-2">Optional</Badge>
                  </Label>
                  <Input
                    id="childEmail"
                    type="email"
                    value={formData.childEmail || ''}
                    onChange={(e) => updateField('childEmail', e.target.value)}
                    placeholder="child@email.com"
                    className="rounded-lg"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Link to your child's existing account (if they have one)
                  </p>
                </div>
              </div>
            )}

            {/* Counselor-specific Fields */}
            {formData.role === 'counselor' && (
              <div className="space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                <div>
                  <Label htmlFor="institution" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Institution Name
                  </Label>
                  <Input
                    id="institution"
                    type="text"
                    value={formData.institution || ''}
                    onChange={(e) => updateField('institution', e.target.value)}
                    placeholder="University or High School name"
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <Label htmlFor="institutionType" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Institution Type
                  </Label>
                  <Input
                    id="institutionType"
                    type="text"
                    value={formData.institutionType || ''}
                    onChange={(e) => updateField('institutionType', e.target.value)}
                    placeholder="e.g., High School, University, Community College"
                    className="rounded-lg"
                  />
                </div>
              </div>
            )}

            {/* Phone Number (Optional for all) */}
            <div>
              <Label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number <Badge variant="secondary" className="ml-2">Optional</Badge>
              </Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber || ''}
                onChange={(e) => updateField('phoneNumber', e.target.value)}
                placeholder="Enter your phone number"
                className="rounded-lg"
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
              disabled={isLoading || !isFormValid()}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}