<<<<<<< HEAD
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
=======
import type { Meta, StoryObj } from '@storybook/nextjs-vite';

>>>>>>> 081187194a5eb622fb55a7eb4e0fd660d1e6e259
import PublicLayout from './PublicLayout';

const meta: Meta<typeof PublicLayout> = {
  title: 'Components/PublicLayout',
  component: PublicLayout,
  parameters: {
    layout: 'fullscreen',
  },
<<<<<<< HEAD
=======
  tags: ['autodocs'],
>>>>>>> 081187194a5eb622fb55a7eb4e0fd660d1e6e259
};

export default meta;
type Story = StoryObj<typeof PublicLayout>;

<<<<<<< HEAD
export const Default: Story = {
  args: {
    children: <div className="p-8 border-2 border-dashed border-gray-300">(Login/SignUp)</div>,
  },
};

export const Mobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};

export const WithScrollCheck: Story = {
  args: {
    children: <div className="p-8 border-2 border-dashed border-gray-300 h-[200vh]">......</div>,
=======
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
        <div>LOGIN FORM MOCK</div>
    ),
  },
  globals: {
    viewport: { value: 'mobile1' },
>>>>>>> 081187194a5eb622fb55a7eb4e0fd660d1e6e259
  },
};
