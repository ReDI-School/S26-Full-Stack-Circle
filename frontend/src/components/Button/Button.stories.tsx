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

export const primaryLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'primary',
    state: 'loading',
  },
};

export const secondaryLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'secondary',
    state: 'loading',
  },
};

export const idleLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'idle',
    state: 'loading',
  },
};

export const negativeLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'negative',
    state: 'loading',
  },
};

export const positiveLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'positive',
    state: 'loading',
  },
};

export const primarySmallLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'primary',
    size: 'small',
    state: 'loading',
  },  
};

export const secondarySmallLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'secondary',
    size: 'small',
    state: 'loading',
  },  
};

export const idleSmallLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'idle',
    size: 'small',
    state: 'loading',
  },  
};

export const negativeSmallLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'negative',
    size: 'small',
    state: 'loading',
  },  
};

export const positiveSmallLoading: Story = {
  args: {
    children: 'TEST',
    variant: 'positive',
    size: 'small',
    state: 'loading',
  },  
};

