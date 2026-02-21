'use client';

import { useState } from 'react'; // Added useState
import { useAppSelector, useAppDispatch } from '../../lib/hooks';
import { updateStock } from '../../lib/features/inventorySlice';

export default function InventoryPage() {
  const dispatch = useAppDispatch();
  const inventory = useAppSelector((state) => state.inventory.items);
  
  // Local state for the search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter logic: This runs every time the search box changes
  const filteredInventory = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Warehouse Inventory</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage stock levels for wholesale distribution.</p>
        </div>
        
        {/* SEARCH BAR */}
        <div className="relative w-full md:w-72">
          <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
          <input
            type="text"
            placeholder="Search beans or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
          />
        </div>
      </div>

      {/* INVENTORY TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">
            <tr>
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4 text-center">Stock</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredInventory.length > 0 ? (
              filteredInventory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-100">{item.name}</td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-400 text-sm">{item.category}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button onClick={() => dispatch(updateStock({ id: item.id, amount: -1 }))} className="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 dark:text-white hover:bg-red-50 dark:hover:bg-red-900/20">-</button>
                      <span className={`font-mono font-bold w-6 text-center ${item.stock < 10 ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>{item.stock}</span>
                      <button onClick={() => dispatch(updateStock({ id: item.id, amount: 1 }))} className="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 dark:text-white hover:bg-green-50 dark:hover:bg-green-900/20">+</button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium">Edit</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-slate-500 dark:text-slate-400 italic">
                  No products found matching &quot;{searchQuery}&quot;
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}