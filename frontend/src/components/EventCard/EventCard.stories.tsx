import type { Meta, StoryObj } from '@storybook/react-vite';

import EventCard from './EventCard';

const meta: Meta<typeof EventCard> = {
  title: 'Components/EventCard',
  component: EventCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EventCard>;

export const EventCardExample: Story = {
  args: {
    isLoading: false,
    elevated: false,
    action: 'join',
    date: 'April 4, 2017 – 2:17 PM',
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
    elevated: false,
    action: 'join',
    date: 'April 4, 2017 – 2:17 PM',
    title: 'How to Network',
    author: 'Owner',
    description:
      'Let’s get together and share techniques on how to network and communicate well our interests.',
    attendeeCount: 10,
    maxAttendees: 40,
  },
};

export const Leave: Story = {
  args: {
    isLoading: false,
    elevated: false,
    action: 'leave',
    date: 'April 4, 2017 – 2:17 PM',
    title: 'How to Network',
    author: 'Owner',
    description:
      'Let’s get together and share techniques on how to network and communicate well our interests.',
    attendeeCount: 10,
    maxAttendees: 40,
  },
};

export const Edit: Story = {
  args: {
    isLoading: false,
    elevated: false,
    action: 'edit',
    date: 'April 4, 2017 – 2:17 PM',
    title: 'How to Network',
    author: 'Owner',
    description:
      'Let’s get together and share techniques on how to network and communicate well our interests.',
    attendeeCount: 10,
    maxAttendees: 40,
  },
};
