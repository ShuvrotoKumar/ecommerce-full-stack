'use client';

import { MapPin, Plus, Trash2, Edit2, Home, Briefcase, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useGetAddressesQuery, useDeleteAddressMutation, useUpdateAddressMutation } from '@/services/userApi';

export default function AddressesPage() {
  const { data: addresses = [], isLoading } = useGetAddressesQuery(undefined);
  const [deleteAddress] = useDeleteAddressMutation();
  const [updateAddress] = useUpdateAddressMutation();

  const handleDelete = async (id: string) => {
    try {
      await deleteAddress(id).unwrap();
      toast.success('Address removed successfully');
    } catch (error) {
      toast.error('Failed to remove address');
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      await updateAddress({ addressId: id, isDefault: true }).unwrap();
      toast.success('Default address updated');
    } catch (error) {
      toast.error('Failed to update default address');
    }
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
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Saved Addresses</h1>
          <p className="text-muted-foreground">Manage your shipping and billing addresses.</p>
        </div>
        <Button className="rounded-full shadow-lg shadow-primary/20">
          <Plus className="mr-2 h-4 w-4" /> Add New Address
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address: any) => (
          <Card key={address._id} className={`border-none shadow-md relative overflow-hidden group transition-all duration-300 ${address.isDefault ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/30'}`}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${address.isDefault ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                  {address.type === 'Office' ? <Briefcase className="h-4 w-4" /> : <Home className="h-4 w-4" />}
                </div>
                <CardTitle className="text-lg font-bold">{address.type || 'Home'}</CardTitle>
                {address.isDefault && (
                  <Badge variant="default" className="bg-emerald-500 hover:bg-emerald-600 border-none h-5">
                    Default
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <p className="font-bold text-base">{address.name || 'User'}</p>
                <p className="text-sm text-muted-foreground">{address.phone}</p>
                <p className="text-sm text-muted-foreground">{address.street}</p>
                <p className="text-sm text-muted-foreground">{address.city}, {address.state} {address.zipCode}</p>
                <p className="text-sm text-muted-foreground">{address.country}</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="rounded-xl flex-grow h-9">
                  <Edit2 className="mr-2 h-3.5 w-3.5" /> Edit
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl flex-grow h-9 text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(address._id)}
                >
                  <Trash2 className="mr-2 h-3.5 w-3.5" /> Remove
                </Button>
              </div>
              
              {!address.isDefault && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-xs font-bold text-primary hover:bg-primary/5 mt-2"
                  onClick={() => handleSetDefault(address._id)}
                >
                  Set as Default Address
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {addresses.length === 0 && (
        <div className="text-center py-20 bg-muted/20 rounded-3xl border-2 border-dashed border-muted">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold">No saved addresses</h3>
          <p className="text-muted-foreground max-w-xs mx-auto mt-2">
            You haven't saved any addresses yet. Add one to make checkout faster.
          </p>
          <Button className="mt-6 rounded-full px-8">Add Your First Address</Button>
        </div>
      )}
    </div>
  );
}
