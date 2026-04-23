import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import NotFound from './NotFound';

/**
 * Page-level composition for 404 Not Found errors.
 * This Storybook file validates the standalone NotFound view across various viewport sizes.
 */
const meta: Meta<typeof NotFound> = {
  title: 'Views/NotFound',
  component: NotFound,
  tags: ['autodocs'],
  parameters: {
    // Removes Storybook's default canvas padding
    layout: 'fullscreen',
    // Mocks the Next.js App Router to prevent useRouter() crashes
    nextjs: {
      appDirectory: true,
    },
    docs: {
      description: {
        component:
          'Standalone 404 error view. Handles generic unmatched routes and explicit `notFound()` boundaries.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof NotFound>;

/**
 * Standard desktop presentation.
 * Validates that the layout spans the full viewport and centers the error message appropriately.
 */
export const Default: Story = {
  name: 'Desktop View',
  globals: {
    viewport: { value: 'desktop' },
  },
};

/**
 * Tablet viewport presentation.
 * Ensures typography scales correctly and the layout transitions smoothly before hitting mobile breakpoints.
 */
export const Tablet: Story = {
  name: 'Tablet View',
  globals: {
    viewport: { value: 'tablet' },
  },
};

/**
 * Mobile viewport presentation.
 * Verifies that the internal `PublicLayout` sidebar collapses and the error typography scales down.
 */
export const Mobile: Story = {
  name: 'Mobile View',
  globals: {
    viewport: { value: 'mobile1' },
  },
};
