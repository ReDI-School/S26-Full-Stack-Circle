import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LinkButton from './LinkButton';
import { ArrowLeftIcon } from '@phosphor-icons/react/ssr';

const meta: Meta<typeof LinkButton> = {
  title: 'Components/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'radio',
      options: ['primary', 'secondary'],
    },
    icon: {
      control: 'boolean',
      mapping: { true: <ArrowLeftIcon />, false: undefined },
    },
    underlined: {
      control: 'boolean',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LinkButton>;

export const DefaultWithIcon: Story = {
  args: {
    children: 'GO BACK',
    href: '#',
    icon: true,
    color: 'primary',
    underlined: false,
  },
};

export const SecondaryWithoutIcon: Story = {
  args: {
    children: 'GO BACK',
    href: '#',
    color: 'secondary',
    underlined: true,
  },
};
