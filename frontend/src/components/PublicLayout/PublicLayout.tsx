import type { PublicLayoutProps } from './PublicLayout.types';
import { publicLayoutStyles } from './PublicLayout.styles';

export default function PublicLayout({ children }: PublicLayoutProps) {
  const styles = publicLayoutStyles();
  return <main className={styles.main()}>{children}</main>;
}
