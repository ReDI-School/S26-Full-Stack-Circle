import type { PublicLayoutProps } from './PublicLayout.types';
import { publicLayoutStyles } from './PublicLayout.styles';
import SidebarImage from './SidebarImage';
import { Logo } from '../Logo/Logo';

export default function PublicLayout({ children }: PublicLayoutProps) {
  const styles = publicLayoutStyles();
  return (
    <main className={styles.main()}>
      <aside className={styles.sidebar()}>
        <SidebarImage />
      </aside>

      <section className={styles.content()}>
        <div className={styles.mobileLogo()}>
          <Logo />
        </div>

        {children}
      </section>
    </main>
  );
}
