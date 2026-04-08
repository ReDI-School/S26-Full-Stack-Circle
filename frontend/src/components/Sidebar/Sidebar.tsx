import type { SidebarProps } from './Sidebar.types';
import { sidebarStyles } from './Sidebar.styles';

const Sidebar = ({ imageSrc, alt }: SidebarProps) => {
  const styles = sidebarStyles();
  const imageUrl =
    typeof imageSrc === 'string' ? imageSrc : imageSrc.src;
  return (
    <aside className={styles.container()}>
      <img 
        src={imageUrl} 
        alt={alt} 
        className={styles.image()} 
      />
    </aside>
  );
};

export default Sidebar;
