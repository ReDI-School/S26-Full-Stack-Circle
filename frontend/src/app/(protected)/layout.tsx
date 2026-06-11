import { ProtectedLayout } from '@components';

interface ProtectedLayoutPageProps {
  children: React.ReactNode;
}

const ProtectedLayoutPage = ({ children }: ProtectedLayoutPageProps) => (
  <ProtectedLayout>{children}</ProtectedLayout>
);

export default ProtectedLayoutPage;
