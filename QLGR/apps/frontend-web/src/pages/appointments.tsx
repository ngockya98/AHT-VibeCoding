import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Appointments() {
  const { data, isLoading } = useQuery(['appointments'], async () => {
    const res = await axios.get('/api/appointments');
    return res.data;
  });

  return (
    <main>
      <h1>Appointments</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data?.map(app => (
            <li key={app.id}>
              {app.scheduled_at} - {app.status}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
