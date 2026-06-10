import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { protectedLayoutStyles } from './ProtectedLayout.styles';
import type { ProtectedLayoutProps } from './ProtectedLayout.types';
import { Logo } from '../Logo';
import { UserArea } from '@components';
import useAuth from '@hooks/useAuth';
import { Skeleton } from '@components/Skeleton';
import { getInitials } from '@/utils/utils';

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { user, loading, signOut, goToProfile } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace('/sign-in');
  }, [loading, user, router]);
  const { main, headerBar, content } = protectedLayoutStyles();

  const userFullName = user ? `${user.firstName} ${user.lastName}` : '';
  const initials = userFullName ? getInitials(userFullName) : '';

  return (
    <main className={main()}>
      <header className={headerBar()}>
        <div className="hidden md:block">
          <Logo size="full" />
        </div>

        <div className="md:hidden">
          <Logo size="compact" />
        </div>
        {loading || !user ? (
          <div className="flex items-center gap-3">
            <Skeleton width={40} height={40} radius="full" />
            <div className="hidden md:block">
              <Skeleton width={100} height={16} radius="base" />
            </div>
          </div>
        ) : (
          <UserArea
            userName={userFullName}
            avatarInitials={initials}
            onProfile={goToProfile}
            onSignOut={signOut}
          />
        )}
      </header>
      <section className={content()} aria-label="Main content">
        {children}
      </section>
    </main>
  );
}
