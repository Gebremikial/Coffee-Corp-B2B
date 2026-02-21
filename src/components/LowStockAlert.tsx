'use client';
import { useAppSelector } from '@/lib/hooks';

export default function LowStockAlert() {
  const inventory = useAppSelector((state) => state.inventory.items);
  const lowStockItems = inventory.filter((item) => item.stock < 10);

  if (lowStockItems.length === 0) return null;

  return (
    <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-red-600 dark:text-red-400">⚠️</span>
        <h3 className="font-bold text-red-800 dark:text-red-300">Inventory Alerts</h3>
      </div>
      <ul className="space-y-2">
        {lowStockItems.map((item) => (
          <li key={item.id} className="flex justify-between text-sm">
            <span className="text-slate-700 dark:text-slate-300">{item.name}</span>
            <span className="font-bold text-red-600 dark:text-red-400">{item.stock} left</span>
          </li>
        ))}
      </ul>
    </div>
  );
}