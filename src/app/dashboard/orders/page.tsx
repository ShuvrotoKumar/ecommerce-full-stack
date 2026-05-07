'use client';

import React from 'react';
import { Package, Search, ChevronRight, Eye, Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const orders = [
  { id: 'SW-12345', date: 'May 05, 2026', status: 'Delivered', total: 299, items: 1, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=100&h=100&fit=crop' },
  { id: 'SW-12344', date: 'Apr 28, 2026', status: 'Processing', total: 150, items: 2, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=100&h=100&fit=crop' },
  { id: 'SW-12343', date: 'Apr 15, 2026', status: 'Shipped', total: 85, items: 1, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=100&h=100&fit=crop' },
  { id: 'SW-12342', date: 'Mar 10, 2026', status: 'Cancelled', total: 45, items: 1, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=100&h=100&fit=crop' },
];

export default function OrdersPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        <p className="text-muted-foreground">Manage and track your recent orders.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-muted/30 p-4 rounded-2xl border">
        <Tabs defaultValue="all" className="w-full sm:w-auto">
          <TabsList className="bg-background border h-10">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search order ID..." className="pl-9 h-10 rounded-xl bg-background" />
        </div>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="border-none shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
                <div className="w-20 h-20 bg-muted rounded-2xl overflow-hidden shrink-0">
                  <img src={order.image} alt="Product" className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-grow space-y-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">Order #{order.id}</h3>
                      <p className="text-sm text-muted-foreground">Placed on {order.date}</p>
                    </div>
                    <Badge 
                      variant={order.status === 'Delivered' ? 'default' : order.status === 'Cancelled' ? 'destructive' : 'secondary'}
                      className={order.status === 'Delivered' ? 'bg-emerald-500 hover:bg-emerald-600 border-none' : ''}
                    >
                      {order.status === 'Delivered' && <CheckCircle2 className="mr-1 h-3 w-3" />}
                      {order.status === 'Shipped' && <Truck className="mr-1 h-3 w-3" />}
                      {order.status === 'Processing' && <Package className="mr-1 h-3 w-3" />}
                      {order.status === 'Cancelled' && <AlertCircle className="mr-1 h-3 w-3" />}
                      {order.status}
                    </Badge>
                  </div>
                  <div className="flex gap-4 text-sm font-medium pt-2">
                    <span>{order.items} {order.items === 1 ? 'Item' : 'Items'}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-primary font-bold">Total: ${order.total}</span>
                  </div>
                </div>

                <div className="flex flex-row md:flex-col gap-2 shrink-0">
                  <Button variant="outline" size="sm" className="flex-grow md:flex-grow-0 rounded-xl h-10">
                    <Eye className="mr-2 h-4 w-4" /> View Details
                  </Button>
                  <Button size="sm" className="flex-grow md:flex-grow-0 rounded-xl h-10">
                    Track Order
                  </Button>
                </div>
              </div>
              
              {/* Progress Bar */}
              {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                <div className="h-1.5 bg-muted w-full relative">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: order.status === 'Shipped' ? '75%' : '25%' }} 
                  />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button variant="ghost" className="text-muted-foreground">
          Load more orders
        </Button>
      </div>
    </div>
  );
}
