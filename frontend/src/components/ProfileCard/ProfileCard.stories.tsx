import type { Meta, StoryObj } from '@storybook/react-vite';
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

/**
 *
 * Loading story — empty profile card  or loading state
 */
export const Loading: Story = {
  args: {
    name: ' ',
    authoredEvents: 0,
    goingToEvents: 0,
    participatedEvents: 0,
  },
};

/**
 *
 * Mobile layout story — example of a mobile profile card
 */
export const MobileLayout: Story = {
  args: {
    name: 'Fábio Rodrigues',
    authoredEvents: 6,
    goingToEvents: 3,
    participatedEvents: 10,
    layout: 'mobile',
  },
  render: (args) => <ProfileCard {...args} />,
};
