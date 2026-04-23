import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import NetworkError from './NetworkError';
import { PublicLayout } from '../../components';

const meta: Meta<typeof NetworkError> = {
  title: 'Views/NetworkError',
  component: NetworkError,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    nextjs: {
      appDirectory: true,
    },
    docs: {
      description: {
        component:
          'Network error view. Displayed when the app encounters a server or network error.',
      },
    },
  },
  decorators: [
    (Story) => (
      <PublicLayout>
        <Story />
      </PublicLayout>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NetworkError>;

export const Default: Story = {
  name: 'Desktop View',
  globals: {
    viewport: { value: 'desktop' },
  },
};

export const Tablet: Story = {
  name: 'Tablet View',
  globals: {
    viewport: { value: 'tablet' },
  },
};

export const Mobile: Story = {
  name: 'Mobile View',
  globals: {
    viewport: { value: 'mobile1' },
  },
};
