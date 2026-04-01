import type { Meta, StoryObj } from '@storybook/react-vite';

import InputField from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof InputField>;

export const EmailDefault: Story = {
  args: {
    label: 'E-mail',
    placeholder: 'Enter your email',
    type: 'email',
    state: 'default',
    required: true,
  },
};

export const EmailError: Story = {
  args: {
    label: 'E-mail',
    placeholder: 'Enter your email',
    type: 'email',
    state: 'error',
    required: true,
  },
};
