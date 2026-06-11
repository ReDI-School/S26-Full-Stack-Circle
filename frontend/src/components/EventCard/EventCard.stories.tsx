import type { Meta, StoryObj } from '@storybook/react-vite';

import EventCard from './EventCard';

const eventDetailsPlaceholder = {
  id: '1',
  date: new Date('2024-06-15T18:00:00Z'),
  title: 'How to Network',
  author: 'Jane Doe',
  description:
    'Let’s get together and share techniques on how to network and communicate well our interests. We’ll cover practical tips on introducing yourself, following up after meetings, using LinkedIn effectively, and building genuine long-term professional relationships in the tech industry.\n\nLight refreshments provided. All levels welcome.',
  attendeeCount: 15,
  maxAttendees: 30,
};

const meta: Meta<typeof EventCard> = {
  title: 'Components/EventCard',
  component: EventCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['preview', 'fullview'],
      control: { type: 'radio' },
    },
    action: {
      options: ['join', 'leave', 'edit', 'archived'],
      control: { type: 'radio' },
    },
    isActionPending: {
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof EventCard>;

export const EventCardExample: Story = {
  args: {
    isLoading: false,
    variant: 'preview',
    action: 'join',
    isActionPending: false,
    ...eventDetailsPlaceholder,
  },
};

export const Fullview: Story = {
  args: {
    isLoading: false,
    variant: 'fullview',
    action: 'join',
    isActionPending: false,
    ...eventDetailsPlaceholder,
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
    isActionPending: false,
    ...eventDetailsPlaceholder,
  },
};

export const Leave: Story = {
  args: {
    isLoading: false,
    action: 'leave',
    isActionPending: false,
    ...eventDetailsPlaceholder,
  },
};

export const Edit: Story = {
  args: {
    isLoading: false,
    action: 'edit',
    isActionPending: false,
    ...eventDetailsPlaceholder,
  },
};

export const Archived: Story = {
  args: {
    isLoading: false,
    action: 'archived',
    isActionPending: false,
    ...eventDetailsPlaceholder,
  },
};

export const ActionLoading: Story = {
  args: {
    isLoading: false,
    action: 'join',
    isActionPending: true,
    ...eventDetailsPlaceholder,
  },
};
