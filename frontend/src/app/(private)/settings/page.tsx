'use client';

import { UserSettingsForm } from '@components';
import useUser from '@hooks/useUser';

export default function SettingsPage() {
  const { updateUser, loading, error, successMessage } = useUser();

  return (
    <UserSettingsForm
      onSubmit={updateUser}
      isLoading={loading}
      serverError={error}
      successMessage={successMessage}
    />
  );
}
