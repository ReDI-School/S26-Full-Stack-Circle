import type { Meta, StoryObj } from '@storybook/react-vite';
import Card from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Components/Card',
  tags: ['autodocs'],
  argTypes: {
    interactive: {
      control: 'boolean',
      description: 'Adds hover border, slightly elevated shadow, and `cursor-pointer`.',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    variant: {
      control: 'radio',
      options: ['default', 'danger'],
      description:
        '`default` renders the standard card. `danger` applies red accents for critical content — hover is not applied.',
      table: {
        defaultValue: { summary: 'default' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * The standard card — white background, subtle shadow, rounded corners.
 * Use this as the base for all card-based layouts.
 */
export const Default: Story = {
  args: {
    variant: 'default',
    interactive: false,
    children: (
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-gray-900">Card Title</h3>
        <p className="text-sm text-gray-500">
          Supporting text that describes what this card is about.
        </p>
      </div>
    ),
  },
};

/**
 * When `interactive` is true, the card gains a visible border and slightly
 * elevated shadow on hover — matching the Figma hover state. Use for clickable
 * cards like `EventCard` or `ProfileCard`.
 */
export const Interactive: Story = {
  args: {
    variant: 'default',
    interactive: true,
    children: (
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-gray-900">Interactive Card</h3>
        <p className="text-sm text-gray-500">Hover to see the border and shadow transition.</p>
      </div>
    ),
  },
};

/**
 * The danger variant applies a red-tinted background and border.
 * Use for destructive actions, errors, or critical warnings.
 * Hover effects are intentionally not applied.
 */
export const Danger: Story = {
  args: {
    variant: 'danger',
    interactive: false,
    children: (
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold text-red-700">Danger Zone</h3>
        <p className="text-sm text-red-500">This action is irreversible. Proceed with caution.</p>
      </div>
    ),
  },
};

/**
 * Stress test for long content. Verifies that layout, overflow,
 * and spacing hold up when the card contains more text than a typical use case.
 */
export const LongContent: Story = {
  args: {
    variant: 'default',
    interactive: false,
    children: (
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold text-gray-900">Long Content</h3>
        <p className="text-sm text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        </p>
      </div>
    ),
  },
};

/**
 * A realistic composed example showing how `EventCard` would use the base Card.
 * The base Card owns the shell — content layout is handled by the consumer.
 */
export const EventCardExample: Story = {
  args: {
    variant: 'default',
    interactive: true,
    children: (
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <h3 className="text-base font-semibold text-gray-900">How to Network</h3>
          <span className="text-xs text-gray-400">10 of 40</span>
        </div>
        <p className="text-xs text-gray-400">April 4, 2017 – 2:17 PM</p>
        <p className="text-sm text-gray-600">
          Let&apos;s get together and share techniques on how to network and communicate our
          interests effectively.
        </p>
        <p className="text-xs text-gray-400">Fabio Rodrigues</p>
        <button
          className="mt-2 self-start rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-600"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Join clicked');
          }}
        >
          Join
        </button>
      </div>
    ),
  },
};
