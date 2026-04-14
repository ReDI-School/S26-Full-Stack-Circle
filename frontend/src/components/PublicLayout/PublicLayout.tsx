import type { PublicLayoutProps } from './PublicLayout.types';

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
   <main>
        {children}
    </main>
  );
}
