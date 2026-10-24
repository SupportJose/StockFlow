import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Boxes,
  ClipboardCheck,
  LayoutDashboard,
  Package,
  Plus,
  Search,
  Settings,
  ShoppingCart,
  Truck,
  type LucideIcon,
} from 'lucide-react';
import './styles.css';

type Balance = {
  id: string;
  variantId: string;
  locationId: string;
  onHand: number;
  reserved: number;
};

const navItems: [LucideIcon, string][] = [
  [LayoutDashboard, 'Overview'],
  [Package, 'Products'],
  [Boxes, 'Inventory'],
  [ShoppingCart, 'Purchasing'],
  [Truck, 'Sales & dispatch'],
  [ClipboardCheck, 'Stock counts'],
  [BarChart3, 'Reports'],
];

function App() {
  const [balances, setBalances] = useState<Balance[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/v1/demo/balances')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Demo inventory request failed: ${response.status}`);
        }
        return response.json() as Promise<Balance[]>;
      })
      .then(setBalances)
      .catch((cause: Error) => setError(cause.message));
  }, []);

  const onHand = balances.reduce((sum, balance) => sum + Number(balance.onHand), 0);
  const reserved = balances.reduce((sum, balance) => sum + Number(balance.reserved), 0);

  return (
    <div className="shell">
      <aside>
        <div className="logo">
          <span><Boxes /></span>
          StockFlow
        </div>
        <small>OPERATIONS</small>
        {navItems.map(([Icon, label]) => (
          <button key={label} className={label === 'Overview' ? 'active' : ''}>
            <Icon size={19} />
            {label}
          </button>
        ))}
        <small>ADMINISTRATION</small>
        <button><Settings size={19} />Settings</button>
        <div className="user">
          <b>JS</b>
          <span>Joseph S.<small>Inventory manager</small></span>
        </div>
      </aside>

      <main>
        <header>
          <div>
            <h1>Inventory overview</h1>
            <p>Public demo data · read-only</p>
          </div>
          <div className="tools">
            <label>
              <Search size={18} />
              <input aria-label="Search" placeholder="Search products, orders…" />
            </label>
            <button className="primary" disabled title="Demo access is read-only">
              <Plus size={18} />
              New transaction
            </button>
          </div>
        </header>

        {error && (
          <div className="notice">
            <AlertTriangle size={18} />
            {error}
          </div>
        )}

        <section className="metrics">
          <Metric title="On-hand units" value={onHand.toLocaleString()} note="Physical sellable stock" />
          <Metric title="Reserved" value={reserved.toLocaleString()} note="Committed to orders" />
          <Metric title="Available" value={(onHand - reserved).toLocaleString()} note="On-hand minus reserved" />
          <Metric title="In transit" value="0" note="Between warehouses" />
        </section>

        <section className="grid">
          <div className="panel span">
            <div className="panelhead">
              <div>
                <h2>Stock position</h2>
                <p>Current quantities by product variant</p>
              </div>
              <button disabled title="Demo access is read-only">
                View inventory <ArrowUpRight size={15} />
              </button>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Variant</th>
                  <th>Location</th>
                  <th>On hand</th>
                  <th>Reserved</th>
                  <th>Available</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {balances.length ? balances.map((balance) => (
                  <tr key={balance.id}>
                    <td><b>{balance.variantId.slice(0, 8)}</b></td>
                    <td>{balance.locationId.slice(0, 8)}</td>
                    <td>{balance.onHand}</td>
                    <td>{balance.reserved}</td>
                    <td><b>{Number(balance.onHand) - Number(balance.reserved)}</b></td>
                    <td><span className="ok">In stock</span></td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={6} className="empty">No demo inventory is available.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="panel">
            <div className="panelhead">
              <div>
                <h2>Attention needed</h2>
                <p>Operational exceptions</p>
              </div>
            </div>
            <div className="alert">
              <span>!</span>
              <div><b>Low stock items</b><p>Reorder rules are checked by warehouse.</p></div>
              <strong>0</strong>
            </div>
            <div className="alert amber">
              <span>⌛</span>
              <div><b>Expiring soon</b><p>Lots expiring inside 30 days.</p></div>
              <strong>0</strong>
            </div>
            <div className="alert blue">
              <span>↔</span>
              <div><b>Transfers in transit</b><p>Awaiting destination receipt.</p></div>
              <strong>0</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function Metric({ title, value, note }: { title: string; value: string; note: string }) {
  return (
    <div className="metric">
      <p>{title}</p>
      <h2>{value}</h2>
      <small>{note}</small>
    </div>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
