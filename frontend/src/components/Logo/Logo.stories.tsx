import React from 'react';
// eslint-disable-next-line storybook/no-renderer-packages
import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Logo component with full and compact variants. Full version shows complete branding with border, compact shows only the compact SVG.',
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['full', 'compact'],
      description: 'Size variant of the logo',
      defaultValue: 'full',
    },
    className: {
      control: 'text',
      description: 'Additional CSS class',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

// Full version
export const Full: Story = {
  args: {
    size: 'full',
  },
  parameters: {
    docs: {
      description: {
        story: 'Full logo variant with dashed border, main text, and two SVG images',
      },
    },
  },
};

// Compact version
export const Compact: Story = {
  args: {
    size: 'compact',
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact logo variant showing only the R.E. SVG for mobile views',
      },
    },
  },
};

// Interactive playground
export const Playground: Story = {
  args: {
    size: 'full',
    className: '',
  },
};
