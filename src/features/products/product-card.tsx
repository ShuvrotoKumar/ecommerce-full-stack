'use client';

import Link from 'next/link';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/features/cart/cartSlice';
import { toast } from 'sonner';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    rating: number;
    image: string;
    category: string;
    isNew?: boolean;
    discount?: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    }));
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/product/${product.id}`}>
        <Card className="overflow-hidden group border-none shadow-md hover:shadow-xl transition-all duration-300">
          <div className="aspect-[4/5] relative overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {product.isNew && (
                <Badge className="bg-emerald-500 hover:bg-emerald-600 border-none">New</Badge>
              )}
              {product.discount && (
                <Badge variant="destructive">-{product.discount}%</Badge>
              )}
            </div>

            {/* Actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
              <Button size="icon" variant="secondary" className="rounded-full shadow-md hover:bg-primary hover:text-primary-foreground">
                <Heart className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" className="rounded-full shadow-md hover:bg-primary hover:text-primary-foreground">
                <Eye className="h-4 w-4" />
              </Button>
            </div>

            {/* Quick Add */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <Button className="w-full shadow-xl" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </div>
          </div>
          
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{product.category}</span>
              <div className="flex items-center text-yellow-500">
                <Star className="h-3 w-3 fill-current" />
                <span className="text-xs font-bold ml-1 text-foreground">{product.rating}</span>
              </div>
            </div>
            <h3 className="font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-primary">${product.price}</span>
              {product.oldPrice && (
                <span className="text-sm text-muted-foreground line-through">${product.oldPrice}</span>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
