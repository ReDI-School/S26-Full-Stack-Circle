import type { PublicLayoutProps } from './PublicLayout.types';
import { publicLayoutStyles } from './PublicLayout.styles';
<<<<<<< HEAD
import SidebarImage from './SidebarImage';
import { Logo } from '../Logo/Logo';
=======
import { Sidebar } from '../Sidebar';

const SIDEBAR_TAGLINE = 'Bringing people together';
>>>>>>> 081187194a5eb622fb55a7eb4e0fd660d1e6e259

export default function PublicLayout({ children }: PublicLayoutProps) {
  const styles = publicLayoutStyles();
  return (
    <main className={styles.main()}>
<<<<<<< HEAD
      <aside className={styles.sidebar()}>
        <SidebarImage />
      </aside>

      <section className={styles.content()}>
        <div className={styles.mobileLogo()}>
          <Logo />
        </div>

        {children}
      </section>
=======
      <div className={styles.sidebar()}>
        <Sidebar tagline={SIDEBAR_TAGLINE} />
      </div>
      <section className={styles.content()}>{children}</section>
>>>>>>> 081187194a5eb622fb55a7eb4e0fd660d1e6e259
    </main>
  );
}
