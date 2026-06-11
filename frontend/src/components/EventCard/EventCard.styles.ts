import { tv } from 'tailwind-variants';

export const EventCardStyles = tv({
  slots: {
    wrapper: 'flex flex-col gap-7.5 font-sans',
    dateContainer: 'flex gap-2 items-center text-ec-tertiary',
    container: 'flex gap-2 items-center text-ec-secondary',
    skeletonContainer: 'flex flex-col gap-2',
    bottomContainer: 'flex justify-between',
    date: 'text-sm text-input-primary',
    title: ' text-ec-title',
    author: ' text-ec-tertiary',
    description: 'text-base text-ec-secondary',
    attendees: 'text-sm text-ec-secondary',
    buttonText: 'uppercase',
    interactive: '',
    detailsContainer:
      'text-sm flex gap-2 items-center text-ec-tertiary  hover:text-ec-title transition-colors duration-200',
  },
  variants: {
    variant: {
      preview: {
        title: 'text-xl',
        author: 'text-sm',
        description: 'line-clamp-2',
        interactive: 'true',
      },
      fullview: {
        title: 'text-3xl',
        author: 'text-base',
        description: 'whitespace-pre-line',
        interactive: 'false',
      },
    },
  },
});
