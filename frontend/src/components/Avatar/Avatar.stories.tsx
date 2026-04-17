import type { Meta, StoryObj } from '@storybook/react-vite';

import Avatar from './Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {
  args: {
    initials: 'MW',
  },
};

export const Large: Story = {
  name: 'Large with custom css variable value',
  args: {
    initials: 'LL',
    size: 'lg',
  },
  render: (args) => (
    <div style={{ '--color-info': '#D65DB1' } as React.CSSProperties}>
      <Avatar {...args} />
    </div>
  ),
};
