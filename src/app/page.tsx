'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star, ShoppingBag, ShieldCheck, Zap, Truck, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categories = [
  { name: 'Electronics', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=300&h=300&fit=crop', count: '1.2k+ Products' },
  { name: 'Fashion', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=300&h=300&fit=crop', count: '2.5k+ Products' },
  { name: 'Home & Living', image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?q=80&w=300&h=300&fit=crop', count: '800+ Products' },
  { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=300&h=300&fit=crop', count: '1.5k+ Products' },
];

const trendingProducts = [
  { id: '1', name: 'Premium Wireless Headphones', price: 299, rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&h=400&fit=crop', category: 'Electronics' },
  { id: '2', name: 'Minimalist Leather Watch', price: 150, rating: 4.5, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&h=400&fit=crop', category: 'Accessories' },
  { id: '3', name: 'Smart Fitness Tracker', price: 89, rating: 4.7, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=400&h=400&fit=crop', category: 'Electronics' },
  { id: '4', name: 'Classic Cotton T-Shirt', price: 25, rating: 4.9, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&h=400&fit=crop', category: 'Fashion' },
];

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden bg-muted">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1920&h=1080&fit=crop"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <Badge className="mb-4 py-1 px-3 text-sm font-medium">New Summer Collection 2026</Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-tight">
              Elevate Your Lifestyle with <span className="text-primary">ShopSwift</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover a curated collection of premium products designed for modern living. Quality meets style in every piece.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="h-12 px-8 text-lg rounded-full" render={<Link href="/shop" />}>
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg rounded-full" render={<Link href="/categories" />}>
                Browse Categories
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Truck, title: 'Free Shipping', desc: 'On orders over $100' },
            { icon: ShieldCheck, title: 'Secure Payment', desc: '100% secure payment' },
            { icon: Zap, title: 'Fast Delivery', desc: 'Within 2-3 business days' },
            { icon: ShoppingBag, title: 'Easy Returns', desc: '30-day return policy' },
          ].map((feature, i) => (
            <div key={i} className="flex items-center space-x-4 p-6 rounded-2xl bg-card border shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
            <p className="text-muted-foreground">Find exactly what you're looking for</p>
          </div>
          <Button variant="ghost" render={<Link href="/categories" className="flex items-center" />}>
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Link href={`/shop?category=${category.name.toLowerCase()}`}>
                <Card className="overflow-hidden group cursor-pointer border-none shadow-md">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                      <h3 className="text-white font-bold text-xl">{category.name}</h3>
                      <p className="text-white/80 text-sm">{category.count}</p>
                    </div>
                  </div>
                  <CardContent className="p-4 text-center group-hover:bg-primary/5 transition-colors">
                    <h3 className="font-bold">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Products */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Trending Now</h2>
            <p className="text-muted-foreground">Our most popular products this week</p>
          </div>
          <Button variant="ghost" render={<Link href="/shop" className="flex items-center" />}>
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trendingProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Card className="overflow-hidden border-none shadow-lg">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4">
                    <Button variant="secondary" size="icon" className="rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <Heart className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <Button className="w-full shadow-xl">Add to Cart</Button>
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
                  <h3 className="font-bold mb-1 line-clamp-1">{product.name}</h3>
                  <p className="text-lg font-bold text-primary">${product.price}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container mx-auto px-4">
        <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-16 flex flex-col items-center text-center space-y-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/4 translate-y-1/4" />
          
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Stay in the Loop</h2>
          <p className="text-primary-foreground/80 max-w-lg text-lg">
            Subscribe to our newsletter and get 10% off your first order. Plus, be the first to know about new arrivals and exclusive deals.
          </p>
          <div className="flex flex-col sm:flex-row w-full max-w-md gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow h-12 rounded-full px-6 bg-white/20 border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <Button size="lg" variant="secondary" className="h-12 px-8 rounded-full font-bold">
              Subscribe
            </Button>
          </div>
          <p className="text-xs text-primary-foreground/60">
            By subscribing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </section>
    </div>
  );
}
