import type { Meta, StoryObj } from '@storybook/react-vite';

import UserArea from './UserArea';

const meta: Meta<typeof UserArea> = {
  title: 'Components/UserArea',
  component: UserArea,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserArea>;

export const Default: Story = {
  args: {
    userName: 'Lucy Lu',
    avatarInitials: 'LL',
  },
};
