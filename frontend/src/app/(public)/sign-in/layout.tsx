import { PublicLayout } from '@components';

interface SignInLayoutProps {
  children: React.ReactNode;
}

const SignInLayout = ({ children }: SignInLayoutProps) => (
  <PublicLayout navText="Don't have account?" navLinkLabel="SIGN UP" navLinkHref="/sign-up">
    {children}
  </PublicLayout>
);

export default SignInLayout;
