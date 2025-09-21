'use client';

import { useState } from 'react';
import RegistrationForm, { type RegistrationFormData } from './registration-form';
import { validateRegistration } from '@/lib/validation/registration-schemas';
import { ActionState } from '@/lib/auth/middleware';

interface RegistrationFormClientProps {
  onSubmit: (prevState: ActionState, formData: FormData) => Promise<ActionState>;
}

export default function RegistrationFormClient({ onSubmit }: RegistrationFormClientProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleSubmit = async (data: RegistrationFormData) => {
    setIsLoading(true);
    setError('');

    try {
      // Validate the data
      const validation = validateRegistration(data);
      
      if (!validation.success) {
        const errorMessages = Object.values(validation.errors).flat();
        setError(errorMessages[0] || 'Please check your input and try again.');
        return;
      }

      // Convert to FormData for server action
      const formData = new FormData();
      
      // Add all fields to FormData
      Object.entries(validation.data).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          formData.append(key, String(value));
        }
      });

      const result = await onSubmit({ error: '' }, formData);
      
      if (result?.error) {
        setError(result.error);
      }
      // If successful, the server action will redirect
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <RegistrationForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
      error={error}
    />
  );
}