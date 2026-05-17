'use client';

import React, { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useResetPasswordMutation } from '@/services/authApi';
import { useRouter, useSearchParams } from 'next/navigation';

const resetPasswordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [isSuccess, setIsSuccess] = React.useState(false);

  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordSchema>) {
    try {
      await resetPassword({ token: token || '', password: values.password }).unwrap();
      setIsSuccess(true);
      toast.success('Password reset successfully!');
      
      // Redirect to login after successful reset
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (error: any) {
      toast.error(error.data?.message || 'Failed to reset password. Please try again.');
    }
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-16rem)] px-4 py-12">
        <Card className="w-full max-w-md border-none shadow-2xl text-center">
          <CardHeader className="space-y-4">
            <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8 text-emerald-500" />
            </div>
            <CardTitle className="text-3xl font-bold">Password Reset!</CardTitle>
            <CardDescription className="text-base">
              Your password has been successfully updated.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-muted-foreground text-sm">
              Redirecting to login page...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-16rem)] px-4 py-12">
      <Card className="w-full max-w-md border-none shadow-2xl">
        <CardHeader className="space-y-4 text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold">Reset Password</CardTitle>
          <CardDescription className="text-base">
            Enter your new password below to reset your account password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" className="h-12 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm New Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••••" className="h-12 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link href="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-16rem)] px-4 py-12">
        <p>Loading...</p>
      </div>
    }>
      <ResetPasswordContent />
    </Suspense>
  );
}
