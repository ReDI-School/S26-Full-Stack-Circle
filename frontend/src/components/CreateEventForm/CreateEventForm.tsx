'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button, Card, InputField } from '@components';
import { InfoBox } from '../InfoBox';
import type { CreateEventFormProps } from './CreateEventForm.types';
import { CreateEventFormStyles } from './CreateEventForm.styles';

import { createEventSchema } from '@/validators/schemas';

const formSchema = createEventSchema.omit({ location: true });

type FormSchemaInput = z.input<typeof formSchema>;
type FormSchemaOutput = z.output<typeof formSchema>;

export default function CreateEventForm(props: CreateEventFormProps) {
  const { onSubmit, onCancel, isLoading, serverError } = props;

  const { form, title, gridContainer, fieldsWrapper, footer, dateTimeWrapper } =
    CreateEventFormStyles();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchemaInput, unknown, FormSchemaOutput>({
    resolver: zodResolver(formSchema),
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
            <div className={dateTimeWrapper()}>
              <InputField
                label="Date"
                type="date"
                required
                disabled={isLoading}
                error={errors.date?.message}
                {...register('date')}
              />
            </div>
            <div className={dateTimeWrapper()}>
              <InputField
                label="Time"
                type="time"
                required
                disabled={isLoading}
                error={errors.time?.message}
                {...register('time')}
              />
            </div>
            <div className={dateTimeWrapper()}>
              <InputField
                label="Capacity"
                type="number"
                required
                disabled={isLoading}
                error={errors.capacity?.message}
                {...register('capacity')}
              />
            </div>
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
