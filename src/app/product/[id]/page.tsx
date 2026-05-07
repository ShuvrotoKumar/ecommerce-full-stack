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
import { useDispatch } from 'react-redux';
import { addToCart } from '@/features/cart/cartSlice';
import { toast } from 'sonner';

// Mock product data
const mockProduct = {
  id: '1',
  name: 'Premium Wireless Noise Cancelling Headphones',
  price: 299,
  oldPrice: 350,
  rating: 4.8,
  reviews: 128,
  description: 'Experience world-class noise cancellation and premium sound quality with the ShopSwift Wireless Headphones. Designed for comfort and built for performance, these headphones deliver up to 30 hours of battery life and crystal-clear calls.',
  category: 'Electronics',
  brand: 'SwiftAudio',
  stock: 15,
  images: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1546435770-a3e426da473b?q=80&w=800&h=800&fit=crop',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?q=80&w=800&h=800&fit=crop',
  ],
  variants: ['Silver', 'Midnight Black', 'Rose Gold'],
  specs: [
    { label: 'Battery Life', value: 'Up to 30 hours' },
    { label: 'Bluetooth', value: 'v5.2' },
    { label: 'Weight', value: '250g' },
    { label: 'Warranty', value: '2 Years' },
  ]
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
              src={mockProduct.images[selectedImage]} 
              alt={mockProduct.name}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
            <Badge className="absolute top-6 left-6 px-4 py-1 bg-background/80 backdrop-blur-md text-foreground border-none">
              Free Shipping
            </Badge>
          </motion.div>
          <div className="grid grid-cols-3 gap-4">
            {mockProduct.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setSelectedImage(i)}
                className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                  selectedImage === i ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`View ${i}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-primary uppercase tracking-widest">{mockProduct.brand}</span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm text-muted-foreground">{mockProduct.category}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">{mockProduct.name}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center text-yellow-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.floor(mockProduct.rating) ? 'fill-current' : ''}`} />
                ))}
                <span className="ml-2 text-sm font-bold text-foreground">{mockProduct.rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">({mockProduct.reviews} Reviews)</span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-bold text-primary">${mockProduct.price}</span>
            <span className="text-xl text-muted-foreground line-through">${mockProduct.oldPrice}</span>
            <Badge variant="destructive" className="ml-2">Save ${(mockProduct.oldPrice - mockProduct.price).toFixed(0)}</Badge>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {mockProduct.description}
          </p>

          <Separator />

          {/* Selection */}
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-sm font-bold uppercase tracking-wider">Select Color</label>
              <div className="flex flex-wrap gap-3">
                {mockProduct.variants.map((variant) => (
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
                  {mockProduct.stock} items left in stock!
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
            <Button variant="outline" size="icon" className="h-14 w-14 rounded-full">
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
            Reviews ({mockProduct.reviews})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="py-8 text-muted-foreground space-y-4">
          <p>{mockProduct.description}</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        </TabsContent>
        <TabsContent value="specs" className="py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            {mockProduct.specs.map((spec) => (
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
                <h3 className="text-5xl font-bold">4.8</h3>
                <div className="flex text-yellow-500 justify-center my-2">
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
                  <Star className="h-4 w-4 fill-current" />
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
