import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginRequest } from '@service/authService';
import { LoginInput } from '@validators/schemas';

interface UserData {
  name: string;
  initials: string;
}

const MOCK_USER: UserData = { name: 'Fabio Rodrigues', initials: 'FR' };

export default function useAuth() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [user, setUser] = useState<UserData | null>(MOCK_USER);
  const signOut = () => {
    // TODO: Implement real sign-out logic
  };

  const goToProfile = () => router.push('/profile');

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

  return { signIn, loading, error, goToProfile, signOut, user, setUser };
}
