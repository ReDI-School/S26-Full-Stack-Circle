import type { Meta, StoryObj } from '@storybook/react-vite';

import StickyButton from './StickyButton';
import { CalendarPlusIcon } from '@phosphor-icons/react/ssr';

const meta: Meta<typeof StickyButton> = {
  title: 'Components/StickyButton',
  component: StickyButton,
  tags: ['autodocs'],
  globals: {
    viewport: { value: 'mobile1' },
  },
  parameters: {
    docs: {
      description: {
        component: 'Note: This component is only visible on mobile screens (viewport < 640px).',
      },
    },
  },
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
