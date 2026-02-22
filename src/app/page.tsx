'use client';

import { useAppSelector } from '@/lib/hooks';
import LowStockAlert from '@/components/LowStockAlert';

export default function Home() {
  const orders = useAppSelector((state) => state.orders.orders);
  const inventory = useAppSelector((state) => state.inventory.items);

  const pendingOrders = orders.filter(o => o.status === 'Pending').length;
  const lowStockCount = inventory.filter(i => i.stock < 10).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Morning, Admin</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">CoffeeCorp warehouse overview.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-8">
          {/* STATS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Pending Orders" value={pendingOrders} color="text-orange-600" />
            <StatCard title="Inventory Alerts" value={lowStockCount} color="text-red-600" />
            <StatCard title="Total SKU" value={inventory.length} color="text-blue-600" />
          </div>

          {/* ANALYTICS CHART */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold text-slate-800 dark:text-slate-100">Weekly Revenue</h3>
              <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded">+12%</span>
            </div>
            <div className="flex items-end justify-between h-32 gap-3 px-2">
              {[35, 50, 40, 90, 65, 45, 80].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-full bg-blue-500/10 dark:bg-blue-500/5 border-t-2 border-blue-500 rounded-t-sm transition-all group-hover:bg-blue-500/30" style={{ height: `${h}%` }} />
                  <span className="text-[10px] text-slate-400 font-bold">{['M','T','W','T','F','S','S'][i]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RECENT ACTIVITY */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
             <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-800 dark:text-slate-100">Recent Orders</h3>
             </div>
             <table className="w-full text-left">
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                   {orders.slice(0, 4).map(order => (
                      <tr key={order.id} className="text-sm hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                         <td className="px-6 py-4 font-mono font-bold text-blue-600">#{order.id}</td>
                         <td className="px-6 py-4 dark:text-slate-300">{order.clientName}</td>
                         <td className="px-6 py-4 text-right">
                            <span className="px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-bold dark:text-slate-400">{order.status}</span>
                         </td>
                      </tr>
                   ))}
                </tbody>
             </table>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className="w-full lg:w-80 space-y-6">
          <LowStockAlert />
          <div className="bg-blue-600 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20">
             <h4 className="font-bold mb-2">Pro Tip</h4>
             <p className="text-sm text-blue-100 opacity-90 leading-relaxed">Check pending orders daily to maintain a 24-hour shipping turnaround.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }: { title: string; value: number | string; color: string }) {
  return (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</p>
      <p className={`text-4xl font-black mt-2 ${color}`}>{value}</p>
    </div>
  );
}