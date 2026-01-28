
import React from 'react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAssistant: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onOpenCart, onOpenAssistant }) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/90 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-10 h-10 bg-amber-900 rounded-lg flex items-center justify-center text-white font-bold text-xl">F&H</div>
            <h1 className="text-2xl font-bold tracking-tight text-stone-900">Forge & Hide</h1>
          </div>
          
          <nav className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest text-stone-600">
            <a href="#" className="hover:text-amber-900 transition-colors">Shop All</a>
            <a href="#" className="hover:text-amber-900 transition-colors">Wallets</a>
            <a href="#" className="hover:text-amber-900 transition-colors">Bags</a>
            <a href="#" className="hover:text-amber-900 transition-colors">The Process</a>
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenAssistant}
              className="flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 rounded-full text-stone-700 transition-colors group"
            >
              <svg className="w-5 h-5 group-hover:text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="text-xs font-semibold uppercase tracking-tighter hidden sm:inline">Ask the Artisan</span>
            </button>
            
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-stone-700 hover:text-amber-900 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-amber-900 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-stone-50">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
