import { PublicLayout } from '@components';

interface SignUpLayoutProps {
  children: React.ReactNode;
}

const SignUpLayout = ({ children }: SignUpLayoutProps) => (
  <PublicLayout navText="Already have an account?" navLinkLabel="SIGN IN" navLinkHref="/sign-in">
    <div className="flex flex-col gap-8 max-w-md w-full">
      <hgroup className="flex flex-col gap-1 text-center lg:text-left">
        <h2 className="text-3xl leading-12 text-text-primary font-normal">Get started for free</h2>
        <p className="text-lg leading-6 text-text-tertiary">Enter your details below.</p>
      </hgroup>
      {children}
    </div>
  </PublicLayout>
);

export default SignUpLayout;
