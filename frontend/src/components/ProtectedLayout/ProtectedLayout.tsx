import { protectedLayoutStyles } from './ProtectedLayout.styles';
import type { ProtectedLayoutProps } from './ProtectedLayout.types';
import { Logo } from '../Logo';
import { UserArea } from '../UserArea';
import useAuth from '../../hooks/useAuth';

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { user, signOut, goToProfile } = useAuth();
  const { main, headerBar, content } = protectedLayoutStyles();

  return (
    <main className={main()}>
      <header className={headerBar()}>
        <div className="hidden md:block">
          <Logo size="full" />
        </div>
        <div className="md:hidden">
          <Logo size="compact" />
        </div>
        <UserArea
          userName={user?.name ?? ''}
          avatarInitials={user?.initials ?? ''}
          onProfile={goToProfile}
          onSignOut={signOut}
        />
      </header>
      <section className={content()} aria-label="Main content">
        {children}
      </section>
    </main>
  );
}
