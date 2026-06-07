import { config } from '@config';
import { cookies } from 'next/headers';

const EventsPage = async () => {
  const cookieStore = await cookies();
  const { apiUrl } = await config();
  const token = cookieStore.get('token')?.value;

  const res = await fetch(`${apiUrl}/events`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    next: { tags: ['events'] },
  });

  const events = await res.json();

  console.log('API Response:', events);

  return (
    <div>
      <h1>Events Page</h1>
      <p>This is the events page. You can see all the events here.</p>
    </div>
  );
};

export default EventsPage;
