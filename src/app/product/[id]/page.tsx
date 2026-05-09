'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  Star, 
  Heart, 
  ShoppingCart, 
  Share2, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Minus,
  Plus,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { useAddToCartMutation } from '@/services/cartApi';
import { useAddToWishlistMutation } from '@/services/wishlistApi';
import { useGetProductQuery, useAddReviewMutation } from '@/services/productApi';
import { toast } from 'sonner';

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading } = useGetProductQuery(id as string);
  const [addToCart] = useAddToCartMutation();
  const [addToWishlist] = useAddToWishlistMutation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product?.variants?.[0] || '');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="aspect-square bg-muted rounded-3xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 bg-muted rounded animate-pulse" />
            <div className="h-6 w-1/2 bg-muted rounded animate-pulse" />
            <div className="h-10 w-1/4 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="container mx-auto px-4 py-12">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      quantity: quantity,
    });
    toast.success(`${product.name} added to cart!`);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product._id);
    toast.success(`${product.name} added to wishlist!`);
  };

export default function ProductDetailsPage() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(mockProduct.variants[0]);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({
      id: mockProduct.id,
      name: mockProduct.name,
      price: mockProduct.price,
      quantity: quantity,
      image: mockProduct.images[0],
      variant: selectedVariant,
    }));
    toast.success(`${mockProduct.name} added to cart!`);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="aspect-square bg-muted rounded-3xl overflow-hidden relative"
          >
            <img 
              src={product.images?.[selectedImage]?.url || product.images?.[selectedImage] || 'https://via.placeholder.com/800'} 
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <Badge className="absolute top-6 left-6 px-4 py-1 bg-background/80 backdrop-blur-md text-foreground border-none">
              Free Shipping
            </Badge>
          </motion.div>
          <div className="grid grid-cols-3 gap-4">
            {(product.images || []).map((img: any, i: number) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                  selectedImage === i ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.url || img} alt={`View ${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-primary uppercase tracking-widest">{product.brand}</span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm text-muted-foreground">{product.category}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">{product.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? 'fill-current' : ''}`} />
                ))}
                <span className="ml-2 text-sm font-bold text-foreground">{product.rating || 0}</span>
              </div>
              <span className="text-sm text-muted-foreground">({product.reviews || 0} Reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold text-primary">${product.price}</span>
            {product.oldPrice && (
              <>
                <span className="text-xl text-muted-foreground line-through">${product.oldPrice}</span>
                <Badge variant="destructive" className="ml-2">Save ${(product.oldPrice - product.price).toFixed(0)}</Badge>
              </>
            )}
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>

          <Separator />

          {/* Selection */}
          <div className="space-y-6">
            {product.variants && product.variants.length > 0 && (
              <div className="space-y-3">
                <label className="text-sm font-bold uppercase tracking-wider">Select Variant</label>
                <div className="flex flex-wrap gap-3">
                  {product.variants.map((variant: string) => (
                    <Button
                      key={variant}
                      variant={selectedVariant === variant ? 'default' : 'outline'}
                      className="rounded-full px-6"
                      onClick={() => setSelectedVariant(variant)}
                    >
                      {variant}
                      {selectedVariant === variant && <Check className="ml-2 h-4 w-4" />}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-wider">Quantity</label>
              <div className="flex items-center gap-6">
                <div className="flex items-center border rounded-full overflow-hidden bg-muted/50 p-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-10 w-10"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm font-medium text-emerald-600">
                  {product.stock} items left in stock!
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button 
              className="flex-grow h-14 rounded-full text-lg font-bold shadow-xl shadow-primary/20"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
            </Button>
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-full" onClick={handleAddToWishlist}>
              <Heart className="h-6 w-6" />
            </Button>
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-full">
              <Share2 className="h-6 w-6" />
            </Button>
          </div>

          {/* Shipping Features */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30">
              <Truck className="h-5 w-5 text-primary" />
              <div className="text-xs">
                <p className="font-bold">Free Delivery</p>
                <p className="text-muted-foreground">Orders over $150</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30">
              <RotateCcw className="h-5 w-5 text-primary" />
              <div className="text-xs">
                <p className="font-bold">30-Day Returns</p>
                <p className="text-muted-foreground">Easy exchanges</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-muted/30">
              <ShieldCheck className="h-5 w-5 text-primary" />
              <div className="text-xs">
                <p className="font-bold">2-Year Warranty</p>
                <p className="text-muted-foreground">Quality guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="description" className="w-full">
        <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-12 gap-8">
          <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-bold">
            Description
          </TabsTrigger>
          <TabsTrigger value="specs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-bold">
            Specifications
          </TabsTrigger>
          <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent font-bold">
            Reviews ({product.reviews || 0})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="py-8 text-muted-foreground space-y-4">
          <p>{product.description}</p>
        </TabsContent>
        <TabsContent value="specs" className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            {(product.specs || []).map((spec: any) => (
              <div key={spec.label} className="flex justify-between p-3 border-b">
                <span className="font-medium text-muted-foreground">{spec.label}</span>
                <span className="font-bold">{spec.value}</span>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="py-8">
          <div className="space-y-8">
            <div className="flex items-center gap-4 p-6 bg-muted/30 rounded-3xl">
              <div className="text-center">
                <h3 className="text-5xl font-bold">{product.rating || 0}</h3>
                <div className="flex text-yellow-500 justify-center my-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < Math.floor(product.rating || 0) ? 'fill-current' : ''}`} />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">Product Rating</p>
              </div>
              <Separator orientation="vertical" className="h-20" />
              <div className="flex-grow space-y-2">
                {[5, 4, 3, 2, 1].map((s) => (
                  <div key={s} className="flex items-center gap-4">
                    <span className="text-sm font-bold w-4">{s}</span>
                    <div className="flex-grow h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-500 rounded-full" style={{ width: s === 5 ? '85%' : s === 4 ? '10%' : '5%' }} />
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{s === 5 ? '85%' : s === 4 ? '10%' : '5%'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
