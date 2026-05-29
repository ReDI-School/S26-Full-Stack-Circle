'use client';

import Link from 'next/link';
import { SignInForm } from '@components';

export default function LoginPage() {
  const handleSignIn = (data: { email: string; password: string }) => {
    console.log('Form Ready for Backend:', data);
  };

  return (
    <div className="relative w-full md:h-full flex-1 flex flex-col gap-8 items-center justify-center">
      <div className="w-full">
        <SignInForm onSubmit={handleSignIn} />
      </div>
      <div className="flex items-center justify-center gap-1  md:absolute md:top-0 md:right-0 md:mt-0 md:text-right">
        <span className="text-base font-normal text-gray-450">{"Don't have account?"}</span>
        <Link
          href="/sign-up"
          className="text-base font-medium text-primary-redi uppercase transition-colors hover:underline"
        >
          SIGN UP
        </Link>
      </div>
    </div>
  );
}
