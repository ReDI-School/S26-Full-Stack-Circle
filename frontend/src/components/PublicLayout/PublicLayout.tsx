import type { PublicLayoutProps } from './PublicLayout.types';
import { publicLayoutStyles } from './PublicLayout.styles';
import { Sidebar } from '../Sidebar';

const SIDEBAR_TAGLINE = 'Bringing people together';

export default function PublicLayout({ children }: PublicLayoutProps) {
  const styles = publicLayoutStyles();
  return (
    <main className={styles.main()}>
      <div className={styles.sidebar()}>
        <Sidebar tagline={SIDEBAR_TAGLINE} />
      </div>
      <section className={styles.content()}>{children}</section>
    </main>
  );
}
