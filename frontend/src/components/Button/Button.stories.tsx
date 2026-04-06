import type { Meta, StoryObj } from '@storybook/react-vite';

import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const primary: Story = {
  args: {
    children: 'TEST',
    variant: 'primary',
  },
};

export const secondary: Story = {
  args: {
    children: 'TEST',
    variant: 'secondary',
  },
};

export const idle: Story = {
  args: {
    children: 'TEST',
    variant: 'idle',
  },
};

export const negative: Story = {
  args: {
    children: 'TEST',
    variant: 'negative',
  },
};

export const positive: Story = {
  args: {
    children: 'TEST',
    variant: 'positive',
  },
};

export const primarySmall: Story = {
  args: {
    children: 'TEST',
    variant: 'primary',
    size: 'small',
  },
};

export const secondarySmall: Story = {
  args: {
    children: 'TEST',
    variant: 'secondary',
    size: 'small',
  },
};

export const idleSmall: Story = {
  args: {
    children: 'TEST',
    variant: 'idle',
    size: 'small',
  },
};

export const negativeSmall: Story = {
  args: {
    children: 'TEST',
    variant: 'negative',
    size: 'small',
  },
};

export const positiveSmall: Story = {
  args: {
    children: 'TEST',
    variant: 'positive',
    size: 'small',
  },
};

export const primaryDisabled: Story = {
  args: {
    children: 'TEST',
    variant: 'primary',
    state: 'disabled',
  },
};

export const secondaryDisabled: Story = {
  args: {
    children: 'TEST',
    variant: 'secondary',
    state: 'disabled',
  },
};

export const idleDisabled: Story = {
  args: {
    children: 'TEST',
    variant: 'idle',
    state: 'disabled',
  },
};

export const negativeDisabled: Story = {
  args: {
    children: 'TEST',
    variant: 'negative',
    state: 'disabled',
  },
};

export const positiveDisabled: Story = {
  args: {
    children: 'TEST',
    variant: 'positive',
    state: 'disabled',
  },
};

export const primarySmallDisabled: Story = {
  args: {
    children: 'TEST',
    variant: 'primary',
    size: 'small',
    state: 'disabled',
  },
};

export const secondarySmallDisabled: Story = {
  args: {
    children: 'TEST',
    variant: 'secondary',
    size: 'small',
    state: 'disabled',
  },
};

export const idleSmallDisabled: Story = {
  args: {
    children: 'TEST',
    variant: 'idle',
    size: 'small',
    state: 'disabled',
  },
};

export const negativeSmallDisabled: Story = {
  args: {
    children: 'TEST',
    variant: 'negative',
    size: 'small',
    state: 'disabled',
  },
};

export const positiveSmallDisabled: Story = {
  args: {
    children: 'TEST',
    variant: 'positive',
    size: 'small',
    state: 'disabled',
  },
};
