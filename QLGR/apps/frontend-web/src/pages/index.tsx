import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <h1>Automotive Platform Frontend</h1>
      <nav>
        <ul>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link href="/marketplace">Marketplace</Link>
          </li>
          <li>
            <Link href="/inventory">Inventory</Link>
          </li>
          <li>
            <Link href="/appointments">Appointments</Link>
          </li>
          <li>
            <Link href="/repair-orders/1">Repair Order Detail</Link>
          </li>
          <li>
            <Link href="/invoices/1">Invoice Detail</Link>
          </li>
          <li>
            <Link href="/reports">Reports</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
