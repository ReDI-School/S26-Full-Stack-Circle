import { protectedLayoutStyles } from './ProtectedLayout.styles';
import type { ProtectedLayoutProps } from './ProtectedLayout.types';
import { Logo } from '../Logo';
import { UserArea } from '@components';
import useAuth from '@hooks/useAuth';
import { Skeleton } from '@components/Skeleton';

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { user, loading, signOut, goToProfile } = useAuth();
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
        {loading ? (
          <div className="flex items-center gap-3">
            <Skeleton width={40} height={40} radius="full" />
            <div className="hidden md:block">
              <Skeleton width={100} height={16} radius="base" />
            </div>
          </div>
        ) : user ? (
          <UserArea
            userName={user.name}
            avatarInitials={user.initials}
            onProfile={goToProfile}
            onSignOut={signOut}
          />
        ) : null}
      </header>
      <section className={content()} aria-label="Main content">
        {children}
      </section>
    </main>
  );
}
