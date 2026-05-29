import type { Meta, StoryObj } from '@storybook/react-vite';
import FormCard from './FormCard';

const meta: Meta<typeof FormCard> = {
  title: 'Components/FormCard',
  component: FormCard,
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
type Story = StoryObj<typeof FormCard>;

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
