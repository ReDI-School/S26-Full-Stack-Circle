import type { Meta, StoryObj } from '@storybook/nextjs';
import NameTag from './NameTag';

const meta: Meta<typeof NameTag> = {
  title: 'Components/NameTag',
  component: NameTag,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NameTag>;

export const Default: Story = {
  args: {
    Name: 'John Doe',
  },
};
