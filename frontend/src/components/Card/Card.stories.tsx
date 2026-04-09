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
        <h3 className="text-base font-semibold text-red-800 uppercase">Danger</h3>
        <p className="text-sm text-red-700">If you delete this event, you will lose your data</p>

        <button
          className="w-50 cursor-pointer mt-2 self-end rounded-md bg-[#c0392b] px-4 py-2 text-sm text-white transition-colors hover:bg-[#a93226]"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Delete clicked');
          }}
        >
          Delete Event
        </button>
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
      <div className="flex flex-col gap-7.5">
        {/* Date */}
        <span className="text-sm leading-6 text-[#707070]">April 4, 2017 – 2:17 PM</span>

        {/* Content */}
        <div className="flex flex-col gap-5">
          {/* Title + Author */}
          <div className="flex flex-col gap-2.5">
            <h3 className="text-[22px]  font-normal text-[#323C46]">How to Network</h3>
            <p className="text-sm leading-4 font-normal text-[#707070]">Fabio Rodrigues</p>
          </div>

          {/* Description */}
          <p className="text-base font-normal text-[#64748B]">
            I will show you how to network and communicate our interests effectively.
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center gap-5">
          {/* Participants */}
          <span className="flex-1 text-sm text-[#64748B]">10 of 40</span>

          {/* Join Button */}
          <button
            className="h-8 w-25 min-w-25 cursor-pointer rounded-base bg-[#2BBB8D] text-sm font-semibold text-gray-900 transition-colors hover:bg-[#25a37a]"
            onClick={(e) => {
              e.stopPropagation();
              console.log('Join clicked');
            }}
          >
            JOIN
          </button>
        </div>
      </div>
    ),
  },
};
