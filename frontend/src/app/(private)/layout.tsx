import { ProtectedLayout } from '@components';

const PrivateLayout = ({ children }: { children: React.ReactNode }) => {
  return <ProtectedLayout>{children}</ProtectedLayout>;
};

export default PrivateLayout;
