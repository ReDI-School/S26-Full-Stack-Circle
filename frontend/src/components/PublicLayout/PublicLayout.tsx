import type { PublicLayoutProps } from './PublicLayout.types';
import { publicLayoutStyles } from './PublicLayout.styles';
import { Sidebar } from '../Sidebar';
import { Logo } from '../Logo';
import { LinkButton } from '../LinkButton';

const SIDEBAR_TAGLINE = 'Bringing people together';

export default function PublicLayout({
  children,
  navText,
  navLinkLabel,
  navLinkHref,
}: Readonly<PublicLayoutProps>) {
  const { main, sidebar, logoMobile, content, navigBlock } = publicLayoutStyles();

  return (
    <main className={main()}>
      <div className={logoMobile()}>
        <Logo />
      </div>

      <div className={sidebar()}>
        <Sidebar tagline={SIDEBAR_TAGLINE} />
      </div>

      <section className={content()}>
        {navText && navLinkLabel && navLinkHref && (
          <nav className={navigBlock()}>
            <span>{navText}</span>
            <LinkButton href={navLinkHref} underlined>{navLinkLabel}</LinkButton>
          </nav>
        )}
        {children}
      </section>
    </main>
  );
}
