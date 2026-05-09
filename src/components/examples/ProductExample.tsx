'use client';

import { useState } from 'react';
import { useProducts, useProduct } from '@/hooks/useProducts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Search, Filter } from 'lucide-react';

export function ProductExample() {
  const { products, isLoading, error, filters, pagination, updateFilters, resetFilters } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    updateFilters({ search: value });
  };

  const handleCategoryFilter = (category: string) => {
    updateFilters({ category });
  };

  const handlePriceFilter = (minPrice?: number, maxPrice?: number) => {
    updateFilters({ minPrice, maxPrice });
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    resetFilters();
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Products Example</CardTitle>
          <CardDescription>Test the Redux products integration with backend API</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCategoryFilter('electronics')}
              >
                Electronics
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleCategoryFilter('clothing')}
              >
                Clothing
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePriceFilter(0, 50)}
              >
                Under $50
              </Button>
              <Button variant="outline" size="sm" onClick={handleResetFilters}>
                <Filter className="h-4 w-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.category || filters.minPrice !== undefined || filters.search) && (
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <Badge variant="secondary">
                  Category: {filters.category}
                </Badge>
              )}
              {filters.minPrice !== undefined && (
                <Badge variant="secondary">
                  Price: ${filters.minPrice} - ${filters.maxPrice || '∞'}
                </Badge>
              )}
              {filters.search && (
                <Badge variant="secondary">
                  Search: {filters.search}
                </Badge>
              )}
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="p-4 border border-red-200 bg-red-50 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <Card key={product._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-square relative">
                      <img
                        src={product.images[0] || '/placeholder.jpg'}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                      {product.countInStock === 0 && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <Badge variant="destructive">Out of Stock</Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg mb-2 line-clamp-1">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-lg font-bold">${product.price}</span>
                        <Badge variant="outline">{product.category}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <span>⭐ {product.rating}</span>
                        <span>•</span>
                        <span>{product.numReviews} reviews</span>
                      </div>
                      <Button 
                        className="w-full" 
                        disabled={product.countInStock === 0}
                        onClick={() => toast.success(`Added ${product.name} to cart!`)}
                      >
                        {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">No products found</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Try adjusting your filters or search terms
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Pagination Info */}
          {!isLoading && !error && products.length > 0 && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Showing {products.length} of {pagination.total} products
              </span>
              <span>
                Page {pagination.page} of {pagination.totalPages}
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
