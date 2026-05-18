'use client';

import React from 'react';
import Link from 'next/link';
import { CartItem } from '@/types/cart';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Truck, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useCart } from '@/hooks/useCart';

export default function CartPage() {
  const { 
    items, 
    totalQuantity, 
    totalAmount, 
    isLoading, 
    error,
    addToCart,
    removeFromCart,
    clearCart
  } = useCart();
  
  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    addToCart(productId, newQuantity);
  };

  const handleRemoveItem = (productId: string, name: string) => {
    removeFromCart(productId);
    toast.error(`${name} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.success('Cart cleared');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart ({totalQuantity} items)</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {items.map((item: CartItem) => (
              <motion.div
                key={item.productId || item._id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col sm:flex-row gap-6 p-4 bg-card border rounded-2xl"
              >
                <div className="w-full sm:w-32 h-32 shrink-0 bg-muted rounded-xl overflow-hidden">
                  <img
                    src={item.product?.images?.[0]?.url || item.image || ''}
                    alt={item.product?.name || item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow flex flex-col justify-between py-1">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-bold text-lg hover:text-primary transition-colors">
                        <Link href={`/product/${item.productId || item._id}`}>{item.product?.name || item.name}</Link>
                      </h3>
                    </div>
                    <p className="font-bold text-lg">${item.product?.price || item.price}</p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border rounded-lg overflow-hidden h-10 bg-muted/50">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-full rounded-none hover:bg-muted"
                        onClick={() => handleUpdateQuantity(item.productId || item._id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-12 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-full rounded-none hover:bg-muted"
                        onClick={() => handleUpdateQuantity(item.productId || item._id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      onClick={() => handleRemoveItem(item.productId || item._id, item.product?.name || item.name)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Shipping Info Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-muted/30 border-none">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Truck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Free Express Shipping</h4>
                  <p className="text-xs text-muted-foreground">On orders over $150</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/30 border-none">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <ShieldCheck className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Secure Checkout</h4>
                  <p className="text-xs text-muted-foreground">Protected by Stripe</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-6">
          <Card className="shadow-lg border-none">
            <CardContent className="p-6 space-y-6">
              <h2 className="text-xl font-bold">Order Summary</h2>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${typeof totalAmount === 'number' ? totalAmount.toFixed(2) : totalAmount || '0.00'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-emerald-500 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">${typeof totalAmount === 'number' ? totalAmount.toFixed(2) : totalAmount || '0.00'}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Promo Code</label>
                  <div className="flex gap-2">
                    <Input placeholder="Enter code" className="h-10 rounded-lg" />
                    <Button variant="secondary" className="h-10 px-4">Apply</Button>
                  </div>
                </div>
                <Button className="w-full h-12 rounded-full font-bold text-lg shadow-lg" render={<Link href="/checkout">Proceed to Checkout <ArrowRight className="ml-2 h-5 w-5" /></Link>} />
              </div>
            </CardContent>
          </Card>

          <p className="text-xs text-muted-foreground text-center">
            By proceeding to checkout, you agree to our <Link href="/terms" className="underline">Terms of Service</Link> and <Link href="/privacy" className="underline">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </div>
  );
}
