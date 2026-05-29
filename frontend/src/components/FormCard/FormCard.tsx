'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Card, InputField } from '@components';
import { InfoBox } from '../InfoBox';
import type { FormCardProps } from './FormCard.types';
import { FormCardStyles } from './FormCard.styles';

const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  capacity: z.preprocess(
    (val) => (val === '' ? undefined : Number(val)),
    z.number({ message: 'Capacity is required' }).min(1, 'Capacity must be at least 1')
  ),
  description: z.string().min(1, 'Description is required'),
});

type EventSchemaInput = z.input<typeof eventSchema>;
type EventSchemaOutput = z.output<typeof eventSchema>;

export default function FormCard(props: FormCardProps) {
  const { onSubmit, onCancel, isLoading, serverError } = props;

  const { form, title, gridContainer, fieldsWrapper, footer } = FormCardStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventSchemaInput, unknown, EventSchemaOutput>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: '',
      date: '',
      time: '',
      capacity: '' as unknown as number,
      description: '',
    },
  });

  return (
    <Card variant="default">
      <form onSubmit={handleSubmit(onSubmit)} className={form()} noValidate>
        <h2 className={title()}>CREATE NEW EVENT</h2>

        {serverError && <InfoBox variant="error" message={serverError} />}

        <div className={fieldsWrapper()}>
          <InputField
            label="Title"
            required
            disabled={isLoading}
            error={errors.title?.message}
            {...register('title')}
          />

          <div className={gridContainer()}>
            <InputField
              label="Date"
              type="date"
              required
              disabled={isLoading}
              error={errors.date?.message}
              {...register('date')}
            />
            <InputField
              label="Time"
              type="time"
              required
              disabled={isLoading}
              error={errors.time?.message}
              {...register('time')}
            />
            <InputField
              label="Capacity"
              type="number"
              required
              disabled={isLoading}
              error={errors.capacity?.message}
              {...register('capacity')}
            />
          </div>

          <InputField
            label="Description"
            as="textarea"
            required
            rows={6}
            disabled={isLoading}
            error={errors.description?.message}
            {...register('description')}
          />
        </div>

        <div className={footer()}>
          <Button
            size="responsive"
            type="button"
            variant="idle"
            disabled={isLoading}
            onClick={onCancel}
          >
            CANCEL
          </Button>
          <Button
            size="responsive"
            type="submit"
            variant="positive"
            state={isLoading ? 'loading' : 'default'}
          >
            CREATE EVENT
          </Button>
        </div>
      </form>
    </Card>
  );
}
