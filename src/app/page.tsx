'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { addOrder, cancelOrder, approveOrder } from '@/lib/features/orderSlice';
import OrderDetails from '@/components/OrderDetails';
import { generateInvoice } from '@/lib/generateInvoice';

export default function OrdersPage() {
  const dispatch = useAppDispatch();
  const orders = useAppSelector((state) => state.orders.orders);
  
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!client || !amount) return;
    setLoading(true);
    setTimeout(() => {
      dispatch(addOrder({ clientName: client, amount: Number(amount) }));
      setClient(''); setAmount(''); setLoading(false);
    }, 500);
  };

  const handleRowClick = (order: any) => {
    setSelectedOrder(order);
    setIsPanelOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      {/* CREATION FORM */}
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
            placeholder="Amount ($)" 
            className="p-3 rounded-xl border dark:bg-slate-800 dark:border-slate-700 dark:text-white outline-none focus:ring-2 focus:ring-blue-500" 
            required 
          />
          <button disabled={loading} className="bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-all">
            {loading ? 'Creating...' : 'Finalize PO'}
          </button>
        </form>
      </div>

      {/* ORDERS LIST */}
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id}>
            <div 
              onClick={() => handleRowClick(order)}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4 shadow-sm hover:shadow-md cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl font-mono font-bold text-blue-600">#{order.id}</div>
                <div>
                  <p className="font-bold dark:text-white">{order.clientName}</p>
                  <p className="text-sm text-slate-500 font-medium">${order.amount.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button onClick={(e) => { e.stopPropagation(); generateInvoice(order); }} className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-xs font-bold hover:bg-blue-600 hover:text-white transition-all">PDF</button>
                {order.status === 'Pending' && <button onClick={(e) => { e.stopPropagation(); dispatch(approveOrder(order.id)); }} className="text-green-600 font-bold text-sm">Approve</button>}
                <button onClick={(e) => { e.stopPropagation(); dispatch(cancelOrder(order.id)); }} className="text-red-400 font-bold text-sm">Remove</button>
              </div>
            </div>

            {/* INVOICE TEMPLATE (Strict HEX colors) */}
            <div id={`invoice-${order.id}`} style={{ display: 'none', position: 'absolute', left: '-9999px' }}>
              <div style={{ width: '700px', padding: '50px', backgroundColor: '#ffffff', color: '#000000', fontFamily: 'sans-serif' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #000000', paddingBottom: '20px', marginBottom: '30px' }}>
                  <h1 style={{ fontSize: '28px', margin: 0 }}>COFFEE CORP</h1>
                  <div style={{ textAlign: 'right' }}>
                    <h2 style={{ fontSize: '18px', margin: 0 }}>INVOICE</h2>
                    <p style={{ margin: 0 }}>ID: {order.id}</p>
                  </div>
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <p style={{ fontWeight: 'bold', margin: '0 0 5px 0' }}>Bill To:</p>
                  <p style={{ fontSize: '20px', margin: 0 }}>{order.clientName}</p>
                </div>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tr style={{ backgroundColor: '#eeeeee' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Description</th>
                    <th style={{ padding: '10px', textAlign: 'right' }}>Total</th>
                  </tr>
                  <tr>
                    <td style={{ padding: '15px 10px', borderBottom: '1px solid #eeeeee' }}>Bulk Coffee Wholesale Supply</td>
                    <td style={{ padding: '15px 10px', borderBottom: '1px solid #eeeeee', textAlign: 'right' }}>${order.amount.toFixed(2)}</td>
                  </tr>
                </table>
                <div style={{ textAlign: 'right', marginTop: '30px' }}>
                  <p style={{ fontSize: '22px', fontWeight: 'bold' }}>Total: ${order.amount.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <OrderDetails order={selectedOrder} isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} />
    </div>
  );
}