import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import PublicLayout from './PublicLayout';

const meta: Meta<typeof PublicLayout> = {
  title: 'Components/PublicLayout',
  component: PublicLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PublicLayout>;

export const WithLoginForm: Story = {
  args: {
    children: (
      <>
        <div>LOGIN FORM MOCK</div>
      </>
    ),
  },
};

export const MobileViewport: Story = {
  args: {
    children: (
      <>
        <div>LOGIN FORM MOCK</div>
      </>
    ),
  },
  globals: {
    viewport: { value: 'mobile1' },
  },
};
