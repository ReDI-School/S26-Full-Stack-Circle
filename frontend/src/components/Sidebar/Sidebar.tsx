import type { SidebarProps } from './Sidebar.types';
import { sidebarStyles } from './Sidebar.styles';
import sidebarImage from '../../assets/images/Sidebar.png';

const Sidebar = ({ tagline }: SidebarProps) => {
  const styles = sidebarStyles();

  return (
    <aside 
      className={styles.container()}
      style={{ backgroundImage: `url(${sidebarImage})` }}
    >
      <div className={styles.logo()}>
        Logo here
      </div>

      <h1 className={styles.tagline()}>
        {tagline}
      </h1>     
    </aside>
  );
};

export default Sidebar;
