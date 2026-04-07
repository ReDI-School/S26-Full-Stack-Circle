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
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const idle: Story = {
  args: {
    children: 'Idle Button',
    variant: 'idle',
  },
};

export const negative: Story = {
  args: {
    children: 'Delete',
    variant: 'negative',
  },
};

export const positive: Story = {
  args: {
    children: 'Confirm',
    variant: 'positive',
  },
};

export const primarySmall: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
    size: 'small',
  },
};

export const secondarySmall: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
    size: 'small',
  },
};

export const idleSmall: Story = {
  args: {
    children: 'Idle',
    variant: 'idle',
    size: 'small',
  },
};

export const negativeSmall: Story = {
  args: {
    children: 'Delete',
    variant: 'negative',
    size: 'small',
  },
};

export const positiveSmall: Story = {
  args: {
    children: 'Confirm',
    variant: 'positive',
    size: 'small',
  },
};

export const primaryDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'primary',
    state: 'disabled',
  },
};

export const secondaryDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'secondary',
    state: 'disabled',
  },
};

export const idleDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'idle',
    state: 'disabled',
  },
};

export const negativeDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'negative',
    state: 'disabled',
  },
};

export const positiveDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'positive',
    state: 'disabled',
  },
};

export const primarySmallDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'primary',
    size: 'small',
    state: 'disabled',
  },
};

export const secondarySmallDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'secondary',
    size: 'small',
    state: 'disabled',
  },
};

export const idleSmallDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'idle',
    size: 'small',
    state: 'disabled',
  },
};

export const negativeSmallDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'negative',
    size: 'small',
    state: 'disabled',
  },
};

export const positiveSmallDisabled: Story = {
  args: {
    children: 'Disabled',
    variant: 'positive',
    size: 'small',
    state: 'disabled',
  },
};
