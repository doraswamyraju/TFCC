import { motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import type { Product } from './types';

interface ProductCardProps {
  product?: Partial<Product>;
  isPlaceholder?: boolean;
  index?: number;
}

/**
 * ProductCard Component
 * Displays a product with image, name, price, and add-to-cart button.
 * 
 * When isPlaceholder=true, renders a skeleton/blurred state for "Coming Soon"
 * 
 * TODO: Implement add-to-cart functionality with Firebase
 * TODO: Add product variant selection (size, color)
 * TODO: Add quick-view modal
 */
export function ProductCard({ 
  product, 
  isPlaceholder = false,
  index = 0 
}: ProductCardProps) {
  
  // TODO: Implement cart context/state management
  // const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    // TODO: Implement when shop goes live
    // if (product && !isPlaceholder) {
    //   addToCart(product);
    // }
    console.log('Add to cart - Coming Soon');
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={!isPlaceholder ? { y: -8, scale: 1.02 } : {}}
      className={`
        group relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] 
        rounded-xl overflow-hidden border-2 transition-all duration-300
        ${isPlaceholder 
          ? 'border-[#2a2a2a] cursor-not-allowed opacity-70' 
          : 'border-[#2a2a2a] hover:border-[#d4af37] cursor-pointer'
        }
      `}
    >
      {/* Coming Soon Badge */}
      {isPlaceholder && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-[#c41e3a] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Soon
          </span>
        </div>
      )}

      {/* Product Image / Placeholder */}
      <div className="relative aspect-square overflow-hidden bg-[#1a1a1a]">
        {isPlaceholder ? (
          // Skeleton placeholder with blur effect
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] animate-pulse" />
            <ShoppingBag className="absolute w-16 h-16 text-[#3a3a3a]" />
          </div>
        ) : (
          <img
            src={product?.image || ''}
            alt={product?.name || 'Product'}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        {isPlaceholder ? (
          <div className="space-y-2">
            <div className="h-5 bg-[#2a2a2a] rounded animate-pulse w-3/4" />
            <div className="h-4 bg-[#2a2a2a] rounded animate-pulse w-1/2" />
          </div>
        ) : (
          <>
            <h4 className="text-white font-bold text-lg group-hover:text-[#d4af37] transition-colors">
              {product?.name}
            </h4>
            <p className="text-[#808080] text-sm line-clamp-2">
              {product?.description}
            </p>
          </>
        )}

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2">
          {isPlaceholder ? (
            <>
              <div className="h-6 bg-[#2a2a2a] rounded animate-pulse w-20" />
              <div className="h-10 bg-[#2a2a2a] rounded animate-pulse w-24" />
            </>
          ) : (
            <>
              <span className="text-[#d4af37] font-bold text-xl">
                {formatPrice(product?.price || 0, product?.currency || 'INR')}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                disabled={isPlaceholder || !product?.inStock}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm
                  transition-all duration-300
                  ${product?.inStock 
                    ? 'bg-[#c41e3a] hover:bg-[#d4af37] hover:text-black text-white' 
                    : 'bg-[#2a2a2a] text-[#606060] cursor-not-allowed'
                  }
                `}
              >
                <ShoppingBag className="w-4 h-4" />
                {product?.inStock ? 'Add' : 'Soon'}
              </motion.button>
            </>
          )}
        </div>
      </div>

      {/* Disabled overlay for placeholders */}
      {isPlaceholder && (
        <div className="absolute inset-0 bg-black/20 pointer-events-none" />
      )}
    </motion.div>
  );
}
