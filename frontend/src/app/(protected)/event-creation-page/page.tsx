'use client';

import { useRouter } from 'next/navigation';
import { FormCard, LinkButton } from '@components';
import { ArrowLeftIcon } from '@phosphor-icons/react';

export default function EventCreationPage() {
  const router = useRouter();

  const handleCancel = () => {
    router.push('/');
  };

  const handleCreateEvent = () => {
    router.push('/event-details/new-id');
  };

  return (
    <div className="flex flex-col gap-[50px] w-full max-w-[1340px] mx-auto pt-4 pb-4">
      <div className="flex items-center justify-start">
        <LinkButton href="/" icon={<ArrowLeftIcon size={16} />}>
          GO BACK
        </LinkButton>
      </div>

      <FormCard onSubmit={handleCreateEvent} onCancel={handleCancel} />
    </div>
  );
}
