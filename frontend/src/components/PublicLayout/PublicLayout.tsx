import type { PublicLayoutProps } from './PublicLayout.types';
import { publicLayoutStyles } from './PublicLayout.styles';
import { Sidebar } from '../Sidebar';

const SIDEBAR_TAGLINE = 'Bringing people together';

export default function PublicLayout({
  children,
  navText,
  navLinkLabel,
  navLinkHref,
}: PublicLayoutProps) {
  const styles = publicLayoutStyles();
  return (
    <main className={styles.main()}>
      <aside className={styles.sidebar()}>
        <Sidebar tagline={SIDEBAR_TAGLINE} />
      </aside>
      <section className={styles.content()}>{children}</section>
    </main>
  );
}
