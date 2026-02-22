'use client';

import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { updateStock } from '@/lib/features/inventorySlice';

export default function InventoryPage() {
  const dispatch = useAppDispatch();
  const inventory = useAppSelector((state) => state.inventory.items);
  
  // Local state for the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter inventory based on search query
  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStockChange = (id: string, amount: number) => {
    dispatch(updateStock({ id, amount }));
  };

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">Warehouse Inventory</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage stock levels for wholesale distribution.</p>
        </div>
        <button className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all shadow-md">
          + Add New Product
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="relative max-w-sm">
        <input
          type="text"
          placeholder="Search products or categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-4 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 text-xs uppercase text-slate-500 dark:text-slate-400 font-bold">
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price/Unit</th>
              <th className="px-6 py-4 text-center">Current Stock</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredInventory.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-100">{item.name}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{item.category}</td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <button 
                      onClick={() => handleStockChange(item.id, -1)}
                      className="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:text-slate-400 transition"
                    >
                      -
                    </button>
                    <span className={`font-bold w-8 text-center ${item.stock < 10 ? 'text-red-600 dark:text-red-400' : 'text-slate-800 dark:text-slate-100'}`}>
                      {item.stock}
                    </span>
                    <button 
                      onClick={() => handleStockChange(item.id, 1)}
                      className="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-600 dark:text-slate-400 transition"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">Edit Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}