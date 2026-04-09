import type { Meta, StoryObj } from '@storybook/react-vite';

import Sidebar from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  render: (args) => (
    <div className="grid h-dvh w-full overflow-hidden grid-cols-[480px_1fr]">
      <Sidebar {...args} />
      <div className="size-full p-15 flex items-center justify-center">content here</div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    tagline: 'Bringing people together',
  },
};

export const Custom: Story = {
  args: {
    tagline: 'Custom tag here',
  },
};
