'use client';

import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  Bell, 
  ShieldCheck, 
  Globe, 
  CreditCard,
  ChevronRight,
  Save,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';
import { useGetProfileQuery, useUpdateProfileMutation, useChangePasswordMutation } from '@/services/userApi';

export default function SettingsPage() {
  const { data: profile, isLoading } = useGetProfileQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();
  const [changePassword] = useChangePasswordMutation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    language: 'English (US)',
  });

  // Sync form data with profile when it loads
  React.useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        language: profile.language || 'English (US)',
      });
    }
  }, [profile]);
  
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleProfileUpdate = async () => {
    try {
      await updateProfile(formData).unwrap();
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    try {
      await changePassword({
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword,
      }).unwrap();
      toast.success('Password updated successfully!');
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setIsChangingPassword(false);
    } catch (error) {
      toast.error('Failed to update password');
    }
  };

  const initials = profile?.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your personal information and preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Profile Settings */}
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-muted/30">
            <div className="flex items-center gap-3">
              <User className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your profile details and contact info.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-3xl font-bold shadow-lg">
                {initials}
              </div>
              <div className="space-y-2">
                <Button size="sm" className="rounded-xl">Change Avatar</Button>
                <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max size 2MB.</p>
              </div>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input 
                  id="fullName" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="h-11 rounded-xl" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="h-11 rounded-xl" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="h-11 rounded-xl" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Preferred Language</Label>
                <Input 
                  id="language" 
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                  className="h-11 rounded-xl" 
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-muted/30">
            <div className="flex items-center gap-3">
              <Lock className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Security</CardTitle>
                <CardDescription>Manage your password and account security.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {!isChangingPassword ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border">
                  <div className="space-y-1">
                    <p className="font-bold">Password</p>
                    <p className="text-sm text-muted-foreground">Last changed recently.</p>
                  </div>
                  <Button variant="outline" className="rounded-xl" onClick={() => setIsChangingPassword(true)}>Update Password</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-2xl border">
                  <div className="space-y-1">
                    <p className="font-bold">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
                  </div>
                  <Switch />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="oldPassword">Current Password</Label>
                  <div className="relative">
                    <Input 
                      id="oldPassword" 
                      type={showPassword ? 'text' : 'password'}
                      value={passwordData.oldPassword}
                      onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                      className="h-11 rounded-xl pr-10" 
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input 
                    id="newPassword" 
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="h-11 rounded-xl" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input 
                    id="confirmPassword" 
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="h-11 rounded-xl" 
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsChangingPassword(false)}>Cancel</Button>
                  <Button onClick={handlePasswordChange}>Update Password</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-muted/30">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-primary" />
              <div>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Control how you receive updates and alerts.</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <p className="font-medium">Order Updates</p>
                <p className="text-sm text-muted-foreground">Receive notifications about your order status.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <p className="font-medium">New Arrivals</p>
                <p className="text-sm text-muted-foreground">Get alerted when new products are added.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between py-2">
              <div className="space-y-0.5">
                <p className="font-medium">Promotional Emails</p>
                <p className="text-sm text-muted-foreground">Receive exclusive deals and coupon codes.</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <Button variant="outline" className="rounded-full px-8">Discard Changes</Button>
        <Button className="rounded-full px-8 shadow-lg shadow-primary/20" onClick={handleProfileUpdate}>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </Button>
      </div>
    </div>
  );
}
