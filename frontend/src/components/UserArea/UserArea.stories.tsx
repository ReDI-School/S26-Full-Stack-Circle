import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import UserArea from './UserArea';

const meta: Meta<typeof UserArea> = {
  title: 'Components/UserArea',
  component: UserArea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserArea>;

export const Collapsed: Story = {
  args: {
    userName: 'Lucy Lu',
    avatarInitials: 'LL',
    onProfile: () => {},
    onSignOut: () => {},
  },
};

export const Expanded: Story = {
  args: {
    userName: 'George Michel',
    avatarInitials: 'GM',
    onProfile: () => {},
    onSignOut: () => {},
  },
  render: (args) => {
    const ref = React.useRef<HTMLDivElement | null>(null);

    React.useEffect(() => {
      const trigger = ref.current?.querySelector('[aria-haspopup="menu"]') as HTMLElement;

      trigger?.click();
    }, []);

    return (
      <div ref={ref}>
        <UserArea {...args} />
      </div>
    );
  },
};
