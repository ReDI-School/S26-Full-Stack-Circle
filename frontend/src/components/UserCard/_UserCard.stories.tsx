import type { Meta, StoryObj } from '@storybook/react-vite';

import { UserCard } from './UserCard';

const meta: Meta<typeof UserCard> = {
  title: 'Components/UserCard',
  component: UserCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof UserCard>;

export const Default: Story = {
  args: {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    avatarUrl: 'https://i.pravatar.cc',
  },
};

export const WithoutAvatar: Story = {
  args: {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
  },
};

export const Loading: Story = {
  args: {
    name: 'Downloading...',
    email: '...',
  },
};
