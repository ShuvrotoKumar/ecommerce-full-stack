'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  CreditCard, 
  Truck, 
  MapPin, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { clearLocalCart } from '@/features/cart/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { toast } from 'sonner';

const checkoutSchema = z.object({
  firstName: z.string().min(2, 'Required'),
  lastName: z.string().min(2, 'Required'),
  email: z.string().email('Invalid email'),
  address: z.string().min(5, 'Required'),
  city: z.string().min(2, 'Required'),
  zipCode: z.string().min(5, 'Required'),
  country: z.string().min(2, 'Required'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Invalid card number'),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'MM/YY format'),
  cvv: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const [step, setStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      city: '',
      zipCode: '',
      country: '',
      cardNumber: '',
      expiry: '',
      cvv: '',
    },
  });

  const onSubmit = async (values: CheckoutFormValues) => {
    setIsCompleted(true);
    dispatch(clearLocalCart());
    toast.success('Order placed successfully!');
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof CheckoutFormValues)[] = [];
    if (step === 1) {
      fieldsToValidate = ['firstName', 'lastName', 'email', 'address', 'city', 'zipCode', 'country'];
    } else if (step === 2) {
      fieldsToValidate = ['cardNumber', 'expiry', 'cvv'];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  if (isCompleted) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md mx-auto space-y-6"
        >
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="h-10 w-10 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold">Thank You!</h1>
          <p className="text-xl text-muted-foreground">
            Your order #SW-12345 has been placed and is being processed.
          </p>
          <div className="pt-6">
            <Button render={<Link href="/dashboard/orders">View Your Orders</Link>} size="lg" className="rounded-full px-8" />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side: Form */}
        <div className="lg:col-span-2 space-y-8">
          {/* Progress Bar */}
          <div className="flex items-center justify-between max-w-lg mx-auto mb-12 relative">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-muted -translate-y-1/2 z-0" />
            <div 
              className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 transition-all duration-300 z-0" 
              style={{ width: `${((step - 1) / 2) * 100}%` }}
            />
            {[
              { id: 1, icon: MapPin, label: 'Shipping' },
              { id: 2, icon: CreditCard, label: 'Payment' },
              { id: 3, icon: CheckCircle2, label: 'Review' },
            ].map((s) => (
              <div key={s.id} className="relative z-10 flex flex-col items-center gap-2">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    step >= s.id ? 'bg-primary border-primary text-primary-foreground' : 'bg-background border-muted text-muted-foreground'
                  }`}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                <span className={`text-xs font-bold uppercase tracking-wider ${step >= s.id ? 'text-primary' : 'text-muted-foreground'}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl><Input placeholder="John" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl><Input placeholder="Doe" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl><Input placeholder="john@example.com" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Shipping Address</FormLabel>
                          <FormControl><Input placeholder="123 Street Name" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl><Input placeholder="New York" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl><Input placeholder="10001" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl><Input placeholder="USA" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="p-6 border rounded-2xl bg-muted/30 space-y-4">
                      <div className="flex items-center gap-2 font-bold mb-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                        Card Details
                      </div>
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number</FormLabel>
                            <FormControl><Input placeholder="0000 0000 0000 0000" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiry"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry (MM/YY)</FormLabel>
                              <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV</FormLabel>
                              <FormControl><Input placeholder="123" {...field} /></FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <div className="p-6 border rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 space-y-4">
                      <h3 className="font-bold text-emerald-700 dark:text-emerald-400">Order Summary Review</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name:</span>
                          <span className="font-medium">{form.getValues('firstName')} {form.getValues('lastName')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Address:</span>
                          <span className="font-medium text-right">{form.getValues('address')}, {form.getValues('city')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Payment:</span>
                          <span className="font-medium">Card ending in {form.getValues('cardNumber').slice(-4)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6 border rounded-2xl space-y-4">
                      <h3 className="font-bold">Items to Ship</h3>
                      {items.map((item: any) => (
                        <div key={item.productId || item._id || item.id} className="flex justify-between text-sm">
                          <span>{(item.product?.name || item.name)} x {item.quantity}</span>
                          <span className="font-medium">${((item.product?.price || item.price || 0) * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex justify-between pt-8">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep} className="rounded-full px-8">
                    <ChevronLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                ) : (
                  <Button type="button" variant="outline" render={<Link href="/cart">Back to Cart</Link>} className="rounded-full px-8" />
                )}

                {step < 3 ? (
                  <Button type="button" onClick={nextStep} className="rounded-full px-8">
                    Continue <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="rounded-full px-8 bg-emerald-600 hover:bg-emerald-700">
                    Place Order <CheckCircle2 className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </div>

        {/* Right Side: Summary Card */}
        <div className="lg:w-96 space-y-6">
          <Card className="shadow-lg border-none sticky top-24">
            <CardHeader>
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {items.map((item: any) => (
                  <div key={item.productId || item._id || item.id} className="flex gap-4">
                    <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0">
                      <img src={item.product?.images?.[0]?.url || item.product?.images?.[0] || item.image} alt={item.product?.name || item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-sm font-bold truncate">{item.product?.name || item.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      <p className="text-sm font-bold mt-1">${((item.product?.price || item.price || 0) * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Separator />
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-emerald-500 font-medium">Free</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span className="text-primary">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-xl space-y-2">
                <div className="flex items-center gap-2 text-xs font-medium">
                  <ShieldCheck className="h-4 w-4 text-primary" />
                  Secure Transaction
                </div>
                <div className="flex items-center gap-2 text-xs font-medium">
                  <Truck className="h-4 w-4 text-primary" />
                  Delivered by May 12 - 15
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
