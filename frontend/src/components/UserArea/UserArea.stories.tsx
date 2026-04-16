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
  args: {
    userName: 'George Michel',
    avatarInitials: 'GM',
  },

  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector('[aria-haspopup="menu"]') as HTMLElement;

    trigger?.click();
  },
};

export const Collapsed: Story = {
  args: {
    userName: 'Lucy Lu',
    avatarInitials: 'LL',
  },
};
