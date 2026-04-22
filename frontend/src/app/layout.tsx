import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

import '../assets/css/reset.css';
import '../assets/css/global.css';

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
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
