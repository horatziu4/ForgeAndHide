
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Wallets' | 'Bags' | 'Accessories' | 'Belts';
  imageUrl: string;
  color: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
