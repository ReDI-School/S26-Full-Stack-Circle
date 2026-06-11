import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProtectedLayout } from '@components';
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
  render: () => (
    <ProtectedLayout>
      <EditEventPage />
    </ProtectedLayout>
  ),
};
