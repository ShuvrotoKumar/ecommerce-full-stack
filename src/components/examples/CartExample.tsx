'use client';

import { useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Trash2, Plus, Minus } from 'lucide-react';

export function CartExample() {
  const { items, totalQuantity, totalAmount, isLoading, error, addToCart, removeFromCart, clearCart } = useCart();

  const handleAddToCart = async () => {
    try {
      // Example product ID - you would get this from the product data
      await addToCart('507f1f77bcf86cd799439011', 1);
      toast.success('Item added to cart!');
    } catch (error) {
      toast.error('Failed to add item to cart');
    }
  };

  const handleRemoveFromCart = async (itemId: string) => {
    try {
      await removeFromCart(itemId);
      toast.success('Item removed from cart!');
    } catch (error) {
      toast.error('Failed to remove item from cart');
    }
  };

  const handleClearCart = async () => {
    try {
      await clearCart();
      toast.success('Cart cleared!');
    } catch (error) {
      toast.error('Failed to clear cart');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Shopping Cart Example
          <Badge variant="secondary">{totalQuantity} items</Badge>
        </CardTitle>
        <CardDescription>Test the Redux cart integration with backend API</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add to Cart Example */}
        <div className="flex items-center gap-4 p-4 border rounded-lg">
          <div className="flex-1">
            <h4 className="font-medium">Example Product</h4>
            <p className="text-sm text-muted-foreground">$29.99</p>
          </div>
          <Button onClick={handleAddToCart} disabled={isLoading}>
            Add to Cart
          </Button>
        </div>

        {/* Cart Items */}
        {items.length > 0 ? (
          <div className="space-y-4">
            <h3 className="font-medium">Cart Items</h3>
            {items.map((item) => (
              <div key={item._id} className="flex items-center gap-4 p-4 border rounded-lg">
                <img
                  src={item.product.images[0] || '/placeholder.jpg'}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h4 className="font-medium">{item.product.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    ${item.product.price} × {item.quantity}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveFromCart(item._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            {/* Cart Summary */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total Amount:</span>
                <span className="text-lg font-bold">${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handleClearCart} disabled={isLoading}>
                  Clear Cart
                </Button>
                <Button className="flex-1">Proceed to Checkout</Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Your cart is empty</p>
            <p className="text-sm text-muted-foreground mt-2">
              Add some items to see them here
            </p>
          </div>
        )}

        {error && (
          <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {isLoading && (
          <div className="text-center py-4">
            <p className="text-sm text-muted-foreground">Loading cart...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
