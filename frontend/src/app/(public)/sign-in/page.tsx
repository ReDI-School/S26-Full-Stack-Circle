'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SignInForm } from '@components';


export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [serverError, setServerError] = useState<string | undefined>(undefined);

  const handleSignIn = async (data: { email: string; password: string }) => {
    setIsLoading(true);
    setServerError(undefined);

    try {
      
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'An error occurred during sign-in.');
      }

      localStorage.setItem('token', result.token);
      router.push('/dashboard');

    } catch (error) {
      setServerError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative w-full flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4 gap-10">
      <div className="w-full">
        <SignInForm 
          onSubmit={handleSignIn} 
          isLoading={isLoading}
          serverError={serverError}
        />
      </div>
      <div className="flex items-center justify-center gap-1  lg:absolute lg:top-0 lg:right-0 lg:mt-0 lg:text-right">
        <span className="text-base font-normal text-gray-450">{"Don't have account?"}</span>
        <Link
          href="/sign-up"
          className="text-base font-medium text-primary-redi uppercase transition-colors hover:underline"
        >
          SIGN UP
        </Link>
      </div>
    </main>
  );
}
