'use client';

import { UserSettingsForm } from '@components';
import useAuth from '@hooks/useAuth';

export default function SettingsPage() {
  const { updateUser, loading, error, successMessage } = useAuth();

  return (
    <UserSettingsForm
      onSubmit={updateUser}
      isLoading={loading}
      serverError={error}
      successMessage={successMessage}
    />
  );
}
