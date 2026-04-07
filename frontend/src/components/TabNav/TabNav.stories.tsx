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

export const Default: Story = { args: { tabs: TABS, activeTab: 'All Events' } };
export const FutureEventsActive: Story = { args: { tabs: TABS, activeTab: 'Future Events' } };
export const ArchivedActive: Story = { args: { tabs: TABS, activeTab: 'Archived' } };
export const TealVariant: Story = { args: { tabs: TABS, activeTab: 'All Events', activeColor: 'teal' } };
export const RedVariant: Story = { args: { tabs: TABS, activeTab: 'All Events', activeColor: 'red' } };
