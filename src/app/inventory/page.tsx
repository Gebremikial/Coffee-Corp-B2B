'use client';

<<<<<<< HEAD
import { useState } from 'react'; // Added useState
import { useAppSelector, useAppDispatch } from '../../lib/hooks';
import { updateStock } from '../../lib/features/inventorySlice';
=======
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { updateStock } from '@/lib/features/inventorySlice';
>>>>>>> 4aa8012 (feat: finalize B2B dashboard with PDF invoices, analytics, and search)

export default function InventoryPage() {
  const dispatch = useAppDispatch();
  const inventory = useAppSelector((state) => state.inventory.items);
<<<<<<< HEAD
  
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
=======
  const [search, setSearch] = useState('');

  const filteredItems = inventory.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) || 
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Inventory Control</h1>
          <p className="text-slate-500 dark:text-slate-400">Live warehouse stock tracking.</p>
        </div>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-4 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-800/50 text-xs font-bold text-slate-400 uppercase">
            <tr>
              <th className="px-6 py-4 text-center w-16">Stock</th>
              <th className="px-6 py-4">Product Details</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4 text-right">Adjust</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                <td className="px-6 py-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${item.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-slate-100 dark:bg-slate-800 dark:text-white'}`}>
                    {item.stock}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-800 dark:text-slate-100">{item.name}</p>
                  <p className="text-xs text-slate-500">{item.category}</p>
                </td>
                <td className="px-6 py-4 text-slate-600 dark:text-slate-400 font-medium">${item.price.toFixed(2)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => dispatch(updateStock({ id: item.id, amount: -1 }))} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-red-500 transition-colors">➖</button>
                    <button onClick={() => dispatch(updateStock({ id: item.id, amount: 1 }))} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-green-500 transition-colors">➕</button>
                  </div>
>>>>>>> 4aa8012 (feat: finalize B2B dashboard with PDF invoices, analytics, and search)
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}