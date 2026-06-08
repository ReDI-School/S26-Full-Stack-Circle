import { useState } from 'react';
import { loginRequest } from '@service/authService';
import { updateUserRequest } from '@service/userService';
import { LoginInput, UpdateUserInput } from '@validators/schemas';

interface UserData {
  name: string;
  initials: string;
}

const MOCK_USER: UserData = { name: 'Fabio Rodrigues', initials: 'FR' };

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [user, setUser] = useState<UserData | null>(MOCK_USER);
  const signOut = () => {
    // TODO: Implement real sign-out logic
  };

  const goToProfile = () => {
    // TODO: Implement navigation to profile page
  };

  const signIn = async ({ email, password }: LoginInput) => {
    try {
      setLoading(true);
      setError(undefined);

      await loginRequest(email, password);

      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async ({ firstName, lastName, newPassword }: UpdateUserInput) => {
    try {
      setLoading(true);
      setError(undefined);
      setSuccessMessage(undefined);
      await updateUserRequest({ firstName, lastName, password: newPassword || undefined });
      setSuccessMessage('Settings saved successfully.');
      return true;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { signIn, updateUser, loading, error, successMessage, goToProfile, signOut, user, setUser };
}
