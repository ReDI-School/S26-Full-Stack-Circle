import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import type { TabNavProps } from './TabNav.types';
import { tabStyles } from './TabNav.styles';

const TabNav = ({
  tabs,
  activeTab,
  onTabChange,
  className,
  activeColor = 'orange',
}: TabNavProps) => {
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <div role="tablist" className={`flex ${className ?? ''}`}>
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
          onKeyDown={(e: KeyboardEvent<HTMLButtonElement>) => {
            let newIndex = index;
            if (e.key === 'ArrowRight') {
              newIndex = Math.min(index + 1, tabs.length - 1);
            }
            if (e.key === 'ArrowLeft') {
              newIndex = Math.max(index - 1, 0);
            }
            if (e.key === 'Home') {
              newIndex = 0;
            }

            if (e.key === 'End') {
              newIndex = tabs.length - 1;
            }

            if (newIndex !== index) {
              e.preventDefault();
              onTabChange(tabs[newIndex]);

              tabsRef.current[newIndex]?.focus();
            }
          }}
          className={tabStyles({ active: tab === activeTab, activeColor })}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
export default TabNav;
