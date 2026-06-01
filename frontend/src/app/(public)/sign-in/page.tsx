'use client';

import { SignInForm } from '@components';

export default function LoginPage() {
  const handleSignIn = (data: { email: string; password: string }) => {
    console.log('Form Ready for Backend:', data);
  };

  return <SignInForm onSubmit={handleSignIn} />;
}
