'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthExample } from '@/components/examples/AuthExample';
import { CartExample } from '@/components/examples/CartExample';
import { ProductExample } from '@/components/examples/ProductExample';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function DemoPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Redux Integration Demo</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          This page demonstrates the complete Redux integration with the backend API. 
          Test authentication, cart management, and product browsing functionality.
        </p>
      </div>

      <Tabs defaultValue="auth" className="w-full max-w-6xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="auth">Authentication</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="cart">Shopping Cart</TabsTrigger>
        </TabsList>

        <TabsContent value="auth" className="mt-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Authentication Integration</CardTitle>
                <CardDescription>
                  Test the Redux authentication system with backend API integration. 
                  Features include login, registration, token management, and automatic token refresh.
                </CardDescription>
              </CardHeader>
            </Card>
            <AuthExample />
          </div>
        </TabsContent>

        <TabsContent value="products" className="mt-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Products Integration</CardTitle>
                <CardDescription>
                  Browse products with Redux state management. Features include search, filtering, 
                  pagination, and real-time updates from the backend API.
                </CardDescription>
              </CardHeader>
            </Card>
            <ProductExample />
          </div>
        </TabsContent>

        <TabsContent value="cart" className="mt-8">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Shopping Cart Integration</CardTitle>
                <CardDescription>
                  Manage your shopping cart with Redux. Features include add/remove items, 
                  quantity management, and synchronization with the backend cart API.
                </CardDescription>
              </CardHeader>
            </Card>
            <CartExample />
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🔐 Authentication</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• JWT token management</li>
              <li>• Automatic token refresh</li>
              <li>• Persistent login state</li>
              <li>• Protected API calls</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">🛒 Shopping Cart</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Real-time cart updates</li>
              <li>• Backend synchronization</li>
              <li>• Quantity management</li>
              <li>• Price calculations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">📦 Products</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Search and filtering</li>
              <li>• Pagination support</li>
              <li>• Real-time updates</li>
              <li>• Stock management</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
