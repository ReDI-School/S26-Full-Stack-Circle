import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, userEvent } from 'storybook/test';
import SignUpForm from './SignUpForm';

const meta: Meta<typeof SignUpForm> = {
  title: 'Components/SignUpForm',
  component: SignUpForm,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {
  args: {
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Filled: Story = {
  args: {
    fieldValues: {
      firstName: 'Oways',
      lastName: 'Othman',
      email: 'abc@gmail.com',
      password: '12#$k62xz',
      repeatPassword: '12#$k62z',
    },
  },
};

export const PasswordMismatch: Story = {
  args: {
    isLoading: false,
    onSubmit: async () => {},
    fieldValues: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      repeatPassword: 'password456',
    },
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('submit-button'));
  },
};

export const WithServerError: Story = {
  args: {
    serverError: 'Please fix the errors in the form.',
  },
};
