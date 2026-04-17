import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-docs',
    '@storybook/addon-a11y',
    '@storybook/addon-vitest',
  ],
  framework: {
    name: '@storybook/nextjs-vite',
    options: {},
  },
  viteFinal: async (config) => {
    const tailwindcss = await import('@tailwindcss/vite');
    config.plugins = [...(config.plugins || []), tailwindcss.default()];
    config.esbuild = {
      ...config.esbuild,
      jsx: 'automatic',
    };
    return config;
  },
};
export default config;
