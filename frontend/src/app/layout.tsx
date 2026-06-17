import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { IntlProvider } from '../components/IntlProvider';

import '../assets/css/reset.css';
import '../assets/css/global.css';

import AuthProviderWrapper from './AuthProvider';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ReDi Events - Bringing People Together',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <AuthProviderWrapper>
          <IntlProvider>{children}</IntlProvider>
        </AuthProviderWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
