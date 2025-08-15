import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function InvoiceDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useQuery(['invoice', id], async () => {
    if (!id) return null;
    const res = await axios.get(`/api/invoices/${id}`);
    return res.data;
  });

  if (!id) return null;

  return (
    <main>
      <h1>Invoice Detail</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : data ? (
        <div>
          <div>Amount: {data.amount}</div>
          <div>Status: {data.status}</div>
          <div>Issued At: {data.issued_at}</div>
        </div>
      ) : (
        <div>Not found</div>
      )}
    </main>
  );
}
