import type { Meta, StoryObj } from '@storybook/react-vite';

import EventCard from './EventCard';

const meta: Meta<typeof EventCard> = {
  title: 'Components/EventCard',
  component: EventCard,
  tags: ['autodocs'],
  argTypes: {
    action: {
      options: ['join', 'leave', 'edit'],
      control: {
        type: 'radio',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EventCard>;

export const EventCardExample: Story = {
  args: {
    isLoading: false,
    action: 'join',
    date: new Date('2017-04-04T14:17:00Z'),
    title: 'How to Network',
    author: 'Owner',
    description:
      'Let’s get together and share techniques on how to network and communicate well our interests.',
    attendeeCount: 10,
    maxAttendees: 40,
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
  },
};

export const Join: Story = {
  args: {
    isLoading: false,
    action: 'join',
  },
};

export const Leave: Story = {
  args: {
    isLoading: false,
    action: 'leave',
  },
};

export const Edit: Story = {
  args: {
    isLoading: false,
    action: 'edit',
  },
};
