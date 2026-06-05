import { useState } from 'react';
import { useAuthContext } from '@context/AuthContext';
import { loginRequest } from '@service/authService';
import { LoginInput } from '@validators/schemas';
import { useRouter } from 'next/navigation';

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { authUser } = useAuthContext();
  const router = useRouter();

  const signOut = () => {
    // TODO: clear cookie, then setAuthUser(null) + redirect
  };

  const goToProfile = () => {
    if (authUser) router.push(`/profiles/${authUser.id}`); // update route when profile page is implemented
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

  return { signIn, loading, error, goToProfile, signOut };
}
