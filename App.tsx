
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import ArtisanAssistant from './components/ArtisanAssistant';
import { Product, CartItem } from './types';
import { PRODUCTS } from './constants';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, q: number) => {
    setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: q } : i));
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-amber-200">
      <Header 
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAssistant={() => setIsAssistantOpen(true)}
      />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=2000" 
            alt="Leather workshop" 
            className="absolute inset-0 w-full h-full object-cover scale-105 animate-[subtle-zoom_20s_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-stone-900/50" />
          <div className="relative text-center px-4 max-w-4xl mx-auto">
            <span className="text-amber-200 text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Est. 2012 — Handcrafted Excellence</span>
            <h2 className="text-5xl md:text-7xl text-white font-bold serif mb-6 tracking-tight">Built to Last, Aged to Perfection</h2>
            <p className="text-stone-200 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              Every hide tells a story. Our master craftsmen ensure yours is one of resilience, sophistication, and timeless heritage.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })}
                className="px-8 py-4 bg-white text-stone-900 font-bold uppercase text-xs tracking-widest hover:bg-stone-100 transition-colors"
              >
                Shop Collection
              </button>
              <button 
                onClick={() => setIsAssistantOpen(true)}
                className="px-8 py-4 bg-transparent border border-white text-white font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition-colors"
              >
                Our Process
              </button>
            </div>
          </div>
        </section>

        {/* Featured Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-stone-900 serif mb-4">Artisan Collection</h2>
              <p className="text-stone-500 font-light">Meticulously curated selection of our finest full-grain leather pieces. Each item is hand-cut, hand-stitched, and finished with organic oils.</p>
            </div>
            <div className="flex gap-4">
              <button className="text-xs font-bold uppercase tracking-widest text-amber-900 border-b-2 border-amber-900 pb-1">All Pieces</button>
              <button className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-600 transition-colors pb-1">Best Sellers</button>
              <button className="text-xs font-bold uppercase tracking-widest text-stone-400 hover:text-stone-600 transition-colors pb-1">New Arrivals</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </section>

        {/* Brand Values */}
        <section className="bg-stone-100 py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <svg className="w-8 h-8 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-4 serif">Full-Grain Quality</h4>
                <p className="text-stone-500 text-sm leading-relaxed">We exclusively use the top layer of the hide—the strongest and most durable part—ensuring your piece lasts for generations.</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <svg className="w-8 h-8 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-4 serif">Ethically Sourced</h4>
                <p className="text-stone-500 text-sm leading-relaxed">Our leather is a byproduct of the meat industry, sourced from tanneries with Gold-standard environmental ratings.</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <svg className="w-8 h-8 text-amber-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold mb-4 serif">Lifetime Warranty</h4>
                <p className="text-stone-500 text-sm leading-relaxed">If a stitch fails or hardware breaks, we'll fix it. Forever. That's our commitment to quality craftsmanship.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI Engagement Banner */}
        <section className="relative py-24 leather-gradient overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <svg viewBox="0 0 100 100" className="w-full h-full text-white fill-current">
                <path d="M50,0 Q70,25 50,50 Q30,75 50,100 Q80,75 100,50 Q80,25 50,0 Z" />
            </svg>
          </div>
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h3 className="text-4xl font-bold serif mb-6">Need a personalized recommendation?</h3>
            <p className="text-stone-300 mb-10 text-lg">Our Master Artisan AI is available to help you choose the right piece for your lifestyle or explain how to care for your new leather goods.</p>
            <button 
              onClick={() => setIsAssistantOpen(true)}
              className="px-10 py-4 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold uppercase text-xs tracking-[0.2em] transition-all transform hover:scale-105 shadow-xl"
            >
              Start Consultation
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-stone-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-amber-900 rounded-lg flex items-center justify-center text-white font-bold text-lg">F&H</div>
              <span className="text-xl font-bold tracking-tight">Forge & Hide</span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed mb-6">Premium artisanal leather goods designed for a lifetime of exploration and everyday utility.</p>
            <div className="flex gap-4">
                {/* Social icons would go here */}
            </div>
          </div>
          
          <div>
            <h5 className="font-bold uppercase text-xs tracking-widest mb-6">Shop</h5>
            <ul className="space-y-4 text-sm text-stone-400">
              <li><a href="#" className="hover:text-white transition-colors">Wallets & Cardholders</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Bags & Briefcases</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Belts & Wearables</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accessories</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold uppercase text-xs tracking-widest mb-6">Support</h5>
            <ul className="space-y-4 text-sm text-stone-400">
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Leather Care Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Warranty Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold uppercase text-xs tracking-widest mb-6">Join the Guild</h5>
            <p className="text-sm text-stone-400 mb-4">Get first access to limited releases and workshop updates.</p>
            <form className="flex">
              <input type="email" placeholder="Email address" className="bg-stone-800 border-none px-4 py-2 text-sm w-full focus:ring-1 focus:ring-amber-900" />
              <button className="bg-amber-900 px-4 py-2 text-xs font-bold uppercase tracking-widest">Join</button>
            </form>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-8 border-t border-stone-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone-500">© 2024 Forge & Hide Leathercraft. All rights reserved.</p>
          <div className="flex gap-6 text-xs text-stone-500">
            <a href="#" className="hover:text-stone-300">Privacy Policy</a>
            <a href="#" className="hover:text-stone-300">Terms of Service</a>
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        onRemove={removeFromCart} 
        onUpdateQuantity={updateQuantity}
      />
      
      <ArtisanAssistant 
        isOpen={isAssistantOpen} 
        onClose={() => setIsAssistantOpen(false)} 
      />

      <style>{`
        @keyframes subtle-zoom {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default App;
