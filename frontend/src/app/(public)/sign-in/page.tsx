'use client';

import Link from 'next/link';
import { SignInForm } from '@components';

export default function LoginPage() {
  const handleSignIn = (data: { email: string; password: string }) => {
    console.log('Form Ready for Backend:', data);
  };

  return (
    <main className="relative w-full flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4 gap-10">
      <div className="w-full">
        <SignInForm onSubmit={handleSignIn} />
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
