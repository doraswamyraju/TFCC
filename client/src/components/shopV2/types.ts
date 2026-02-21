/**
 * Shop Types
 * Type definitions for shop components
 * TODO: Extend these types when integrating with Firebase/backend
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  category: ProductCategory;
  inStock: boolean;
  // TODO: Add variants (size, color) when shop goes live
  // variants?: ProductVariant[];
}

export type ProductCategory = 
  | 'apparel'
  | 'equipment'
  | 'accessories'
  | 'supplements';

export interface CartItem {
  product: Product;
  quantity: number;
  // TODO: Add selected variant when implementing
  // selectedVariant?: ProductVariant;
}

// Placeholder products for Coming Soon state
export const PLACEHOLDER_PRODUCTS: Omit<Product, 'id'>[] = [
  {
    name: 'Championship T-Shirt',
    description: 'Official FCC training tee',
    price: 1499,
    currency: 'INR',
    image: '',
    category: 'apparel',
    inStock: false,
  },
  {
    name: 'Strongman Hoodie',
    description: 'Premium heavyweight hoodie',
    price: 2999,
    currency: 'INR',
    image: '',
    category: 'apparel',
    inStock: false,
  },
  {
    name: 'Training Straps',
    description: 'Competition-grade lifting straps',
    price: 799,
    currency: 'INR',
    image: '',
    category: 'equipment',
    inStock: false,
  },
  {
    name: 'Chalk Bag',
    description: 'Refillable grip chalk bag',
    price: 499,
    currency: 'INR',
    image: '',
    category: 'accessories',
    inStock: false,
  },
  {
    name: 'FCC Cap',
    description: 'Embroidered snapback cap',
    price: 899,
    currency: 'INR',
    image: '',
    category: 'apparel',
    inStock: false,
  },
  {
    name: 'Lifting Belt',
    description: 'Competition-approved belt',
    price: 3499,
    currency: 'INR',
    image: '',
    category: 'equipment',
    inStock: false,
  },
];
