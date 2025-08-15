import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function RepairOrderDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useQuery(['repairOrder', id], async () => {
    if (!id) return null;
    const res = await axios.get(`/api/repair-orders/${id}`);
    return res.data;
  });

  if (!id) return null;

  return (
    <main>
      <h1>Repair Order Detail</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : data ? (
        <div>
          <div>Status: {data.status}</div>
          <div>Total Price: {data.total_price}</div>
          <div>Discount: {data.discount}</div>
        </div>
      ) : (
        <div>Not found</div>
      )}
    </main>
  );
}
