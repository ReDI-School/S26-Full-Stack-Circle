import type { StaticImageData } from 'next/image';
interface SidebarProps {
  /**
   * Sidebar image source
   */
  imageSrc: StaticImageData | string;
  /**
   * Alt text for the Sidebar image
   */
  alt: string;
}

export type { SidebarProps };
