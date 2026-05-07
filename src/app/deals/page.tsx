'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock, ArrowRight, Tag, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ProductCard } from '@/features/products/product-card';
import Link from 'next/link';

const flashSales = [
  { id: '1', name: 'Premium Wireless Headphones', price: 299, oldPrice: 350, rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&h=400&fit=crop', category: 'Electronics', discount: 15 },
  { id: '8', name: 'Casual Canvas Sneakers', price: 65, oldPrice: 85, rating: 4.3, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=400&h=400&fit=crop', category: 'Fashion', discount: 20 },
  { id: '2', name: 'Minimalist Leather Watch', price: 150, oldPrice: 180, rating: 4.5, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&h=400&fit=crop', category: 'Accessories', discount: 15 },
];

export default function DealsPage() {
  const [timeLeft, setTimeLeft] = useState({ hours: 12, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Flash Sale Banner */}
      <section className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-sm font-bold">
              <Zap className="h-4 w-4 fill-current text-yellow-400" /> Flash Sale Ending Soon!
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter">UP TO 60% OFF</h1>
            <p className="text-lg opacity-90 max-w-md">
              Don't miss out on our biggest sale of the season. Premium products at unbeatable prices.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-4">
              {[
                { label: 'Hrs', value: timeLeft.hours },
                { label: 'Min', value: timeLeft.minutes },
                { label: 'Sec', value: timeLeft.seconds },
              ].map((unit) => (
                <div key={unit.label} className="bg-white text-primary w-20 h-24 rounded-2xl flex flex-col items-center justify-center shadow-xl">
                  <span className="text-3xl font-black">{unit.value.toString().padStart(2, '0')}</span>
                  <span className="text-xs uppercase font-bold opacity-60">{unit.label}</span>
                </div>
              ))}
            </div>
            <Button size="lg" variant="secondary" className="w-full h-14 rounded-full font-bold text-lg shadow-lg">
              Shop All Deals <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Deals Grid */}
      <div className="space-y-12">
        <div>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <Tag className="h-8 w-8 text-primary" /> Today's Top Deals
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {flashSales.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="bg-muted/30 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Member Exclusive Coupons</h2>
              <p className="text-muted-foreground">Sign in to unlock even more savings on your favorite brands.</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-background border-2 border-dashed border-primary/30 p-6 rounded-2xl relative overflow-hidden group hover:border-primary transition-colors cursor-pointer">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-xl">ACTIVE</div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Percent className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-xl">SAVE20</p>
                    <p className="text-xs text-muted-foreground">20% off on Electronics</p>
                  </div>
                </div>
              </div>
              <div className="bg-background border-2 border-dashed border-primary/30 p-6 rounded-2xl relative overflow-hidden group hover:border-primary transition-colors cursor-pointer">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-xl">ACTIVE</div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Percent className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-xl">FREESHIP</p>
                    <p className="text-xs text-muted-foreground">Free shipping on all orders</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
