import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Tag from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    label: 'John Doe',
  },
};

export const WithLongLabel: Story = {
  args: {
    label: 'This is a long label that should be truncated',
  },
};
