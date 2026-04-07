import type { KeyboardEvent } from 'react';
import type { TabNavProps } from './TabNav.types';
import { tabStyles } from './TabNav.styles';

const TabNav = ({ tabs, activeTab, onTabChange, className, activeColor = 'orange' }: TabNavProps) => (
  <div role="tablist" className={`flex ${className ?? ''}`}>
    {tabs.map((tab, index) => (
      <button
        key={tab}
        role="tab"
        aria-selected={tab === activeTab}
        tabIndex={tab === activeTab ? 0 : -1}
        onClick={() => onTabChange(tab)}
        onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
          if (e.key === 'ArrowRight') onTabChange(tabs[Math.min(index + 1, tabs.length - 1)]);
          if (e.key === 'ArrowLeft') onTabChange(tabs[Math.max(index - 1, 0)]);
        }}
        className={tabStyles({ active: tab === activeTab, activeColor })}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default TabNav;
