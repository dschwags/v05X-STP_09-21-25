import { Suspense } from 'react';
import { Login } from '../login';
import RegistrationFormWrapper from '@/components/registration-form-wrapper';
import { signUp } from '../actions';

// BugX v1.4.1: Simplified registration flow
const USE_NEW_REGISTRATION = true;

export default function SignUpPage() {
  if (USE_NEW_REGISTRATION) {
    return (
      <RegistrationFormWrapper 
        serverAction={signUp}
      />
    );
  }

  return (
    <Suspense>
      <Login mode="signup" />
    </Suspense>
  );
}
