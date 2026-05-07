'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useGetWishlistQuery, useAddToWishlistMutation, useRemoveFromWishlistMutation } from '@/services/wishlistApi';
import { useAddToCartMutation } from '@/services/cartApi';
import { toast } from 'sonner';

export default function WishlistPage() {
  const { data: items = [], isLoading } = useGetWishlistQuery();
  const [addToCart] = useAddToCartMutation();
  const [removeFromWishlist] = useRemoveFromWishlistMutation();

  const handleRemove = (productId: string, name: string) => {
    removeFromWishlist(productId);
    toast.error(`${name} removed from wishlist`);
  };

  const handleMoveToCart = (product: any) => {
    addToCart({ productId: product._id || product.productId, quantity: 1 });
    removeFromWishlist(product._id || product.productId);
    toast.success(`${product.name} moved to cart!`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="flex flex-col items-center max-w-md mx-auto space-y-6">
          <div className="p-6 bg-muted rounded-full animate-pulse">
            <Heart className="h-16 w-16 text-muted-foreground" />
          </div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="flex flex-col items-center max-w-md mx-auto space-y-6">
          <div className="p-6 bg-muted rounded-full">
            <Heart className="h-16 w-16 text-muted-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Your wishlist is empty</h1>
          <p className="text-muted-foreground">
            Save your favorite items here to keep track of them and buy them later.
          </p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link href="/shop">Explore Products</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Wishlist</h1>
          <p className="text-muted-foreground">You have {items.length} items saved in your wishlist.</p>
        </div>
        <Button variant="outline" className="rounded-full" onClick={() => {
          items.forEach(item => {
            addToCart({ productId: item._id || item.productId, quantity: 1 });
            removeFromWishlist(item._id || item.productId);
          });
          toast.success('All items moved to cart!');
        }}>
          Add All to Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item._id || item.productId}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="overflow-hidden group border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-square relative overflow-hidden bg-muted">
                  <img
                    src={item.product?.images?.[0]?.url || item.image || 'https://via.placeholder.com/400'}
                    alt={item.product?.name || item.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3">
                    <Button 
                      size="icon" 
                      variant="destructive" 
                      className="rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => handleRemove(item._id || item.productId, item.product?.name || item.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4 space-y-4">
                  <div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{item.product?.category || item.category}</span>
                    <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">{item.product?.name || item.name}</h3>
                    <p className="text-xl font-bold text-primary mt-1">${item.product?.price || item.price}</p>
                  </div>
                  <Button className="w-full rounded-full" onClick={() => handleMoveToCart(item)}>
                    <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
