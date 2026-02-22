'use client';

import { useState } from 'react';
<<<<<<< HEAD
import { useAppSelector, useAppDispatch } from '../../lib/hooks';
import { addOrder, cancelOrder, approveOrder } from '../../lib/features/orderSlice';
import OrderDetails from '../../components/OrderDetails'; // Import the new component
=======
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { addOrder, cancelOrder, approveOrder } from '@/lib/features/orderSlice';
import { generateInvoice } from '@/lib/generateInvoice'; // Ensure this utility is created
>>>>>>> 4aa8012 (feat: finalize B2B dashboard with PDF invoices, analytics, and search)

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.orders);
<<<<<<< HEAD
  
  // Form State
  const [clientName, setClientName] = useState('');
  const [amount, setAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Panel State
  const [selectedOrder, setSelectedOrder] = useState<unknown | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

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
=======
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || !amount) return;
    setLoading(true);
    setTimeout(() => {
      dispatch(addOrder({ clientName: client, amount: Number(amount) }));
      setClient(''); 
      setAmount(''); 
      setLoading(false);
    }, 500);
>>>>>>> 4aa8012 (feat: finalize B2B dashboard with PDF invoices, analytics, and search)
  };

  // Helper to open the slide-over
  const handleRowClick = (order: unknown) => {
    setSelectedOrder(order);
    setIsPanelOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* CREATE ORDER FORM */}
      <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-blue-100 dark:border-slate-800 shadow-xl shadow-blue-500/5">
        <h2 className="text-xl font-bold mb-6 dark:text-white">Create Purchase Order</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input 
            value={client} 
            onChange={(e) => setClient(e.target.value)} 
            placeholder="Client Name" 
            className="p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
          <input 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            type="number" 
            placeholder="Total Amount ($)" 
            className="p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
          <button 
            disabled={loading} 
            className="bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Finalize PO'}
          </button>
        </form>
      </div>

<<<<<<< HEAD
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
              <tr 
                key={order.id} 
                onClick={() => handleRowClick(order)} // Click row to open panel
                className="text-sm hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
              >
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
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent opening panel when clicking button
                        dispatch(approveOrder(order.id));
                      }}
                      className="text-green-600 hover:text-green-700 font-bold"
=======
      {/* ORDER HISTORY */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-500 uppercase text-xs tracking-widest px-2">Order History</h3>
        {orders.map(order => (
          <div key={order.id}>
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono font-bold text-blue-600">#{order.id}</div>
                <div>
                  <p className="font-bold dark:text-white">{order.clientName}</p>
                  <p className="text-sm text-slate-500 font-medium">${order.amount.toFixed(2)}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                  order.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                }`}>
                  {order.status}
                </span>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => generateInvoice(order)} 
                    className="text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors"
                  >
                    PDF
                  </button>
                  {order.status === 'Pending' && (
                    <button 
                      onClick={() => dispatch(approveOrder(order.id))} 
                      className="text-green-600 font-bold text-sm hover:underline"
>>>>>>> 4aa8012 (feat: finalize B2B dashboard with PDF invoices, analytics, and search)
                    >
                      Approve
                    </button>
                  )}
                  <button 
<<<<<<< HEAD
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent opening panel when clicking button
                      dispatch(cancelOrder(order.id));
                    }}
                    className="text-red-500 hover:text-red-600 transition-colors"
=======
                    onClick={() => dispatch(cancelOrder(order.id))} 
                    className="text-red-400 font-bold text-sm hover:underline"
>>>>>>> 4aa8012 (feat: finalize B2B dashboard with PDF invoices, analytics, and search)
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            {/* HIDDEN INVOICE TEMPLATE FOR PDF GENERATION */}
           {/* Updated Hidden Invoice Template */}
<div 
  id={`invoice-${order.id}`} 
  style={{ display: 'none', position: 'absolute', left: '-9999px' }}
>
  {/* Force standard white background and black text to avoid CSS parsing errors */}
  <div style={{ width: '800px', padding: '40px', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'sans-serif' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
      <div>
        {/* Use HEX colors instead of Tailwind classes here */}
        <h1 style={{ fontSize: '28px', margin: 0, color: '#2563eb' }}>COFFEE CORP B2B</h1>
        <p style={{ color: '#64748b' }}>Warehouse & Distribution</p>
      </div>
      <div style={{ textAlign: 'right' }}>
        <h2 style={{ fontSize: '20px', margin: 0, color: '#000000' }}>INVOICE</h2>
        <p style={{ margin: 0, color: '#000000' }}>ID: #{order.id}</p>
        <p style={{ margin: 0, color: '#000000' }}>{new Date().toLocaleDateString()}</p>
      </div>
    </div>

    {/* ... rest of the template ... */}
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left' }}>
          <th style={{ padding: '12px 0', color: '#000000' }}>Description</th>
          <th style={{ padding: '12px 0', textAlign: 'right', color: '#000000' }}>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
          <td style={{ padding: '20px 0', color: '#000000' }}>Wholesale Coffee Supply</td>
          <td style={{ padding: '20px 0', textAlign: 'right', color: '#000000' }}>${order.amount.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
          </div>
        ))}
      </div>

      {/* THE SLIDE-OVER PANEL */}
      <OrderDetails 
        order={selectedOrder} 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />
    </div>
  );
}