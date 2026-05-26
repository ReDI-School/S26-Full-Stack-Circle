'use client';

import Link from 'next/link';
import { SignInForm } from '@components';
import { useAuth } from 'src/hooks/useAuth';

export default function LoginPage() {
  const { signIn } = useAuth();

  const handleSignIn = async (data: { email: string; password: string }) => {
    await signIn(data.email, data.password);
  };

  return (
    <main className="relative w-full flex flex-col items-center justify-center min-h-[calc(100vh-80px)] py-12 px-4 gap-10">
      <div className="w-full">
        <SignInForm onSubmit={handleSignIn} />
      </div>

      <div className="flex items-center justify-center gap-1 lg:absolute lg:top-0 lg:right-0">
        <span className="text-base text-gray-450">Don't have account?</span>

        <Link href="/sign-up" className="text-primary-redi uppercase hover:underline">
          SIGN UP
        </Link>
      </div>
    </main>
  );
}
