import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Inventory() {
  const { data, isLoading } = useQuery(['inventory'], async () => {
    const res = await axios.get('/api/inventory');
    return res.data;
  });

  return (
    <main>
      <h1>Inventory</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data?.map(item => (
            <li key={item.id}>
              {item.product_id} - {item.quantity}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
