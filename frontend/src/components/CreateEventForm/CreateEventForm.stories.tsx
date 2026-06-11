import type { Meta, StoryObj } from '@storybook/react-vite';
import CreateEventForm from './CreateEventForm';

const meta: Meta<typeof CreateEventForm> = {
  title: 'Components/CreateEventForm',
  component: CreateEventForm,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onSubmit: { action: 'submitted' },
    onCancel: { action: 'cancelled' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CreateEventForm>;

export const Default: Story = {
  args: {
    isLoading: false,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const WithServerError: Story = {
  args: {
    serverError: 'Something went wrong on our side. Please try again later.',
  },
};
