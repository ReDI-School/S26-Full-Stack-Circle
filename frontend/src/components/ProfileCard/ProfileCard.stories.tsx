import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProfileCard from './ProfileCard';

const meta: Meta<typeof ProfileCard> = {
  component: ProfileCard,
  title: 'Components/ProfileCard',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 *
 * Default story — example user with realistic numbers
 */
export const Default: Story = {
  args: {
    name: 'Fábio Rodrigues',
    authoredEvents: 6,
    goingToEvents: 3,
    participatedEvents: 10,
  },
  render: (args) => <ProfileCard {...args} />,
};
