export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  image: string;
  description: string;
  rating?: number;
  reviews?: number;
}

export interface CartItem extends Product {
  qty: number;
}
