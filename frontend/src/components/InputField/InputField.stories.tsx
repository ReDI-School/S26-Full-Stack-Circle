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
    error: 'This field is mandatory.',
    required: true,
  },
};
export const PasswordDefault: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    required: true,
  },
};

export const PasswordError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    type: 'password',
    error: 'This field is mandatory.',
    required: true,
  },
};

export const TextareaDefault: Story = {
  args: {
    label: 'Descriptipon',
    placeholder: 'Enter event description here...',
    type: 'textarea',
    required: true,
  },
};

export const TextareaError: Story = {
  args: {
    label: 'Descriptipon',
    placeholder: 'Enter event description here...',
    type: 'textarea',
    error: 'This field is mandatory.',
    required: true,
  },
};

export const TextDefault: Story = {
  args: {
    label: 'Name',
    placeholder: 'Enter your name',
    type: 'text',
  },
};
