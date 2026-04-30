'use client';

import Link from 'next/link';
import { SignInForm } from '../../../components/SignInForm';

export default function LoginPage() {
  const handleSignIn = (data: { email: string; password: string }) => {
    console.log('Form Ready for Backend:', data);
  };
  return (
    <main className="relative w-full flex flex-col justify-center min-h-[calc(100vh-80px)] py-12 px-4">
      <div className="order-last mt-8 text-center text-sm md:absolute md:top-8 md:right-8 md:mt-0 md:order-none">
        <span className=" text-base font-normal text-(--color-gray-450)">
          {"Don't have account? "}
        </span>
        <Link
          href="/sign-up"
          className="text-base font-medium text-(--color-primary-redi) uppercase transition-colors hover:underline"
        >
          SIGN UP
        </Link>
      </div>
      <div className="w-full max-w-[468px]">
        <SignInForm onSubmit={handleSignIn} />
      </div>
    </main>
  );
}
