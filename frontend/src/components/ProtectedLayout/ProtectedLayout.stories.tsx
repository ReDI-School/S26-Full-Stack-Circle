import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import ProtectedLayout from './ProtectedLayout';

const meta: Meta<typeof ProtectedLayout> = {
  title: 'Components/ProtectedLayout',
  component: ProtectedLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ProtectedLayout>;

export const Desktop: Story = {
  args: {
    children: <div className="h-[200vh]">Dashboard content</div>,
  },
};

export const MobileViewport: Story = {
  args: {
    children: <div>Dashboard content</div>,
  },
  globals: {
    viewport: { value: 'mobile2' },
  },
};
