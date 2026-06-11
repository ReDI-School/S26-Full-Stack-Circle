'use client';

import { useRouter } from 'next/navigation';
import { CreateEventForm, LinkButton } from '@components';
import { ArrowLeftIcon } from '@phosphor-icons/react';

export default function EventCreationPage() {
  const router = useRouter();

  const handleCancel = () => {
    router.push('/');
  };

  const handleCreateEvent = () => {
    router.push('/events/id');
  };

  return (
    <>
      <div className="flex items-center justify-start mb-6 lg:mb-12">
        <LinkButton href="/" icon={<ArrowLeftIcon size={16} />} onClick={handleCancel}>
          GO BACK
        </LinkButton>
      </div>

      <CreateEventForm onSubmit={handleCreateEvent} onCancel={handleCancel} />
    </>
  );
}
