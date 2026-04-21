import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PublicLayout from './PublicLayout';

const meta: Meta<typeof PublicLayout> = {
  title: 'Components/PublicLayout',
  component: PublicLayout,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof PublicLayout>;

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
  },
};
