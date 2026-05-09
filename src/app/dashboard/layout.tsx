'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  MapPin, 
  Settings, 
  LogOut,
  ChevronRight,
  Bell
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useDispatch } from 'react-redux';
import { logout } from '@/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useGetProfileQuery } from '@/services/userApi';

const sidebarLinks = [
  { name: 'Profile', href: '/dashboard', icon: User },
  { name: 'My Orders', href: '/dashboard/orders', icon: ShoppingBag },
  { name: 'Wishlist', href: '/wishlist', icon: Heart },
  { name: 'Addresses', href: '/dashboard/addresses', icon: MapPin },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: profile, isLoading } = useGetProfileQuery(undefined);

  const handleLogout = () => {
    dispatch(logout());
    toast.success('Logged out successfully');
    router.push('/login');
  };

  const initials = profile?.name
    ? profile.name
        .split(' ')
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
    : 'U';

  const roleName = profile?.role === 'admin' ? 'Premium Member' : 'Member';

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 space-y-8">
          {isLoading ? (
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl animate-pulse">
              <div className="w-12 h-12 rounded-full bg-muted" />
              <div className="space-y-2 flex-grow">
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                {initials}
              </div>
              <div>
                <p className="font-bold line-clamp-1">{profile?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground">{roleName}</p>
              </div>
            </div>
          )}

          <nav className="space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                  pathname === link.href 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                <link.icon className={cn("h-5 w-5", pathname === link.href ? "" : "group-hover:text-primary")} />
                <span className="font-medium">{link.name}</span>
                {pathname === link.href && <ChevronRight className="ml-auto h-4 w-4" />}
              </Link>
            ))}
            <Separator className="my-4" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 w-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive group"
            >
              <LogOut className="h-5 w-5 group-hover:text-destructive" />
              <span className="font-medium">Logout</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
