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

const stats = [
  { label: 'Total Orders', value: '12', icon: ShoppingBag, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Wishlist Items', value: '8', icon: Heart, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  { label: 'Pending Reviews', value: '3', icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  { label: 'Total Spent', value: '$1,240', icon: Clock, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
];

const recentOrders = [
  { id: 'SW-12345', date: 'May 05, 2026', status: 'Delivered', total: 299, items: 1 },
  { id: 'SW-12344', date: 'Apr 28, 2026', status: 'Processing', total: 150, items: 2 },
  { id: 'SW-12343', date: 'Apr 15, 2026', status: 'Shipped', total: 85, items: 1 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, John!</h1>
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
              <Card key={order.id} className="border-none shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                <CardContent className="p-0">
                  <div className="flex items-center p-4 gap-4">
                    <div className="p-3 bg-muted rounded-xl group-hover:bg-primary/10 transition-colors">
                      <Package className="h-6 w-6 text-muted-foreground group-hover:text-primary" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-bold">Order {order.id}</p>
                          <p className="text-xs text-muted-foreground">{order.date} • {order.items} items</p>
                        </div>
                        <Badge 
                          variant={order.status === 'Delivered' ? 'default' : order.status === 'Processing' ? 'secondary' : 'outline'}
                          className={order.status === 'Delivered' ? 'bg-emerald-500 hover:bg-emerald-600 border-none' : ''}
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
                      <div className="h-full bg-primary" style={{ width: order.status === 'Shipped' ? '75%' : '25%' }} />
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
              <div className="flex items-start gap-3">
                <div className="p-2 bg-muted rounded-lg">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold">Home (Default)</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    123 Commerce Street, Digital City, 10101, United States
                  </p>
                </div>
              </div>
              <Button variant="outline" className="w-full">Manage Addresses</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
