import { tv } from 'tailwind-variants';

/**
 * Tailwind Variants configuration for the NotFound view.
 * Defines the structural layout and typography slots for the 404 error page.
 *
 * @property {string} wrapper - The outermost full-width flex container.
 * @property {string} container - The constrained-width inner container that centers content.
 * @property {string} textWrapper - The alignment wrapper for typography (centered on mobile, left on desktop).
 * @property {string} title - The main 404 heading text styles.
 * @property {string} description - The supporting error message text styles.
 */
export const notFoundStyles = tv({
  slots: {
    wrapper: 'flex w-full flex-col items-center gap-[20px] px-[30px] lg:gap-[50px]',
    container:
      'flex w-[342px] flex-col items-center justify-center gap-[30px] lg:w-[550px] lg:items-start lg:gap-[40px]',
    textWrapper: 'text-center lg:text-left',
    title: 'text-[28px] font-normal leading-[48px] text-[#323C46]',
    description: 'text-[18px] font-normal leading-[24px] text-[#949EA8]',
  },
});
