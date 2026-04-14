import type { Meta, StoryObj } from '@storybook/react-vite';
import LinkButton from './LinkButton';
import { ArrowLeftIcon } from '@phosphor-icons/react';

const meta: Meta<typeof LinkButton> = {
  title: 'Components/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {
  render: () => <LinkButton icon={<ArrowLeftIcon />} label="GO BACK" href="#" />,
};

export const WithoutIcon: Story = {
  args: {
    label: 'GO BACK',
    href: '#',
  },
};
