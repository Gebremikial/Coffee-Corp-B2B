import StoreProvider from "./StoreProvider"; 
import Link from "next/link"; 
import ThemeToggle from "../components/ThemeToggle"; 
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className="bg-gray-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300"
        suppressHydrationWarning={true} // <--- Add this to stop extension errors
      >
        <StoreProvider>
          <div className="flex min-h-screen relative">
            
            {/* SIDEBAR */}
            <aside className="w-64 bg-slate-900 text-white fixed inset-y-0 left-0 z-50 flex flex-col shadow-2xl">
              <div className="p-6 text-xl font-bold border-b border-slate-800 flex items-center gap-2 flex-shrink-0">
                <span className="text-2xl">☕</span> CoffeeCorp
              </div>
              
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                <Link href="/" className="group flex items-center p-3 rounded-lg hover:bg-slate-800 transition-all">
                  <span className="mr-3">📊</span>
                  <span className="font-medium">Dashboard</span>
                </Link>
                <Link href="/inventory" className="group flex items-center p-3 rounded-lg hover:bg-slate-800 transition-all">
                  <span className="mr-3">📦</span>
                  <span className="font-medium">Inventory</span>
                </Link>
                <Link href="/orders" className="group flex items-center p-3 rounded-lg hover:bg-slate-800 transition-all">
                  <span className="mr-3">📜</span>
                  <span className="font-medium">Orders</span>
                </Link>
              </nav>

              <div className="p-4 border-t border-slate-800 bg-slate-900/50 flex-shrink-0">
                <ThemeToggle />
                <div className="mt-4 pt-4 border-t border-slate-800/50 text-[10px] text-slate-500 italic">
                  B2B v1.0.4 • © 2026
                </div>
              </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="ml-64 flex-1 flex flex-col min-w-0">
              <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center px-8 sticky top-0 z-40">
                 <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                   Warehouse Console <span className="mx-2 text-slate-300">/</span> <span className="text-blue-600">Overview</span>
                 </div>
              </header>
              <section className="p-8 w-full max-w-7xl mx-auto">
                {children}
              </section>
            </main>

          </div>
        </StoreProvider>
      </body>
    </html>
  );
}