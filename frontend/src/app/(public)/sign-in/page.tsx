import { SignInForm } from '../../../components/SignInForm';
import { PublicLayout } from '../../../components/PublicLayout/PublicLayout';
import Link from 'next/link';

export default function LoginPage() {
  const handleSignIn = (data: { email: string; password: string }) => {
    console.log('Form Ready for Backend:', data);
  };
  return (
    <PublicLayout>
      <main className="w-full max-w-[468px] mx-auto py-12 px-4 flex flex-col justify-center min-h-[calc(100vh-80px)]">
        <SignInForm onSubmit={handleSignIn} />
      </main>
    </PublicLayout>
  );
}
