import type { Meta, StoryObj } from '@storybook/react-vite';
import Card from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Components/Card',
  tags: ['autodocs'],
  argTypes: {
    // Explicitly tells Storybook to give us a toggle switch for this prop
    interactive: {
      control: 'boolean',
      description: 'Enables hover, active, and focus states.',
    },
    loading: {
      control: 'boolean',
      description: 'Shows skeleton loading state when true.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// 1. Realistic Content Test
export const Default: Story = {
  args: {
    interactive: false,
    loading: false,
    children: (
      <div className="flex flex-col gap-2 text-gray-800">
        <h3 className="text-xl font-bold">Default Card</h3>
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
    loading: false,
    children: (
      <div className="flex flex-col gap-2 text-gray-800">
        <h3 className="text-xl font-bold hover:text-blue-600 transition-colors">
          Interactive Card
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
    loading: false,
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
    loading: false,
    // Testing if our tv() setup correctly merges one-off Tailwind classes
    className: 'bg-blue-50 border-blue-200 shadow-blue-100 max-w-sm',
    children: (
      <div className="hover:shadow-blue-200">
        <h3 className="font-bold">Custom Blue Card</h3>
        <p className="text-sm">Testing if className injection works via tailwind-merge.</p>
      </div>
    ),
  },
};

// 5. Event Card Example
export const EventCard: Story = {
  args: {
    interactive: true,
    loading: false,
    children: (
      <div className="w-80">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">How to Network</h3>
          <span className="text-sm text-gray-500">10 of 40</span>
        </div>
        <p className="text-gray-600 text-sm mt-1">April 4, 2017 – 2:17 PM</p>
        <p className="text-gray-500 mt-2">
          Let&apos;s get together and share techniques on how to network and communicate well our
          interests.
        </p>
        <p className="text-sm text-gray-500 mt-3">Fabio Rodrigues</p>
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            console.log('Join clicked');
          }}
        >
          JOIN
        </button>
      </div>
    ),
  },
};

// 6. Loading State - Basic Skeleton Loading
export const LoadingState: Story = {
  args: {
    interactive: false,
    loading: true,
    children: null,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the card in a loading state with skeleton placeholders. Useful for data fetching scenarios or when there is no connection.',
      },
    },
  },
};
