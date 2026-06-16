'use client';

import { useRouter } from 'next/navigation';
import { CreateEventForm, LinkButton } from '@components';
import { ArrowLeftIcon } from '@phosphor-icons/react';
import useCreateEvent from '@hooks/useCreateEvent';

export default function EventCreationPage() {
  const router = useRouter();
  const { createEvent, isLoading, serverError } = useCreateEvent();

  const handleCancel = () => {
    router.back();
  };

  return (
    <>
      <div className="flex items-center justify-start mb-6 lg:mb-12">
        <LinkButton
          href="/events"
          icon={<ArrowLeftIcon size={16} />}
          color="secondary"
          onClick={handleCancel}
        >
          GO BACK
        </LinkButton>
      </div>

      <CreateEventForm
        onSubmit={createEvent}
        onCancel={handleCancel}
        isLoading={isLoading}
        serverError={serverError}
      />
    </>
  );
}
