'use client';

import React from 'react';
import { Package, Search, ChevronRight, Eye, Truck, CheckCircle2, AlertCircle, ShoppingBag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetMyOrdersQuery } from '@/services/orderApi';
import Link from 'next/link';

export default function OrdersPage() {
  const { data: orders = [], isLoading } = useGetMyOrdersQuery(undefined);
  const [activeTab, setActiveTab] = React.useState('all');
  const [searchTerm, setSearchTerm] = React.useState('');

  const filteredOrders = orders.filter((order: any) => {
    const matchesTab = activeTab === 'all' || order.status?.toLowerCase() === activeTab.toLowerCase();
    const matchesSearch = order._id?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusVariant = (status: string) => {
    const s = status?.toLowerCase();
    if (s === 'delivered') return 'default';
    if (s === 'cancelled') return 'destructive';
    return 'secondary';
  };

  const getStatusIcon = (status: string) => {
    const s = status?.toLowerCase();
    if (s === 'delivered') return <CheckCircle2 className="mr-1 h-3 w-3" />;
    if (s === 'shipped') return <Truck className="mr-1 h-3 w-3" />;
    if (s === 'processing' || s === 'pending') return <Package className="mr-1 h-3 w-3" />;
    if (s === 'cancelled') return <AlertCircle className="mr-1 h-3 w-3" />;
    return null;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Orders</h1>
        <p className="text-muted-foreground">Manage and track your recent orders.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-muted/30 p-4 rounded-2xl border">
        <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
          <TabsList className="bg-background border h-10">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search order ID..." 
            className="pl-9 h-10 rounded-xl bg-background" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order: any) => (
            <Card key={order._id} className="border-none shadow-md overflow-hidden group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row md:items-center p-6 gap-6">
                  <div className="w-20 h-20 bg-muted rounded-2xl overflow-hidden shrink-0 flex items-center justify-center">
                    {order.orderItems?.[0]?.image ? (
                      <img src={order.orderItems[0].image} alt="Product" className="w-full h-full object-cover" />
                    ) : (
                      <Package className="h-10 w-10 text-muted-foreground opacity-20" />
                    )}
                  </div>
                  
                  <div className="flex-grow space-y-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg">Order #{order._id?.slice(-8).toUpperCase()}</h3>
                        <p className="text-sm text-muted-foreground">Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                      </div>
                      <Badge 
                        variant={getStatusVariant(order.status)}
                        className={order.status?.toLowerCase() === 'delivered' ? 'bg-emerald-500 hover:bg-emerald-600 border-none' : ''}
                      >
                        {getStatusIcon(order.status)}
                        {order.status}
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-sm font-medium pt-2">
                      <span>{order.orderItems?.length || 0} {order.orderItems?.length === 1 ? 'Item' : 'Items'}</span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-primary font-bold">Total: ${order.totalAmount?.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex flex-row md:flex-col gap-2 shrink-0">
                    <Button variant="outline" size="sm" className="flex-grow md:flex-grow-0 rounded-xl h-10" render={<Link href={`/dashboard/orders/${order._id}`} />}>
                        <Eye className="mr-2 h-4 w-4" /> View Details
                    </Button>
                    <Button size="sm" className="flex-grow md:flex-grow-0 rounded-xl h-10">
                      Track Order
                    </Button>
                  </div>
                </div>
                
                {/* Progress Bar */}
                {order.status?.toLowerCase() !== 'cancelled' && order.status?.toLowerCase() !== 'delivered' && (
                  <div className="h-1.5 bg-muted w-full relative">
                    <div 
                      className="h-full bg-primary transition-all duration-500" 
                      style={{ width: order.status?.toLowerCase() === 'shipped' ? '75%' : '25%' }} 
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold">No orders found</h3>
            <p className="text-muted-foreground max-w-xs mx-auto mt-2">
              {searchTerm ? `No orders matching "${searchTerm}"` : "You haven't placed any orders yet."}
            </p>
            {!searchTerm && (
              <Button className="mt-6 rounded-full px-8" render={<Link href="/shop" />}>Start Shopping</Button>
            )}
          </div>
        )}
      </div>

      {filteredOrders.length > 10 && (
        <div className="flex justify-center pt-4">
          <Button variant="ghost" className="text-muted-foreground">
            Load more orders
          </Button>
        </div>
      )}
    </div>
  );
}
