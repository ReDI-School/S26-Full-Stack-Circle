import { PublicLayout } from '@components';

interface SignInLayoutProps {
  children: React.ReactNode;
}

const SignInLayout = ({ children }: SignInLayoutProps) => (
  <PublicLayout navText="Don't have account?" navLinkLabel="SIGN UP" navLinkHref="/sign-up">
    <div className="flex-1 flex flex-col items-center justify-center gap-8 w-full">
      <header className="flex flex-col gap-2 max-w-100 w-full">
        <h2 className="text-center lg:text-left text-[28px] font-normal leading-12 text-text-primary">
          Sign in to ReDi Events
        </h2>
        <p className="text-center lg:text-left text-[18px] font-normal leading-6 text-text-secondary">
          Enter your details below.
        </p>
      </header>
      {children}
    </div>
  </PublicLayout>
);

export default SignInLayout;
