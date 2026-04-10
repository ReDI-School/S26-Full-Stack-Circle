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

export const Default: Story = {};

export const Card: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Skeleton height="70px" width="70px" radius="full" />
      <Skeleton />
      <Skeleton width="75%" />
      <Skeleton width="50%" />
      <Skeleton width="60%" />
      <div className="flex gap-2">
        <Skeleton height="25px" width="25px" />
        <Skeleton height="25px" width="100px" />
      </div>
    </div>
  ),
};
