import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const Idle: Story = {
  args: {
    children: 'Idle Button',
    variant: 'idle',
  },
};

export const Negative: Story = {
  args: {
    children: 'Delete',
    variant: 'negative',
  },
};

export const Positive: Story = {
  args: {
    children: 'Confirm',
    variant: 'positive',
  },
};

export const PrimarySmall: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
    size: 'small',
  },
};

export const SecondarySmall: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
    size: 'small',
  },
};

export const IdleSmall: Story = {
  args: {
    children: 'Idle',
    variant: 'idle',
    size: 'small',
  },
};

export const NegativeSmall: Story = {
  args: {
    children: 'Delete',
    variant: 'negative',
    size: 'small',
  },
};

export const PositiveSmall: Story = {
  args: {
    children: 'Confirm',
    variant: 'positive',
    size: 'small',
  },
};

export const PrimaryDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'primary',
    state: 'disabled',
  },
};

export const SecondaryDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'secondary',
    state: 'disabled',
  },
};

export const IdleDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'idle',
    state: 'disabled',
  },
};

export const NegativeDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'negative',
    state: 'disabled',
  },
};

export const PositiveDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'positive',
    state: 'disabled',
  },
};

export const PrimarySmallDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'primary',
    size: 'small',
    state: 'disabled',
  },
};

export const SecondarySmallDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'secondary',
    size: 'small',
    state: 'disabled',
  },
};

export const IdleSmallDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'idle',
    size: 'small',
    state: 'disabled',
  },
};

export const NegativeSmallDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'negative',
    size: 'small',
    state: 'disabled',
  },
};

export const PositiveSmallDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'positive',
    size: 'small',
    state: 'disabled',
  },
};

export const PrimaryLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'primary',
    state: 'loading',
  },
};

export const SecondaryLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'secondary',
    state: 'loading',
  },
};

export const IdleLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'idle',
    state: 'loading',
  },
};

export const NegativeLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'negative',
    state: 'loading',
  },
};

export const PositiveLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'positive',
    state: 'loading',
  },
};

export const PrimarySmallLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'primary',
    size: 'small',
    state: 'loading',
  },
};

export const SecondarySmallLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'secondary',
    size: 'small',
    state: 'loading',
  },
};

export const IdleSmallLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'idle',
    size: 'small',
    state: 'loading',
  },
};

export const NegativeSmallLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'negative',
    size: 'small',
    state: 'loading',
  },
};

export const PositiveSmallLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'positive',
    size: 'small',
    state: 'loading',
  },
};
