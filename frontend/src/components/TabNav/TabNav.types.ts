export interface TabNavProps {
  /**
   * List of tab labels to display
   */
  tabs: string[];

  /**
   * The currently active tab label
   */
  activeTab: string;

  /**
   * Callback fired when a tab is selected
   */
  onTabChange?: (tab: string) => void;
}
