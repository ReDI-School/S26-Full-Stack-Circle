import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { SignInForm } from './SignInForm';

const meta: Meta<typeof SignInForm> = {
  title: 'Components/SignInForm',
  component: SignInForm,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onSubmit: { action: 'submitted' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SignInForm>;

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
    serverError: 'Please fix the errors in the form.',
  },
};

export const WithFieldValidationErrors: Story = {
  render: (args) => (
    <div className="w-[400px]">
      <SignInForm {...args} />
      <div className="mt-8 p-4 bg-blue-50 text-blue-800 text-sm rounded-md">
        <p>
          <strong> How to test this story?</strong>
        </p>
        <ol className="list-decimal ml-4 mt-2">
          <li>
            Leave the fields empty and press <strong>SIGN IN</strong> to see the
            &quot;Required&quot; errors.
          </li>
          <li>
            Write &quot;Hello&quot; in the email field and press <strong>SIGN IN</strong> to see the
            &quot;Invalid format&quot; error.
          </li>
        </ol>
      </div>
    </div>
  ),
};

export const FilledForm: Story = {
  render: (args) => (
    <div className="w-[400px]">
      <SignInForm {...args} />
      <div className="mt-8 p-4 bg-blue-50 text-blue-800 text-sm rounded-md">
        <p>
          <strong>💡 How to test this story?</strong>
        </p>
        <p className="mt-2">
          Fill both fields with valid data (e.g., test@redi.org) and press SIGN IN. Check the{' '}
          <strong>Actions</strong> tab in Storybook to see the submitted data.
        </p>
      </div>
    </div>
  ),
};
