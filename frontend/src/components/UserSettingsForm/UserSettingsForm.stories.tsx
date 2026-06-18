import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import UserSettingsForm from './UserSettingsForm';

const meta: Meta<typeof UserSettingsForm> = {
  title: 'Components/UserSettingsForm',
  component: UserSettingsForm,
  tags: ['autodocs'],
  args: {
    onSubmit: async () => {},
  },
};

export default meta;
type Story = StoryObj<typeof UserSettingsForm>;

export const Default: Story = {};

export const Loading: Story = {
  args: { isLoading: true },
};

export const WithError: Story = {
  args: { serverError: 'Something went wrong. Please try again.' },
};

export const WithSuccess: Story = {
  args: { successMessage: 'Your settings have been saved.' },
};
