import type { Meta, StoryObj } from '@storybook/react-vite';

import EventCard from './EventCard';

const meta: Meta<typeof EventCard> = {
  title: 'Components/EventCard',
  component: EventCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EventCard>;

export const NegativeSmall: Story = {
  args: {
    elevated: true,
    action: 'join',
  },
};
