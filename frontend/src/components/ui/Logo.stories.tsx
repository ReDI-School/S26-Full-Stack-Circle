
import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const meta = {
  title: 'UI/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

// Full version — shows "REDI. EVENTS."
export const Full: Story = {
  args: {
    size: 'full',
  },
};

// Compact version — shows "R.E."
export const Compact: Story = {
  args: {
    size: 'compact',
  },
};
