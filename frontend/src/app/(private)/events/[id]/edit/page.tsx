import { LinkButton } from '@components/LinkButton';
import { ArrowLeftIcon } from '@phosphor-icons/react';
import { Button } from '@components/Button';
import { buttonStyles } from '@components/Button/Button.styles';
import { InputField } from '@components/InputField';
import { config } from '@config';
import { cookies } from 'next/headers';
import Link from 'next/link';

type EditEventPageProps = {
  params?: Promise<{ id: string }>;
};

export default async function EditEventPage({ params }: EditEventPageProps = {}) {
  const id = params ? (await params).id : undefined;
  const eventHref = id ? `/events/${id}` : '/events';

  let event: {
    title?: string | null;
    date?: string | null;
    time?: string | null;
    capacity?: number | null;
    description?: string | null;
  } = {};

  if (id) {
    const cookieStore = await cookies();
    const { apiUrl } = await config();
    const token = cookieStore.get('token')?.value;

    const res = await fetch(`${apiUrl}/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      cache: 'no-store',
    });

    const data = res.ok ? await res.json() : {};
    event = data.event ?? {};
  }

  return (
    <div className="relative size-full min-h-screen bg-white px-4 py-6 sm:px-6 sm:py-8">
      <div className="mt-2 flex justify-between items-center w-full">
        <div className="scale-90 origin-left">
          <LinkButton href="/" icon={<ArrowLeftIcon />} color="secondary">
            GO BACK
          </LinkButton>
        </div>
        <div className="hidden lg:inline-flex">
          <Button variant="idle">CREATE NEW EVENT</Button>
        </div>
        <div className="lg:hidden">
          <Button variant="idle" size="small">
            CREATE NEW EVENT
          </Button>
        </div>
      </div>

      <div className="mt-6 grid w-full grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="w-full bg-white p-4 shadow-sm shadow-neutral-200 ring-1 ring-black/3 sm:p-6">
          <p className="text-lg text-gray-700">EDIT EVENT</p>
          <div className="mt-6 w-full">
            <InputField
              label="Title"
              placeholder="Enter event title"
              required
              type="text"
              defaultValue={event.title ?? ''}
            ></InputField>
          </div>

          <div className="mt-6 grid w-full grid-cols-3 gap-2 sm:gap-x-3 sm:gap-y-0">
            <InputField
              label="Date"
              required
              type="date"
              defaultValue={event.date ? event.date.slice(0, 10) : ''}
            ></InputField>
            <InputField
              label="Time"
              required
              type="time"
              defaultValue={event.time ?? ''}
            ></InputField>
            <InputField
              label="Capacity"
              placeholder="Enter capacity"
              required
              type="number"
              min="1"
              defaultValue={event.capacity ?? ''}
            ></InputField>
          </div>
          <div className="mt-6 w-full">
            <InputField
              label="Description"
              placeholder="Enter event description"
              required
              as="textarea"
              rows={3}
              defaultValue={event.description ?? ''}
            ></InputField>
          </div>
          <div className="hidden mt-6 justify-between sm:flex">
            <Link href={eventHref} className={buttonStyles({ variant: 'idle' })}>
              CANCEL
            </Link>
            <Button variant="positive">SAVE</Button>
          </div>
          <div className="flex mt-6 justify-between sm:hidden">
            <Link href={eventHref} className={buttonStyles({ variant: 'idle', size: 'small' })}>
              CANCEL
            </Link>
            <Button variant="positive" size="small">
              SAVE
            </Button>
          </div>
        </div>

        <div>
          <div className="rounded border border-red-400 bg-[#ffe6e6] p-6 text-red-400">
            <p>DANGER</p>
            <p className="mt-5 text-sm">
              If you delete this event you will lose all its data and attendees.
            </p>
            <div className="mt-5 flex justify-end">
              <Button variant="negative" size="small">
                DELETE EVENT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
