import { useState } from 'react';
import { loginRequest } from '@service/authService';
import { LoginInput } from '@validators/schemas';

interface UserData {
  name: string;
  initials: string;
}

const MOCK_USER: UserData = { name: 'Fabio Rodrigues', initials: 'FR' };

export default function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const [user, setUser] = useState<UserData | null>(MOCK_USER);
  const signOut = () => {
    // TODO: Implement real sign-out logic
    //  Clear the token cookie (via an API call or by setting cookie to empty)
    //  Set user to null
    //  Redirect to /sign-in
  };

  const goToProfile = () => {
    // TODO: Implement navigation to profile page
  };

  const signIn = async (data: LoginInput) => {
    try {
      setLoading(true);
      setError(undefined);

      await loginRequest(data);

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
