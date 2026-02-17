import { ProductCard } from './ProductCard';
import type { Product } from './types';
import { PLACEHOLDER_PRODUCTS } from './types';

interface ProductGridProps {
  products?: Product[];
  isComingSoon?: boolean;
}

/**
 * ProductGrid Component
 * Responsive grid layout for product cards.
 * 
 * When isComingSoon=true, displays placeholder skeleton cards.
 * 
 * TODO: Add filtering by category
 * TODO: Add sorting (price, name, popularity)
 * TODO: Add pagination or infinite scroll for large catalogs
 */
export function ProductGrid({ 
  products = [], 
  isComingSoon = true 
}: ProductGridProps) {
  
  // Use placeholder products when in "Coming Soon" state
  const displayProducts = isComingSoon 
    ? PLACEHOLDER_PRODUCTS.map((p, i) => ({ ...p, id: `placeholder-${i}` }))
    : products;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {displayProducts.map((product, index) => (
        <ProductCard
          key={product.id || index}
          product={product}
          isPlaceholder={isComingSoon}
          index={index}
        />
      ))}
    </div>
  );
}
