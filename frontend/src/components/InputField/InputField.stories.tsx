import type { Meta, StoryObj } from '@storybook/react-vite';

import InputField from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    type: {
      options: ['email', 'password', 'text', 'textarea'],
      control: {
        type: 'select',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const EmailDefault: Story = {
  args: {
    label: 'E-mail',
    placeholder: 'Enter your email',
    type: 'email',
    required: true,
  },
};

export const EmailError: Story = {
  args: {
    label: 'E-mail',
    placeholder: 'Enter your email',
    type: 'email',
    error: "error message",
    required: true,
  },
};
export const PasswordDefault: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your Password',
    type: 'password',
    required: true,
  },
};

export const PasswordError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your Password',
    type: 'password',
    error: "error message",
    required: true,
  },
};

export const TextDefault: Story = {
  args: {
    label : "name",
    placeholder: 'Enter your Name',
    type: 'text',
    required: true,
  },
};

export const TextError: Story = {
  args: {
    label : "name",
    placeholder: 'Enter your Name',
    type: 'text',
    error: "error message",
    required: true,
  },
};
export const TextareaDefault: Story = {
  args: {
    label: 'Descriptipon',
    placeholder: 'Enter your Textarea',
    type: 'textarea',
    required: true,
  },
};

export const TextareaError: Story = {
  args: {
    label: 'Descriptipon',
    placeholder: 'Enter your Textarea',
    type: 'textarea',
    error: "error message",
    required: true,
  },
};
