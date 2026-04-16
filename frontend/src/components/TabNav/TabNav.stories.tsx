import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import TabNav from './TabNav';

const TABS = ['All Events', 'Future Events', 'Archived'];

const meta: Meta<typeof TabNav> = {
  title: 'Components/TabNav',
  component: TabNav,
  tags: ['autodocs'],
  render: (args) => {
    const [activeTab, setActiveTab] = useState(args.activeTab);
    return <TabNav {...args} activeTab={activeTab} onTabChange={setActiveTab} />;
  },
};

export default meta;
type Story = StoryObj<typeof TabNav>;

/** Default state with the first tab active */
export const Default: Story = {
  args: {
    tabs: TABS,
    activeTab: 'All Events',
  },
};

/** Future Events tab is active */
export const FutureEventsActive: Story = {
  args: {
    tabs: TABS,
    activeTab: 'Future Events',
  },
};

/** Archived tab is active */
export const ArchivedActive: Story = {
  args: {
    tabs: TABS,
    activeTab: 'Archived',
  },
};
