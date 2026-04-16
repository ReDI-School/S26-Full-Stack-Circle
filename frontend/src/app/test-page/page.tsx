import { UserCard } from '@/components/UserCard';

async function getUserData() {
  const response = await fetch('http://localhost:4000/users/1', { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Backend is not responding or endpoint not found');
  }
  return response.json();
}

export default async function Page() {
  try {
    const user = await getUserData();

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">User Profile</h1>
        <UserCard name={user.name} email={user.email} avatarUrl={user.avatarUrl} />
      </div>
    );
  } catch (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Error</h1>
        <p>{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
      </div>
    );
  }
}
