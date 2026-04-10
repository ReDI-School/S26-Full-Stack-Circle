import type { Meta, StoryObj } from '@storybook/react-vite';

import Skeleton from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  argTypes: {
    animation: {
      options: ['wave', 'pulse', false],
      control: {
        type: 'radio',
      },
    },
    radius: {
      options: ['none', 'xs', 'sm', 'md', 'lg', 'full'],
      control: {
        type: 'radio',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    animation: 'wave',
    width: '100%',
    height: 16,
    radius: 'md',
  },
};
