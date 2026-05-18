'use client';

import React from 'react';
import Link from 'next/link';
import { Order } from '@/types/order';
import { 
  ShoppingBag, 
  Heart, 
  Clock, 
  Star,
  ChevronRight,
  Package,
  Truck,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useGetProfileQuery, useGetAddressesQuery } from '@/services/userApi';
import { useGetMyOrdersQuery } from '@/services/orderApi';
import { useGetWishlistQuery } from '@/services/wishlistApi';

export default function DashboardPage() {
  const { data: profile, isLoading: isProfileLoading } = useGetProfileQuery(undefined);
  const { data: ordersData, isLoading: isOrdersLoading } = useGetMyOrdersQuery(undefined);
  const { data: wishlistData, isLoading: isWishlistLoading } = useGetWishlistQuery(undefined);
  const { data: addressesData, isLoading: isAddressesLoading } = useGetAddressesQuery(undefined);

  const orders = ordersData || [];
  const wishlist = wishlistData || [];
  const addresses = addressesData || [];

  const firstName = profile?.name?.split(' ')[0] || 'User';
  const roleName = profile?.role === 'admin' ? 'Premium Member' : 'Member';
  const totalSpent = orders.reduce((sum: number, order: Order) => sum + (order.totalAmount || 0), 0);
  const recentOrders = orders.slice(0, 3);
  const defaultAddress = addresses.find((addr: any) => addr.isDefault) || addresses[0];

  const stats = [
    { label: 'Total Orders', value: (orders?.length || 0).toString(), icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Wishlist Items', value: (wishlist?.length || 0).toString(), icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10' },
    { label: 'Pending Reviews', value: '0', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
    { label: 'Total Spent', value: `$${totalSpent.toFixed(2)}`, icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  ];

  const getStatusVariant = (status: string) => {
    const s = status?.toLowerCase();
    if (s === 'delivered') return 'default';
    if (s === 'processing' || s === 'pending') return 'secondary';
    return 'outline';
  };

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase();
    if (s === 'delivered') return 'bg-emerald-500 hover:bg-emerald-600 border-none';
    if (s === 'cancelled') return 'bg-rose-500 hover:bg-rose-600 border-none';
    return '';
  };

  const getProgressWidth = (status: string) => {
    const s = status?.toLowerCase();
    if (s === 'shipped') return '75%';
    if (s === 'processing') return '25%';
    if (s === 'pending') return '10%';
    return '100%';
  };

  const isLoading = isProfileLoading || isOrdersLoading || isWishlistLoading || isAddressesLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, {profile?.name || 'User'}!</h1>
          <p className="text-primary font-medium">{roleName}</p>
          <p className="text-muted-foreground text-sm">Here's what's happening with your account today.</p>
        </div>
        <Button variant="outline" size="icon" className="rounded-full" suppressHydrationWarning>
          <Clock className="h-5 w-5" suppressHydrationWarning />
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
            <Button variant="ghost" size="sm" className="text-primary" render={<Link href="/dashboard/orders" />}>
              View All <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order: Order) => (
                <Card key={order._id} className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <CardContent className="p-0">
                    <div className="flex items-center p-4 gap-4">
                      <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors">
                        <Package className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-bold">Order #{order._id?.slice(-8).toUpperCase()}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString()} • {order.orderItems?.length || 0} items
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
                        <p className="font-bold">${order.totalAmount?.toFixed(2)}</p>
                        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" render={<Link href={`/dashboard/orders/${order._id}`} />}>
                          Details
                        </Button>
                      </div>
                    </div>
                    {/* Mini Progress Bar for non-delivered and non-cancelled orders */}
                    {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                      <div className="h-1 bg-muted w-full">
                        <div className="h-full bg-primary" style={{ width: getProgressWidth(order.status) }} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="border-dashed border-2">
                <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4 opacity-20" />
                  <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                  <Button variant="link" className="mt-2" render={<Link href="/shop" />}>Start Shopping</Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Account Summary */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold">Account Summary</h2>
          <Card className="border-none shadow-md bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-lg">Profile Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs opacity-70 uppercase tracking-wider font-bold">Full Name</p>
                <p className="font-medium">{profile?.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs opacity-70 uppercase tracking-wider font-bold">Email Address</p>
                <p className="font-medium">{profile?.email}</p>
              </div>
              <Button variant="secondary" className="w-full font-bold mt-2" render={<Link href="/dashboard/settings" />}>Edit Profile</Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Default Address</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {defaultAddress ? (
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-muted rounded-lg">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{defaultAddress.isDefault ? 'Home (Default)' : 'Primary Address'}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {defaultAddress.street}, {defaultAddress.city}, {defaultAddress.state} {defaultAddress.zipCode}, {defaultAddress.country}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <MapPin className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-20" />
                  <p className="text-sm text-muted-foreground">No address added yet.</p>
                </div>
              )}
              <Button variant="outline" className="w-full" render={<Link href="/dashboard/settings" />}>Manage Addresses</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
