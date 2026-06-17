'use client';

import { useState } from 'react';
import { UserSettingsForm } from '@components';
import { useAuthContext, useAuthDispatch } from '@/contexts/AuthContext';
import { updateUserRequest } from '@services/userService';
import type { UpdateUserInput } from '@validators/schemas';

export default function SettingsPage() {
  const { authUser } = useAuthContext();
  const { setAuthUser } = useAuthDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>();

  const updateUser = async ({ firstName, lastName, newPassword }: UpdateUserInput) => {
    try {
      setLoading(true);
      setError(undefined);
      setSuccessMessage(undefined);
      if (!authUser) throw new Error('Not logged in.');
      await updateUserRequest(authUser.id, { firstName, lastName, password: newPassword || undefined });
      setAuthUser({ ...authUser, firstName, lastName });
      setSuccessMessage('Settings saved successfully.');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserSettingsForm
      onSubmit={updateUser}
      isLoading={loading}
      serverError={error}
      successMessage={successMessage}
      defaultValues={{ firstName: authUser?.firstName, lastName: authUser?.lastName }}
    />
  );
}
