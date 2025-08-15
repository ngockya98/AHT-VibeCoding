import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function Reports() {
  const { data: sales, isLoading: loadingSales } = useQuery(['salesReport'], async () => {
    const res = await axios.get('/api/reports/sales');
    return res.data;
  });
  const { data: inventory, isLoading: loadingInventory } = useQuery(['inventoryReport'], async () => {
    const res = await axios.get('/api/reports/inventory');
    return res.data;
  });
  const { data: finance, isLoading: loadingFinance } = useQuery(['financeReport'], async () => {
    const res = await axios.get('/api/reports/finance');
    return res.data;
  });

  return (
    <main>
      <h1>Reports</h1>
      <section>
        <h2>Sales Report</h2>
        {loadingSales ? <div>Loading...</div> : <pre>{JSON.stringify(sales, null, 2)}</pre>}
      </section>
      <section>
        <h2>Inventory Report</h2>
        {loadingInventory ? <div>Loading...</div> : <pre>{JSON.stringify(inventory, null, 2)}</pre>}
      </section>
      <section>
        <h2>Finance Report</h2>
        {loadingFinance ? <div>Loading...</div> : <pre>{JSON.stringify(finance, null, 2)}</pre>}
      </section>
    </main>
  );
}
