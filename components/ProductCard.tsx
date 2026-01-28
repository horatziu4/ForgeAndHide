
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (p: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group flex flex-col h-full bg-white border border-stone-100 rounded-sm overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4">
          <span className="px-2 py-1 bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest text-stone-700">
            {product.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-stone-900 leading-tight group-hover:text-amber-900 transition-colors">
            {product.name}
          </h3>
          <span className="text-lg font-semibold text-amber-950">${product.price}</span>
        </div>
        
        <p className="text-stone-500 text-sm mb-6 flex-grow line-clamp-2 italic font-light">
          {product.description}
        </p>
        
        <button 
          onClick={() => onAddToCart(product)}
          className="w-full py-3 bg-stone-900 hover:bg-amber-950 text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
