import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { InfoBox } from './InfoBox';

const meta: Meta<typeof InfoBox> = {
  title: 'Components/InfoBox',
  component: InfoBox,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof InfoBox>;

export const Info: Story = {
  args: {
    variant: 'info',
    message: 'This is an info message',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    message: 'Something went wrong',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    message: 'Be careful with this action',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    message: 'Operation completed successfully',
  },
};
