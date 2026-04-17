import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LinkButton from './LinkButton';
import { ArrowLeftIcon } from '@phosphor-icons/react/ssr';

const meta: Meta<typeof LinkButton> = {
  title: 'Components/LinkButton',
  component: LinkButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof LinkButton>;

export const Default: Story = {
  render: () => <LinkButton icon={<ArrowLeftIcon />} href="#" >GO BACK</LinkButton>,
};

export const WithoutIcon: Story = {
  args: {
    children: 'GO BACK',
    href: '#',
  },
};
