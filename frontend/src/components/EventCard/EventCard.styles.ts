import { tv } from 'tailwind-variants';

export const EventCardStyles = tv({
  slots: {
    wrapper: 'flex flex-col gap-7.5 font-sans',
    container: 'flex gap-2.5 items-center ',
    bottomContainer: 'flex justify-between',
    date: 'text-sm h-6 text-input-primary',
    title: 'text-xl',
    author: 'text-sm text-ec-tertiary',
    description: 'text-base text-ec-secondary',
    attendees: 'text-sm text-input-secondary',
    buttonText: 'uppercase',
  },
});
