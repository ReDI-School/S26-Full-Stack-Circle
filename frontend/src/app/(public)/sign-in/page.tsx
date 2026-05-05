'use client';

import Link from 'next/link';
import { SignInForm } from '../../../components/SignInForm';

export default function LoginPage() {
  const handleSignIn = (data: { email: string; password: string }) => {
    console.log('Form Ready for Backend:', data);
  };
  return (
    <main className="relative w-full flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4">
      <div className="absolute top-0 right-8 text-center md:text-right hidden md:flex items-center ">
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
      <div className="w-full">
        <SignInForm onSubmit={handleSignIn} />
      </div>
      {/*movil version*/}
      <div className="flex w-full items-center justify-center mt-10">
        <div className="flex flex-row items-center gap-1 md:hidden ">
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
      </div>
    </main>
  );
}
