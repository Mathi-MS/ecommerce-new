import { Product } from './types';

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    originalPrice: 109.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    description: "Premium wireless headphones with noise cancellation and 30-hour battery life.",
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: "Running Shoes",
    price: 119.99,
    originalPrice: 159.99,
    category: "Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
    description: "Lightweight and breathable running shoes designed for maximum comfort.",
    rating: 4.3,
    reviews: 94
  },
  {
    id: 3,
    name: "Leather Backpack",
    price: 89.99,
    originalPrice: 119.99,
    category: "Bags",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    description: "Genuine leather backpack with multiple compartments and laptop sleeve.",
    rating: 4.7,
    reviews: 76
  },
  {
    id: 4,
    name: "Smart Watch",
    price: 199.99,
    originalPrice: 249.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    description: "Feature-packed smartwatch with health tracking and GPS.",
    rating: 4.6,
    reviews: 210
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 49.99,
    originalPrice: 69.99,
    category: "Accessories",
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    description: "UV400 polarized sunglasses with a classic aviator frame.",
    rating: 4.2,
    reviews: 55
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    price: 149.99,
    originalPrice: 199.99,
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    description: "Compact TKL mechanical keyboard with RGB backlighting.",
    rating: 4.8,
    reviews: 183
  },
  {
    id: 7,
    name: "Yoga Mat",
    price: 34.99,
    originalPrice: 44.99,
    category: "Sports",
    image: "https://images.unsplash.com/photo-1601925228008-f5e4c5e5e5e5?w=400&h=400&fit=crop",
    description: "Non-slip eco-friendly yoga mat with alignment lines.",
    rating: 4.4,
    reviews: 67
  },
  {
    id: 8,
    name: "Coffee Maker",
    price: 59.99,
    originalPrice: 79.99,
    category: "Home",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=400&fit=crop",
    description: "Programmable drip coffee maker with thermal carafe.",
    rating: 4.1,
    reviews: 49
  }
];

export default products;
