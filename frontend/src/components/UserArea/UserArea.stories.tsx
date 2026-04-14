import React from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import UserArea from './UserArea';

const meta: Meta<typeof UserArea> = {
  title: 'Components/UserArea',
  component: UserArea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserArea>;

export const Expanded: Story = {
  render: (args) => {
    //XXX: no better way to expand without changeing interface
    React.useEffect(() => {
      const interval = setInterval(() => {
        const trigger = document.querySelector('[aria-haspopup="true"][aria-expanded="false"]');
        if (trigger) {
          trigger.click();
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }, []);

    return <UserArea {...args} />;
  },
  args: {
    userName: 'George Michel',
    avatarInitials: 'GM',
  },
};

export const Collapsed: Story = {
  args: {
    userName: 'Lucy Lu',
    avatarInitials: 'LL',
  },
};
