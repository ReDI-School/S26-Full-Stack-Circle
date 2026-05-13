import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, userEvent } from 'storybook/test';
import SignUpForm from './SignUpForm';
// import { SignUpFormProps } from './SignUpForm.types';

const meta: Meta<typeof SignUpForm> = {
  title: 'Components/SignUpForm',
  component: SignUpForm,
  // render: (args) => (
  //   <div className="grid h-dvh w-full overflow-hidden grid-cols-[480px_1fr]">
  //     <SignUpFormProps {...args} />
  //     <div className="size-full p-15 flex items-center justify-center">content here</div>
  //   </div>
  // ),
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {
  args: {
    tagline: 'Bringing people together',
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
      firstname: 'Oways',
      lastname: 'Othman',
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
      firstname: 'John',
      lastname: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      repeatPassword: 'password456',
    },
  },

  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // simulate submit
    await userEvent.click(canvas.getByTestId('submit-button'));
  },
};

export const WithServerError: Story = {
  args: {
    serverError: 'Please fix the errors in the form.',
  },
};
