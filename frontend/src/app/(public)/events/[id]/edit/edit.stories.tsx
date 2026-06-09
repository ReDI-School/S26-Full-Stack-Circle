import type { Meta, StoryObj } from '@storybook/react';
import EditEventPage from './page';

const meta = {
  title: 'Pages/Event Edit',
  component: EditEventPage,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof EditEventPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <EditEventPage />,
};
