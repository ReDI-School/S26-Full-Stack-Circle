import { PublicLayout } from '@components';

interface NetworkErrorLayoutProps {
  children: React.ReactNode;
}

const NetworkErrorLayout = ({ children }: NetworkErrorLayoutProps) => (
  <PublicLayout>{children}</PublicLayout>
);

export default NetworkErrorLayout;
