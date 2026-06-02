import { PublicLayout } from '@components';

interface SignUpLayoutProps {
  children: React.ReactNode;
}

const SignUpLayout = ({ children }: SignUpLayoutProps) => (
  <PublicLayout navText="Already have an account?" navLinkLabel="SIGN IN" navLinkHref="/sign-in">
    {children}
  </PublicLayout>
);

export default SignUpLayout;
