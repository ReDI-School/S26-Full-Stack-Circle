import { SignInForm } from '../../components/SignInForm';

export default function LoginPage() {
  const handleSignIn = (data: any) => {
    console.log('Form Ready for Backend:', data);
  };
  return (
    <main className="w-full max-w-[468px] mx-auto py-12 px-4 flex flex-col justify-center min-h-[calc(100vh-80px)]">
      <SignInForm onSubmit={handleSignIn} />
    </main>
  );
}
