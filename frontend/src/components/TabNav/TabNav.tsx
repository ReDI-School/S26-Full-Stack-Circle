'use client';

import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import type { TabNavProps } from './TabNav.types';
import { tabStyles } from './TabNav.styles';

/** Accessible tab navigation component following the WAI-ARIA tabs pattern */
const TabNav = ({ tabs, activeTab, onTabChange }: TabNavProps) => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, currentIndex: number) => {
    const totalTabs = tabs.length;
    let newIndex = currentIndex;

    switch (e.key) {
      case 'ArrowRight':
        newIndex = Math.min(currentIndex + 1, totalTabs - 1);
        break;
      case 'ArrowLeft':
        newIndex = Math.max(currentIndex - 1, 0);
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = totalTabs - 1;
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onTabChange(tabs[currentIndex]);
        return;
      default:
        return;
    }

    if (newIndex !== currentIndex) {
      e.preventDefault();
      onTabChange(tabs[newIndex]);
      tabsRef.current[newIndex]?.focus();
    }
  };

  return (
    <div role="tablist" className="flex">
      {tabs.map((tab, index) => (
        <button
          key={tab}
          ref={(el) => {
            tabsRef.current[index] = el;
          }}
          role="tab"
          aria-selected={tab === activeTab}
          tabIndex={tab === activeTab ? 0 : -1}
          onClick={() => onTabChange(tab)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className={tabStyles({ active: tab === activeTab })}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabNav;
