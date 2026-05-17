import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useGetCartQuery, useAddToCartMutation, useRemoveFromCartMutation, useClearCartMutation } from '@/services/cartApi';

interface CartState {
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
    setError: (state, { payload }: PayloadAction<string | null>) => {
      state.error = payload;
    },
  },
});

export const { setLoading, setError } = cartSlice.actions;
export default cartSlice.reducer;
