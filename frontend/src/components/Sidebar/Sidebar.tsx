import type { SidebarProps } from './Sidebar.types';
import { sidebarStyles } from './Sidebar.styles';
import sidebarImage from '../../assets/images/sidebar-bg.png';
import { Logo } from '../Logo';

const Sidebar = ({ tagline }: SidebarProps) => {
  const styles = sidebarStyles();

  return (
    <aside
      className={styles.container()}
      style={{ backgroundImage: `url(${sidebarImage.src})` }}
    >
      <div className={styles.logo()}>
        <Logo textColor="white" />
      </div>

      <h1 className={styles.tagline()}>
        {tagline}
      </h1>
    </aside>
  );
};

export default Sidebar;
