export type ActiveColor = 'orange' | 'teal' | 'red';

export interface TabNavProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
  activeColor?: ActiveColor;
}
