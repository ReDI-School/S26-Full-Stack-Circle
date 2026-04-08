import type { Meta, StoryObj } from '@storybook/react-vite';

import Sidebar from './Sidebar';
import sidebarImage from '../../assets/images/Sidebar.png';

const meta: Meta<typeof Sidebar> = {
  title: 'Components/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  args: {
    imageSrc: sidebarImage,
    alt: 'Authentication sidebar illustration',
  },
};

export const Custom: Story = {
  args: {
    imageSrc: sidebarImage,
    alt: 'Custom sidebar illustration',
  },
};
