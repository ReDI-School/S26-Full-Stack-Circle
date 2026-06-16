'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LinkButton } from '@components/LinkButton';
import { ArrowLeftIcon } from '@phosphor-icons/react';
import { Button } from '@components/Button';
import { InputField } from '@components/InputField';
import type { EditEventFormData, EventActionResult, UpdateEventPayload } from './page';
import { InfoBox } from '@components/InfoBox';

type Props = {
  eventId?: string;
  eventHref: string;
  initialEvent: EditEventFormData;
  onUpdateEvent: (payload: UpdateEventPayload) => Promise<EventActionResult>;
  onDeleteEvent: () => Promise<EventActionResult>;
};

export default function EditEventFormClient({
  eventId,
  eventHref,
  initialEvent,
  onUpdateEvent,
  onDeleteEvent,
}: Props) {
  const router = useRouter();

  const [form, setForm] = useState<EditEventFormData>(initialEvent);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setForm(initialEvent);
  }, [initialEvent]);

  const updateField = (field: keyof EditEventFormData, value: string) => {
    setForm((prev: EditEventFormData) => ({
      ...prev,
      [field]: field === 'capacity' ? (value === '' ? '' : Number(value)) : value,
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventId) return;

    try {
      setIsSaving(true);
      setError(null);

      const result = await onUpdateEvent({
        title: form.title,
        description: form.description,
        date: form.date,
        time: form.time,
        location: form.location,
        capacity: Number(form.capacity),
      });

      if (!result.ok) {
        throw new Error(result.error || 'Failed to update event');
      }
      setSuccessMessage('Changes successfully saved');
      router.push(eventHref);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!eventId) return;
    const confirmed = window.confirm('Delete this event? This action cannot be undone.');
    if (!confirmed) return;

    try {
      setIsDeleting(true);
      setError(null);

      const result = await onDeleteEvent();

      if (!result.ok) {
        throw new Error(result.error || 'Failed to delete event');
      }

      router.push('/events');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative size-full min-h-screen bg-white px-4 py-6 sm:px-6 sm:py-8">
      <div className="mt-2 flex justify-between items-center w-full">
        <div className="scale-90 origin-left">
          <LinkButton href={eventHref} icon={<ArrowLeftIcon />} color="secondary">
            GO BACK
          </LinkButton>
        </div>
        <div className="hidden lg:inline-flex">
          <Link href="/create-event">
            <Button variant="idle">CREATE NEW EVENT</Button>
          </Link>
        </div>
        <div className="lg:hidden">
          <Link href="/create-event">
            <Button variant="idle" size="small">
              CREATE NEW EVENT
            </Button>
          </Link>
        </div>
      </div>

      <div className="mt-6 grid w-full grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">
        <form
          onSubmit={handleSave}
          className="w-full bg-white p-4 shadow-sm shadow-neutral-200 ring-1 ring-black/3 sm:p-6"
        >
          <p className="text-lg text-gray-700">EDIT EVENT</p>

          {successMessage && <InfoBox variant="success" message={successMessage}></InfoBox>}

          {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

          <div className="mt-6 w-full">
            <InputField
              label="Title"
              required
              type="text"
              value={form.title}
              onChange={(e) => updateField('title', e.target.value)}
            />
          </div>

          <div className="mt-6 grid w-full grid-cols-3 gap-2 sm:gap-x-3 sm:gap-y-0">
            <InputField
              label="Date"
              required
              type="date"
              value={form.date}
              onChange={(e) => updateField('date', e.target.value)}
            />
            <InputField
              label="Time"
              required
              type="time"
              value={form.time}
              onChange={(e) => updateField('time', e.target.value)}
            />
            <InputField
              label="Capacity"
              required
              type="number"
              min="1"
              value={form.capacity}
              onChange={(e) => updateField('capacity', e.target.value)}
            />
          </div>

          <div className="mt-6 w-full">
            <InputField
              label="Location"
              required
              type="text"
              value={form.location}
              onChange={(e) => updateField('location', e.target.value)}
            />
          </div>

          <div className="mt-6 w-full">
            <InputField
              label="Description"
              required
              as="textarea"
              rows={3}
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
            />
          </div>

          <div className="hidden mt-6 justify-between sm:flex">
            <Link href={eventHref}>
              <Button variant="idle">CANCEL</Button>
            </Link>
            <Button variant="positive" type="submit" state={isSaving ? 'loading' : 'default'}>
              SAVE
            </Button>
          </div>

          <div className="flex mt-6 justify-between sm:hidden">
            <Link href={eventHref}>
              <Button variant="idle" size="small">
                CANCEL
              </Button>
            </Link>
            <Button
              variant="positive"
              size="small"
              type="submit"
              state={isSaving ? 'loading' : 'default'}
            >
              SAVE
            </Button>
          </div>
        </form>

        <div>
          <div className="rounded border border-red-400 bg-[#ffe6e6] p-6 text-red-400">
            <p>DANGER</p>
            <p className="mt-5 text-sm">
              If you delete this event you will lose all its data and attendees.
            </p>
            <div className="mt-5 flex justify-end">
              <Button
                variant="negative"
                size="small"
                type="button"
                state={isDeleting ? 'loading' : 'default'}
                onClick={handleDelete}
              >
                DELETE EVENT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
