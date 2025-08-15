import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Marketplace() {
  const { data, isLoading } = useQuery(['products'], async () => {
    const res = await axios.get('/api/products/search');
    return res.data.items;
  });

  return (
    <main>
      <h1>Marketplace</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {data?.map(product => (
            <li key={product.id}>
              {product.name} - {product.price}₫
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
