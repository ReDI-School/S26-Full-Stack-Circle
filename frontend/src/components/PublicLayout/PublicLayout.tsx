import type { PublicLayoutProps } from './PublicLayout.types';
import { publicLayoutStyles } from './PublicLayout.styles';
import { Sidebar } from '../Sidebar';
import { LinkButton } from '../LinkButton';

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
      <section className={styles.content()}>
        <div className={styles.nav()}>
          <span>{navText}</span>
          <LinkButton href={navLinkHref}>{navLinkLabel}</LinkButton>
        </div>
        <div className={styles.body()}>{children}</div>
      </section>
    </main>
  );
}
