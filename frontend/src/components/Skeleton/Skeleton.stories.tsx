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
      options: ['none', 'sm', 'base', 'md', 'lg', 'full'],
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
    radius: 'base',
  },
};

export const Card: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Skeleton height={70} width={70} radius="full" />
      <Skeleton />
      <Skeleton width="75%" />
      <Skeleton width="50%" />
      <Skeleton width="60%" />
      <div className="flex gap-2">
        <Skeleton height={25} width={25} />
        <Skeleton height={25} width={100} />
      </div>
    </div>
  ),
};
