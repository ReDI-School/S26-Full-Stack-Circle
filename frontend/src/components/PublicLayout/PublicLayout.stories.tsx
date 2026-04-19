import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PublicLayout from './PublicLayout';

const meta: Meta<typeof PublicLayout> = {
  title: 'Components/PublicLayout',
  component: PublicLayout,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PublicLayout>;

export const WithLoginForm: Story = {
  args: {
    navText: "Don't have account?",
    navLinkLabel: 'SIGN IN',
    navLinkHref: '/signin',
    children: <div>Login Form Content</div>,
  },
};

export const WithSignUpForm: Story = {
  args: {
    navText: 'Already have an account?',
    navLinkLabel: 'SIGN UP',
    navLinkHref: '/signup',
    children: <div>Sign UP Form Content</div>,
  },
};

export const WithoutData: Story = {
  args: {
    navText: '',
    navLinkLabel: '',
    navLinkHref: '',
    children: <div>No content</div>,
  },
};

export const MobileViewport: Story = {
  args: {
    navText: "Don't have account?",
    navLinkLabel: 'SIGN UP',
    navLinkHref: '/signup',
    children: <div>Login Form Content</div>,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
