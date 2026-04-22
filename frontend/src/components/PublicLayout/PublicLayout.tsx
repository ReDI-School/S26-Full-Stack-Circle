import type { PublicLayoutProps } from './PublicLayout.types';
import { publicLayoutStyles } from './PublicLayout.styles';
import { Sidebar } from '../Sidebar';
import { Logo } from '../Logo';

const SIDEBAR_TAGLINE = 'Bringing people together';

export default function PublicLayout({ children }: PublicLayoutProps) {
  const { main, sidebar, logoMobile, content } = publicLayoutStyles();

  return (
    <main className={main()}>
      <div className={logoMobile()}>
        <Logo />
      </div>

      <div className={sidebar()}>
        <Sidebar tagline={SIDEBAR_TAGLINE} />
      </div>
      <section className={content()}>{children}</section>
    </main>
  );
}
