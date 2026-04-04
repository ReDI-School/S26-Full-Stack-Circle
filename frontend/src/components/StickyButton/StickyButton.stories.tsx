import type { Meta, StoryObj } from '@storybook/react-vite';

import StickyButton from './StickyButton';
import { CalendarPlusIcon } from '@phosphor-icons/react';

const meta: Meta<typeof StickyButton> = {
  title: 'Components/StickyButton',
  component: StickyButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StickyButton>;

export const Default: Story = {
  args: {
    label: 'Create new event',
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Create new event with icon',
    icon: <CalendarPlusIcon size={20} />,
  },
};
