'use client';

export default function OrderDetails({ order, isOpen, onClose }: { order: any | null, isOpen: boolean, onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* BACKDROP */}
      <div 
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />

      {/* PANEL */}
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 shadow-2xl p-8 border-l border-slate-200 dark:border-slate-800 h-full transform transition-transform duration-300">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Order Details</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-2xl">
            ✕
          </button>
        </div>

        {order ? (
          <div className="space-y-6">
            <div className="pb-6 border-b border-slate-100 dark:border-slate-800">
              <p className="text-xs font-bold text-slate-400 uppercase">Client</p>
              <p className="text-lg font-semibold text-slate-800 dark:text-slate-100">{order.clientName}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Order ID</p>
                <p className="font-mono text-blue-600">#{order.id}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Status</p>
                <span className="inline-block px-2 py-1 rounded-full text-[10px] font-black uppercase bg-orange-100 text-orange-600 dark:bg-orange-900/30">
                  {order.status}
                </span>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 right-8">
              <button className="w-full bg-slate-900 dark:bg-white dark:text-slate-900 text-white py-3 rounded-xl font-bold hover:opacity-90 transition">
                Print Invoice
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}