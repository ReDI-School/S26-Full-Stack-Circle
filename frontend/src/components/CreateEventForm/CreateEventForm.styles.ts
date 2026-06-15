import { tv } from 'tailwind-variants';

export const CreateEventFormStyles = tv({
  slots: {
    form: 'flex flex-col gap-6',
    title: 'text-xl font-normal text-text-primary uppercase',
    gridContainer: 'grid grid-cols-3 gap-4',
    fieldsWrapper: 'flex flex-col gap-5',
    footer: 'flex justify-between items-center mt-4',
    dateTimeWrapper: 'min-w-0 w-full',
  },
});
