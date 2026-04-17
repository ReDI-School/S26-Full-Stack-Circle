import type { Meta, StoryObj } from '@storybook/nextjs-vite';

import Logo from './Logo';

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
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Logo>;

// Full version
export const Full: Story = {
  args: {
    size: 'full',
  },
};

export const FullWhite: Story = {
  render: (args) => (
    <div className="bg-primary flex justify-center items-center p-10">
      <Logo {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    size: 'full',
    textColor: 'white',
  },
};

export const Compact: Story = {
  args: {
    size: 'compact',
  },
};

export const CompactWhite: Story = {
  render: (args) => (
    <div className="bg-primary flex justify-center items-center p-10">
      <Logo {...args} />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    size: 'compact',
    textColor: 'white',
  },
};