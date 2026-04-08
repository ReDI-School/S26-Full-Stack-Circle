import type { SidebarProps } from './Sidebar.types';
import { sidebarStyles } from './Sidebar.styles';

const Sidebar = ({ imageSrc, alt }: SidebarProps) => {
  const styles = sidebarStyles();
  return (
    <aside className={styles.container()}>
      <img 
        src={imageSrc} 
        alt={alt} 
        className={styles.image()} 
      />
    </aside>
  );
};

export default Sidebar;
