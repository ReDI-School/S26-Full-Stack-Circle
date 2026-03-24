# ReDi Events - Frontend

Welcome to the **ReDi Events** frontend! This is a web application built with **Next.js** and **React**. It will let users create, join, and manage events.

This README will help you understand how the project is set up and how to start working on it.

## What is the tech stack?

Here is a quick overview of the main tools we use:

| Tool | What it does |
|------|-------------|
| [Next.js 15](https://nextjs.org/) | A React framework that handles routing, server-side rendering, and more |
| [React 19](https://react.dev/) | A library for building user interfaces with components |
| [TypeScript](https://www.typescriptlang.org/) | JavaScript with types, so you catch errors before running the code |
| [Tailwind CSS v4](https://tailwindcss.com/) | A CSS framework that lets you style elements using class names |
| [Storybook 9](https://storybook.js.org/) | A tool to build and preview components in isolation |
| [Vitest](https://vitest.dev/) | A test runner for writing unit tests |

## Project structure

```
frontend/
├── src/
│   ├── app/                  # Pages and layout (Next.js App Router)
│   │   ├── layout.tsx        # The root layout (wraps every page)
│   │   ├── page.tsx          # Home page (/)
│   │   └── sign-in/
│   │       └── page.tsx      # Sign In page (/sign-in)
│   ├── assets/
│   │   ├── css/
│   │   │   ├── global.css    # Design tokens and global styles
│   │   │   └── reset.css     # Browser reset styles
│   │   └── images/
│   │       └── logo.svg      # ReDi Events logo
│   ├── components/           # Reusable UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx        # The component itself
│   │   │   ├── Button.types.ts   # TypeScript types for the props
│   │   │   ├── Button.styles.ts  # Tailwind styles using tailwind-variants
│   │   │   └── Button.stories.tsx # Storybook stories
│   │   └── Layout/
│   │       └── Layout.tsx    # Layout wrapper component
│   ├── config/
│   │   └── index.ts          # API URL configuration
│   └── hooks/
│       └── useConfig.ts      # Hook to load the config
├── .storybook/               # Storybook configuration
├── .nvmrc                    # Node.js version for nvm (v22)
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
├── next.config.ts            # Next.js configuration
└── postcss.config.mjs        # PostCSS configuration (needed by Tailwind)
```

## Getting started

### What you need

- **Node.js** version 22 or higher (check with `node -v`)
- **npm** as a package manager (comes with Node.js)

> If you need to install Node.js, see the [main README](../README.md#1-nodejs-version-22-or-higher) for instructions.

### Step 1: Use the correct Node.js version

```bash
cd frontend
nvm use
```

This reads the `.nvmrc` file in this folder and switches to the correct Node.js version (v22). If you see an error saying the version is not installed, run `nvm install` first.

### Step 2: Install dependencies

```bash
npm install
```

This downloads all the packages listed in `package.json`.

### Step 3: Start the development server

```bash
npm run dev
```

You should see something like:

```
  ▲ Next.js 15.x
  - Local:   http://localhost:3000
```

Open `http://localhost:3000` in your browser to see the app.

> **Note:** The frontend talks to the backend API. Make sure the backend is running too, otherwise you won't see any data. [See the Backend README](../backend/README.md).

## How the app is organized

### Pages and routing

Next.js uses the **App Router**. Each folder inside `src/app/` becomes a URL route:

| File | URL | What it shows |
|------|-----|--------------|
| `src/app/page.tsx` | `/` | Home page |
| `src/app/sign-in/page.tsx` | `/sign-in` | Sign In page |

You don't need to set up routing manually. Just create a new folder inside `src/app/` with a `page.tsx` file, and Next.js creates the route for you.

### The root layout (`src/app/layout.tsx`)

This file wraps **every** page. It loads the font, the CSS files, and the `<Layout>` component:

```tsx
import { Roboto } from 'next/font/google';

// Load the Roboto font from Google Fonts
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
  display: 'swap',
});

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
};
```

**What is happening here:**

- `Roboto` is imported from `next/font/google` -- Next.js downloads and serves the font automatically, no external requests needed
- `variable: '--font-roboto'` creates a CSS variable so Tailwind can use the font
- `className={roboto.variable}` applies that CSS variable to the whole page
- `<Layout>` is our own wrapper component that centers the content

### Components

Components are reusable pieces of UI. Each component lives in its own folder under `src/components/` and is made up of several files:

```
Button/
├── Button.tsx          # The component (what it renders)
├── Button.types.ts     # The TypeScript types (what props it accepts)
├── Button.styles.ts    # The styles (how it looks)
├── Button.stories.tsx  # The Storybook stories (previews)
└── index.ts            # Barrel file (re-exports for cleaner imports)
```

This pattern keeps things organized. When you need to create a new component, follow the same structure.

## Styling

### How Tailwind CSS works

Instead of writing CSS in separate files, you add class names directly to your HTML/JSX elements. Tailwind provides utility classes for almost everything:

```tsx
// Instead of writing CSS like this:
// .card { display: flex; padding: 16px; border-radius: 8px; }

// You write class names like this:
<div className="flex p-4 rounded-lg">
```

### Design tokens (`src/assets/css/global.css`)

Design tokens are the colors, fonts, and sizes that define how the app looks. They are defined in `global.css` using the `@theme` directive:

```css
@theme {
  /* The main brand color (teal) */
  --color-primary: #2E8B8B;
  --color-primary-dark: #236B6B;    /* For hover states */
  --color-primary-light: #3AA9A9;   /* For accents */

  /* Status colors */
  --color-success: #28A745;   /* Green - for success messages */
  --color-warning: #FFC107;   /* Yellow - for warnings */
  --color-error: #DC3545;     /* Red - for errors */
  --color-danger: #E8614D;    /* Orange-red - for destructive actions */

  /* Background colors */
  --color-bg-primary: #FFFFFF;     /* White - main background */
  --color-bg-secondary: #F5F5F5;   /* Light grey - secondary areas */

  /* Text colors */
  --color-text-primary: #333333;    /* Dark grey - main text */
  --color-text-secondary: #666666;  /* Medium grey - secondary text */
  --color-text-inverse: #FFFFFF;    /* White - text on dark backgrounds */
}
```

Once defined, you can use these tokens as Tailwind classes. For example:

```tsx
<div className="bg-primary text-text-inverse">  // Teal background, white text
<p className="text-text-secondary">              // Medium grey text
<div className="bg-bg-secondary">               // Light grey background
```

### tailwind-variants

For components with multiple states (hover, disabled, variants), we use [tailwind-variants](https://www.tailwind-variants.org/). It lets you group Tailwind classes in a clean way:

```ts
// Button.styles.ts
import { tv } from 'tailwind-variants';

export const buttonStyles = tv({
  base: [
    'bg-primary text-text-inverse',     // Teal background, white text
    'py-3 px-6 rounded-base',           // Padding and rounded corners
    'hover:bg-primary-dark',            // Darker teal on hover
    'disabled:bg-grey-300 disabled:opacity-60',
  ],
  variants: {
    stretch: {
      true: 'w-full',  // Takes the full width of its container
    },
  },
});
```

## Available scripts

Run these from the `frontend/` folder:

| Command | What it does |
|---------|-------------|
| `npm run dev` | Starts the development server at `http://localhost:3000` |
| `npm run build` | Builds the app for production |
| `npm run start` | Runs the production build |
| `npm run lint` | Checks your code for problems |
| `npm run format` | Formats your code with Prettier |
| `npm run storybook` | Opens Storybook at `http://localhost:6006` |

## Storybook

Storybook lets you develop and preview components without needing to add them to a page first. This is useful for building and testing UI components in isolation.

```bash
npm run storybook
```

This opens a browser window where you can see all your components and interact with them.

## How frontend and backend connect

1. The frontend loads and calls `fetch('http://localhost:4000/users')`
2. The backend receives the request and queries the database
3. The backend sends back the data as JSON
4. The frontend receives the data and shows it on the page

The API URL is configured in `src/config/index.ts` and loaded via the `useConfig` hook.

## Next steps

Once you are comfortable with the project, try:

1. Create a new page by adding a folder inside `src/app/`
2. Build a new component following the `Button/` folder pattern
3. Add your component to Storybook with a `.stories.tsx` file
4. Connect your component to the backend API

## Helpful resources

- [Next.js Documentation](https://nextjs.org/docs) -- how routing, layouts, and pages work
- [React Documentation](https://react.dev/) -- components, state, and hooks
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) -- all available utility classes
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) -- types and interfaces
- [Storybook Documentation](https://storybook.js.org/docs) -- writing stories for your components

## Getting help

If something is not working:

1. Check the **terminal** where you ran `npm run dev` for error messages
2. Check the **browser console** (right-click > Inspect > Console tab)
3. Check the **Network tab** in browser DevTools to see if API calls are failing
4. Ask your teacher or classmates for help
