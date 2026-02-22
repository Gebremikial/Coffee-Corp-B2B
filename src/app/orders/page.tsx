'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { addOrder, cancelOrder, approveOrder } from '@/lib/features/orderSlice';
import OrderDetails from '@/components/OrderDetails';
import { generateInvoice } from '@/lib/generateInvoice';

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.orders);
  
  // Form State
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  // Panel State
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || !amount) return;
    setLoading(true);
    setTimeout(() => {
      dispatch(addOrder({ 
        clientName: client, 
        amount: Number(amount) 
      }));
      setClient(''); 
      setAmount(''); 
      setLoading(false);
    }, 500);
  };

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

      {/* ORDER HISTORY */}
      <div className="space-y-4">
        <h3 className="font-bold text-slate-500 uppercase text-xs tracking-widest px-2">Order History</h3>
        {orders.map(order => (
          <div key={order.id}>
            <div 
              onClick={() => handleRowClick(order)}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
            >
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
                    onClick={(e) => { e.stopPropagation(); generateInvoice(order); }} 
                    className="text-slate-500 hover:text-blue-600 font-bold text-sm transition-colors"
                  >
                    PDF
                  </button>
                  {order.status === 'Pending' && (
                    <button 
                      onClick={(e) => { e.stopPropagation(); dispatch(approveOrder(order.id)); }} 
                      className="text-green-600 font-bold text-sm hover:underline"
                    >
                      Approve
                    </button>
                  )}
                  <button 
                    onClick={(e) => { e.stopPropagation(); dispatch(cancelOrder(order.id)); }} 
                    className="text-red-400 font-bold text-sm hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            {/* HIDDEN INVOICE TEMPLATE */}
            <div id={`invoice-${order.id}`} style={{ display: 'none', position: 'absolute', left: '-9999px' }}>
              <div style={{ width: '800px', padding: '40px', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'sans-serif' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '50px' }}>
                  <div>
                    <h1 style={{ fontSize: '28px', margin: 0, color: '#2563eb' }}>COFFEE CORP B2B</h1>
                    <p style={{ color: '#64748b' }}>Warehouse & Distribution</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <h2 style={{ fontSize: '20px', margin: 0 }}>INVOICE</h2>
                    <p>ID: #{order.id}</p>
                    <p>{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e2e8f0' }}>
                      <th style={{ textAlign: 'left', padding: '12px 0' }}>Description</th>
                      <th style={{ textAlign: 'right', padding: '12px 0' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '20px 0' }}>Wholesale Coffee Supply</td>
                      <td style={{ textAlign: 'right', padding: '20px 0' }}>${order.amount.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>

      <OrderDetails 
        order={selectedOrder} 
        isOpen={isPanelOpen} 
        onClose={() => setIsPanelOpen(false)} 
      />
    </div>
  );
}