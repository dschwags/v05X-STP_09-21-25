'use client';

import { useState } from 'react';
import { JoinSTPRegistration } from './join-stp-registration';

interface JoinSTPFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: 'Student' | 'Parent' | 'Counselor';
  goal?: string; // Only for Student/Parent
  phoneNumber?: string;
  educationalStatus?: string;
  educationLevel?: string;
  institution?: string;
  institutionType?: string; // For Counselors
  studentEmail?: string;
  expectedGraduationYear?: string;
}

interface RegistrationFormWrapperProps {
  serverAction: any; // BugX v1.4.1: Simplified typing for credit efficiency
}

export default function RegistrationFormWrapper({ serverAction }: RegistrationFormWrapperProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    setError('');

    try {
      // BugX: Call server action with fallback error handling
      const result = await serverAction({ error: '' }, formData);
      
      if (result?.error) {
        setError(result.error);
      }
      // Success redirects automatically via server action
      
    } catch (err) {
      console.error('🚨 BugX Registration Error:', err);
      setError('Registration failed. Please try again or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <JoinSTPRegistration
      onSubmit={handleSubmit}
      isSubmitting={isLoading}
    />
  );
}