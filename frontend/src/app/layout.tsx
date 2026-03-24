import type { Metadata } from 'next';

import '../assets/css/reset.css';
import '../assets/css/global.css';

import { Layout } from '../components';

export const metadata: Metadata = {
  title: 'REDIFLIX - Your Personalized Video Streaming Platform',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
};

export default RootLayout;