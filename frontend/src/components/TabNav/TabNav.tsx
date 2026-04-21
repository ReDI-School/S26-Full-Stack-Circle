import type { TabNavProps } from './TabNav.types';
import { tabStyles } from './TabNav.styles';

const TabNav = ({ tabs, activeTab, onTabChange }: TabNavProps) => (
  <div role="tablist" className="flex">
    {tabs.map((tab) => (
      <button
        key={tab}
        role="tab"
        aria-selected={tab === activeTab}
        onClick={() => onTabChange?.(tab)}
        className={tabStyles({ active: tab === activeTab })}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default TabNav;
