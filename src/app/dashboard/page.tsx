'use client';

import React from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Clock, 
  Star,
  ChevronRight,
  Package,
  Truck,
  CheckCircle2
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGetProfileQuery, useGetAddressesQuery } from '@/services/userApi';
import { useGetMyOrdersQuery } from '@/services/orderApi';
import { useGetWishlistQuery } from '@/services/wishlistApi';

export default function DashboardPage() {
  const { data: profile } = useGetProfileQuery();
  const { data: orders = [] } = useGetMyOrdersQuery();
  const { data: wishlist = [] } = useGetWishlistQuery();
  const { data: addresses = [] } = useGetAddressesQuery();

  const firstName = profile?.name?.split(' ')[0] || 'User';
  const totalSpent = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const recentOrders = orders.slice(0, 3);
  const defaultAddress = addresses.find(addr => addr.isDefault) || addresses[0];

  const stats = [
    { label: 'Total Orders', value: orders.length.toString(), icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Wishlist Items', value: wishlist.length.toString(), icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { label: 'Pending Reviews', value: '0', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Total Spent', value: `$${totalSpent.toFixed(2)}`, icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  const getStatusVariant = (status) => {
    if (status === 'Delivered') return 'default';
    if (status === 'Processing') return 'secondary';
    return 'outline';
  };

  const getStatusColor = (status) => {
    if (status === 'Delivered') return 'bg-emerald-500 hover:bg-emerald-600 border-none';
    return '';
  };

  const getProgressWidth = (status) => {
    if (status === 'Shipped') return '75%';
    if (status === 'Processing') return '25%';
    return '100%';
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {firstName}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your account today.</p>
        </div>
        <Button variant="outline" size="icon" className="rounded-full">
          <Clock className="h-5 w-5" />
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                </div>
                <div className={stat.bg + " p-3 rounded-2xl"}>
                  <stat.icon className={stat.color + " h-6 w-6"} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <Button variant="ghost" size="sm" className="text-primary">
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <Card key={order._id} className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                <CardContent className="p-0">
                  <div className="flex items-center p-4 gap-4">
                    <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors">
                      <Package className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold">Order #{order._id?.slice(-5)}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString()} • {order.items?.length || 0} items
                          </p>
                        </div>
                        <Badge 
                          variant={getStatusVariant(order.status)}
                          className={getStatusColor(order.status)}
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${order.total}</p>
                      <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">Details</Button>
                    </div>
                  </div>
                  {/* Mini Progress Bar for non-delivered orders */}
                  {order.status !== 'Delivered' && (
                    <div className="h-1 bg-muted w-full">
                      <div className="h-full bg-primary" style={{ width: getProgressWidth(order.status) }} />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Account Summary */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Account Security</h2>
          <Card className="border-none shadow-md bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg">Two-Factor Auth</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm opacity-90">
                Enhance your account security by enabling two-factor authentication.
              </p>
              <Button variant="secondary" className="w-full font-bold">Enable Now</Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Current Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {defaultAddress ? (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{defaultAddress.isDefault ? 'Home (Default)' : 'Address'}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {defaultAddress.street}, {defaultAddress.city}, {defaultAddress.state} {defaultAddress.zipCode}, {defaultAddress.country}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No address added yet.</p>
              )}
              <Button variant="outline" className="w-full">Manage Addresses</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
