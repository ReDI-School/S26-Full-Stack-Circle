import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    // Explicitly tells Storybook to give us a toggle switch for this prop
    interactive: {
      control: 'boolean',
      description: 'Enables hover, active, and focus states.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

// 1. Realistic Content Test
export const Default: Story = {
  args: {
    interactive: false,
    children: (
      <div className="flex flex-col gap-2 text-gray-800">
        <h3 className="text-xl font-bold">Event Title</h3>
        <p className="text-sm text-gray-600">
          This is a realistic representation of how a card will be used. It contains nested HTML
          elements instead of just a raw string.
        </p>
      </div>
    ),
  },
};

// 2. Interactive State Test
export const Interactive: Story = {
  args: {
    interactive: true,
    children: (
      <div className="flex flex-col gap-2 text-gray-800">
        <h3 className="text-xl font-bold hover:text-blue-600 transition-colors">
          Clickable Event Card
        </h3>
        <p className="text-sm text-gray-600">
          Hover over me to see the border and shadow transition.
        </p>
      </div>
    ),
  },
};

// 3. Layout Stress Test (Long Content)
export const LongContent: Story = {
  args: {
    interactive: false,
    children: (
      <div className="flex flex-col gap-4">
        <h3 className="text-xl font-bold">Very Long Content Test</h3>
        <p>
          This story tests what happens when a user inputs a massive amount of text. Does the card
          stretch properly? Do the paddings hold up? Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat.
        </p>
      </div>
    ),
  },
};

// 4. Prop Injection Test (Custom Styling)
export const WithCustomStyles: Story = {
  args: {
    interactive: true,
    // Testing if our tv() setup correctly merges one-off Tailwind classes
    className: 'bg-blue-50 border-blue-200 shadow-blue-100 max-w-sm',
    children: (
        <h3 className="font-bold">Custom Blue Card</h3>
        <p className="text-sm">Testing if className injection works via tailwind-merge.</p>
        <button>JOIN</button>
      </div>
    ),
  },
};
