import { PublicLayout } from '../../components';

interface PublicLayoutPageProps {
  children: React.ReactNode;
}

const PublicLayoutPage = ({ children }: PublicLayoutPageProps) => (
  <PublicLayout>{children}</PublicLayout>
);

export default PublicLayoutPage;
