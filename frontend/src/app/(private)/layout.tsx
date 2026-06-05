import { cookies } from 'next/headers';
import { decodeJwt } from 'jose';
import { ProtectedLayout } from '@components';
import { AuthProvider, AuthUser } from '@context/AuthContext';
import { getUserById } from '@service/userService';

const PrivateLayout = async ({ children }: { children: React.ReactNode }) => {
  let authUser: AuthUser | null = null;

  try {
    const token = (await cookies()).get('token')?.value;
    if (!token) throw new Error('No token found');

    const { userId, role } = decodeJwt<{ userId: string; role: 'USER' | 'ADMIN' }>(token);

    const user = await getUserById(userId, token);
    if (!user) throw new Error('Smth went wrong fetching user data');

    authUser = { ...user, role };
  } catch (err) {
    console.error(err); // server-side only — logs to Node.js stdout, not the browser
  }

  return (
    <AuthProvider initialUser={authUser}>
      <ProtectedLayout>{children}</ProtectedLayout>
    </AuthProvider>
  );
};

export default PrivateLayout;
