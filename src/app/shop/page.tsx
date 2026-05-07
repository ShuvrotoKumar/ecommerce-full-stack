'use client';

import React, { useState } from 'react';
import { ProductCard } from '@/features/products/product-card';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  LayoutGrid, 
  List, 
  Search, 
  SlidersHorizontal,
  ChevronDown,
  X,
  Star
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';

const mockProducts = [
  { id: '1', name: 'Premium Wireless Headphones', price: 299, oldPrice: 350, rating: 4.8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&h=400&fit=crop', category: 'Electronics', isNew: true },
  { id: '2', name: 'Minimalist Leather Watch', price: 150, rating: 4.5, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&h=400&fit=crop', category: 'Accessories', discount: 15 },
  { id: '3', name: 'Smart Fitness Tracker', price: 89, oldPrice: 120, rating: 4.7, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=400&h=400&fit=crop', category: 'Electronics' },
  { id: '4', name: 'Classic Cotton T-Shirt', price: 25, rating: 4.9, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&h=400&fit=crop', category: 'Fashion' },
  { id: '5', name: 'Leather Crossbody Bag', price: 120, rating: 4.6, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=400&h=400&fit=crop', category: 'Fashion' },
  { id: '6', name: 'Wireless Charging Pad', price: 45, rating: 4.4, image: 'https://images.unsplash.com/photo-1586816829380-49275086d997?q=80&w=400&h=400&fit=crop', category: 'Electronics' },
  { id: '7', name: 'Noise Cancelling Earbuds', price: 179, rating: 4.7, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=400&h=400&fit=crop', category: 'Electronics', isNew: true },
  { id: '8', name: 'Casual Canvas Sneakers', price: 65, rating: 4.3, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=400&h=400&fit=crop', category: 'Fashion', discount: 20 },
];

const categories = ['All', 'Electronics', 'Fashion', 'Home & Living', 'Accessories'];
const brands = ['Apple', 'Sony', 'Nike', 'Adidas', 'Samsung'];

export default function ShopPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shop All Products</h1>
          <p className="text-muted-foreground">Showing 1-12 of 120 products</p>
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-grow md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products..." className="pl-9 rounded-full" />
          </div>
          <Sheet>
            <SheetTrigger
              className={cn("md:hidden", buttonVariants({ variant: 'outline' }))}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" /> Filters
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="py-6">
                <FilterContent 
                  priceRange={priceRange} 
                  setPriceRange={setPriceRange}
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="flex gap-8">
        {/* Desktop Sidebar */}
        <aside className="hidden md:block w-64 shrink-0 space-y-8">
          <FilterContent 
            priceRange={priceRange} 
            setPriceRange={setPriceRange}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </aside>

        {/* Main Content */}
        <div className="flex-grow">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 bg-muted/30 p-2 rounded-lg border">
            <div className="flex items-center gap-2">
              <Button 
                variant={view === 'grid' ? 'secondary' : 'ghost'} 
                size="icon"
                onClick={() => setView('grid')}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button 
                variant={view === 'list' ? 'secondary' : 'ghost'} 
                size="icon"
                onClick={() => setView('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px] bg-background">
                  <SelectValue placeholder="Featured" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Best Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {selectedCategory !== 'All' && (
              <Badge variant="secondary" className="px-3 py-1 flex items-center gap-1">
                Category: {selectedCategory}
                <X className="h-3 w-3 cursor-pointer" onClick={() => setSelectedCategory('All')} />
              </Badge>
            )}
            <Badge variant="secondary" className="px-3 py-1 flex items-center gap-1">
              Price: ${priceRange[0]} - ${priceRange[1]}
              <X className="h-3 w-3 cursor-pointer" onClick={() => setPriceRange([0, 1000])} />
            </Badge>
          </div>

          {/* Grid */}
          <div className={view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
            {mockProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex items-center gap-2">
              <Button variant="outline" disabled>Previous</Button>
              <Button variant="secondary" className="w-10">1</Button>
              <Button variant="ghost" className="w-10">2</Button>
              <Button variant="ghost" className="w-10">3</Button>
              <span className="px-2">...</span>
              <Button variant="ghost" className="w-10">10</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FilterContent({ priceRange, setPriceRange, selectedCategory, setSelectedCategory }: any) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div key={cat} className="flex items-center space-x-2">
              <Checkbox 
                id={`cat-${cat}`} 
                checked={selectedCategory === cat}
                onCheckedChange={() => setSelectedCategory(cat)}
              />
              <label 
                htmlFor={`cat-${cat}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {cat}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <Slider
          defaultValue={[0, 1000]}
          max={1000}
          step={10}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-4"
        />
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-muted-foreground">Min Price</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">$</span>
              <Input value={priceRange[0]} className="pl-6 h-8 text-sm" readOnly />
            </div>
          </div>
          <div className="flex flex-col gap-1 text-right">
            <span className="text-xs text-muted-foreground">Max Price</span>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">$</span>
              <Input value={priceRange[1]} className="pl-6 h-8 text-sm" readOnly />
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Brands</h3>
        <div className="space-y-2">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox id={`brand-${brand}`} />
              <label 
                htmlFor={`brand-${brand}`}
                className="text-sm font-medium leading-none cursor-pointer"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Ratings</h3>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <label 
                htmlFor={`rating-${rating}`}
                className="flex items-center gap-1 text-sm font-medium leading-none cursor-pointer"
              >
                {rating} Stars & Up
                <div className="flex text-yellow-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={cn("h-3 w-3", i < rating ? "fill-current" : "text-muted")} />
                  ))}
                </div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button className="w-full" variant="outline" onClick={() => {
        setSelectedCategory('All');
        setPriceRange([0, 1000]);
      }}>
        Clear All Filters
      </Button>
    </div>
  );
}
