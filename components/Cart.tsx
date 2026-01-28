
import React from 'react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, q: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div 
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
      />
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="relative w-screen max-w-md">
          <div className="h-full flex flex-col bg-white shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-stone-100">
              <h2 className="text-2xl font-bold serif">Your Bag</h2>
              <button onClick={onClose} className="text-stone-400 hover:text-stone-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-stone-400">
                  <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <p className="text-lg font-medium">Your bag is empty</p>
                  <button onClick={onClose} className="mt-4 text-amber-900 font-bold uppercase text-xs tracking-widest hover:underline">Start Shopping</button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-sm bg-stone-100" />
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-bold text-stone-900">{item.name}</h4>
                        <span className="font-semibold">${item.price * item.quantity}</span>
                      </div>
                      <p className="text-xs text-stone-500 mb-2">{item.color}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-stone-200 rounded-sm">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="px-2 py-1 hover:bg-stone-50"
                          >-</button>
                          <span className="px-3 text-sm font-medium">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="px-2 py-1 hover:bg-stone-50"
                          >+</button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-xs font-semibold text-stone-400 hover:text-red-600 transition-colors"
                        >Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 bg-stone-50 border-t border-stone-200">
                <div className="flex justify-between text-lg font-bold text-stone-900 mb-1">
                  <span>Subtotal</span>
                  <span>${total}</span>
                </div>
                <p className="text-xs text-stone-500 mb-6 italic">Shipping and taxes calculated at checkout.</p>
                <button className="w-full py-4 bg-amber-950 text-white font-bold uppercase tracking-widest hover:bg-amber-900 transition-colors shadow-lg">
                  Secure Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
