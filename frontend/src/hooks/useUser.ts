import { useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { updateUserRequest } from '@services/userService';
import type { UpdateUserInput } from '@validators/schemas';

export default function useUser() {
  const { authUser } = useAuthContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const updateUser = async ({ firstName, lastName, newPassword }: UpdateUserInput) => {
    try {
      setLoading(true);
      setError(undefined);
      setSuccessMessage(undefined);
      if (!authUser) throw new Error('Not logged in.');
      await updateUserRequest(authUser.id, { firstName, lastName, password: newPassword || undefined });
      setSuccessMessage('Settings saved successfully.');
      return true;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, successMessage, updateUser };
}
