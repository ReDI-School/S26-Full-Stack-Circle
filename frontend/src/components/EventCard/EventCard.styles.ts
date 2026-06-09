import { tv } from 'tailwind-variants';

export const EventCardStyles = tv({
  slots: {
    wrapper: 'flex flex-col gap-7.5 font-sans',
    dateContainer: 'flex gap-2 items-center text-ec-tertiary',
    container: 'flex gap-2 items-center text-ec-secondary',
    skeletonContainer: 'flex flex-col gap-2',
    bottomContainer: 'flex justify-between',
    date: 'text-sm text-input-primary',
    title: '',
    author: 'text-sm text-ec-tertiary',
    description: 'text-base text-ec-secondary',
    attendees: 'text-sm text-ec-secondary',
    buttonText: 'uppercase',
    detailsContainer:
      'text-sm flex gap-2 items-center text-ec-tertiary  hover:text-text-primary transition-colors duration-200',
  },
  variants: {
    titleSize: {
      big: {
        title: 'text-2xl',
      },
      small: {
        title: 'text-xl',
      },
    },
  },

  defaultVariants: {
    titleSize: 'small',
  },
});
