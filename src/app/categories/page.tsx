'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Laptop, Shirt, Home, Watch, Camera, Footprints, LayoutGrid } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const categories = [
  { name: 'Electronics', icon: Laptop, color: 'bg-blue-500', count: '1.2k+ Products', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&h=600&fit=crop' },
  { name: 'Fashion', icon: Shirt, color: 'bg-rose-500', count: '2.5k+ Products', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&h=600&fit=crop' },
  { name: 'Home & Living', icon: Home, color: 'bg-emerald-500', count: '800+ Products', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=600&h=600&fit=crop' },
  { name: 'Accessories', icon: Watch, color: 'bg-amber-500', count: '1.5k+ Products', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=600&h=600&fit=crop' },
  { name: 'Photography', icon: Camera, color: 'bg-purple-500', count: '400+ Products', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=600&h=600&fit=crop' },
  { name: 'Footwear', icon: Footprints, color: 'bg-indigo-500', count: '900+ Products', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=600&h=600&fit=crop' },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Shop by Category</h1>
        <p className="text-muted-foreground text-lg">
          Explore our wide range of premium products across various categories. 
          Quality and style guaranteed in every selection.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link href={`/shop?category=${category.name.toLowerCase()}`}>
              <Card className="overflow-hidden group cursor-pointer border-none shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="aspect-[16/9] relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute top-4 left-4">
                    <div className={`${category.color} p-3 rounded-2xl shadow-lg`}>
                      <category.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count}</p>
                  </div>
                  <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30">
                      <ArrowRight className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
