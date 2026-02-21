'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../lib/hooks';
import { addOrder, cancelOrder, approveOrder } from '../../lib/features/orderSlice';

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.orders);
  
  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState<string>(''); // Added for completeness
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName) return;

    setIsSubmitting(true);

    setTimeout(() => {
      dispatch(addOrder({ 
        clientName: clientName,
        amount: Number(amount) || 0 
      }));

      setClientName('');
      setAmount('');
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="space-y-8">
      {/* HEADER SECTION */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">
          Purchase Orders
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Generate and track wholesale coffee shipments.
        </p>
      </div>

      {/* NEW ORDER FORM */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-blue-100 dark:border-slate-800 shadow-sm transition-colors">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-4">Create New PO</h2>
        <form onSubmit={handleCreateOrder} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Client / Cafe Name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            required
          />
          <input
            type="number"
            placeholder="Amount ($)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full md:w-32 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 transition-all"
          >
            {isSubmitting ? 'Processing...' : 'Generate Order'}
          </button>
        </form>
      </div>

      {/* ORDERS LIST */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">ID</th>
              <th className="px-6 py-4">Client</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4 text-center">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {orders.map((order) => (
              <tr key={order.id} className="text-sm hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-blue-600 dark:text-blue-400">#{order.id}</td>
                <td className="px-6 py-4 text-slate-700 dark:text-slate-200 font-medium">{order.clientName}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400">${order.amount.toFixed(2)}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase ${
                    order.status === 'Pending' 
                      ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' 
                      : 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  {order.status === 'Pending' && (
                    <button 
                      onClick={() => dispatch(approveOrder(order.id))}
                      className="text-green-600 hover:text-green-700 font-bold"
                    >
                      Approve
                    </button>
                  )}
                  <button 
                    onClick={() => dispatch(cancelOrder(order.id))}
                    className="text-red-500 hover:text-red-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}