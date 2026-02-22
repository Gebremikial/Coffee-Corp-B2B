'use client';

import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';

export default function Dashboard() {
  const orders = useAppSelector((state) => state.orders.orders);
  const inventory = useAppSelector((state) => state.inventory.items);

  const totalRevenue = orders.reduce((acc, order) => acc + order.amount, 0);
  const lowStockCount = inventory.filter(item => item.stock < 10).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Business Overview</h1>
        <p className="text-slate-500 dark:text-slate-400">Coffee Corp B2B Wholesale Management</p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Revenue</p>
          <p className="text-2xl font-bold text-blue-600">${totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Active Orders</p>
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{orders.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <p className="text-sm font-medium text-slate-500">Low Stock Alerts</p>
          <p className="text-2xl font-bold text-red-500">{lowStockCount}</p>
        </div>
      </div>

      {/* RECENT ACTIVITY TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <h2 className="font-bold text-slate-800 dark:text-white">Recent Purchase Orders</h2>
          <Link href="/orders" className="text-sm text-blue-600 hover:underline">View All</Link>
        </div>
        
        <table className="w-full text-left border-collapse">
          {/* THEAD WRAPPER ADDED HERE */}
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-xs uppercase text-slate-500 font-bold">
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Amount</th>
            </tr>
          </thead>
          {/* TBODY WRAPPER ADDED HERE */}
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {orders.slice(0, 5).map((order) => (
              <tr key={order.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-medium dark:text-slate-200">{order.clientName}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
                    order.status === 'Approved' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right font-mono font-bold dark:text-slate-300">
                  ${order.amount.toFixed(2)}
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-slate-400 font-medium">
                  No recent orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}