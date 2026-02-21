'use client';

import { useAppSelector } from '@/lib/hooks';
import LowStockAlert from '@/components/LowStockAlert'; // Import our new component

export default function Home() {
  const orders = useAppSelector((state) => state.orders.orders);
  const inventory = useAppSelector((state) => state.inventory.items);

  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const lowStockItems = inventory.filter(i => i.stock < 10).length;

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Morning, Admin</h1>
        <p className="text-slate-500 dark:text-slate-400">Here is what is happening with CoffeeCorp today.</p>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* LEFT COLUMN: Stats & Table */}
        <div className="flex-1 space-y-8">
          
          {/* STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Pending Orders</p>
              <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-1">{pendingOrders}</p>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Inventory Alerts</p>
              <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-1">{lowStockItems}</p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Products</p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{inventory.length}</p>
            </div>
          </div>

          {/* RECENT ACTIVITY TABLE */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Recent Purchase Orders</h3>
            </div>
            <table className="w-full text-left">
              <thead className="text-xs text-slate-400 dark:text-slate-500 uppercase bg-slate-50/30 dark:bg-slate-800/10">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Client</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {orders.slice(0, 5).map((order) => (
                  <tr key={order.id} className="text-sm hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">#{order.id}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{order.clientName}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 text-xs font-bold">
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT COLUMN: Sidebar Alerts */}
        <div className="w-full lg:w-80">
          <LowStockAlert />
        </div>

      </div>
    </div>
  );
}