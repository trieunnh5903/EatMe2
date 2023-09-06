import {configureStore} from '@reduxjs/toolkit';
import cartSlice from './slice/cart.slice';
import userSlice from './slice/user.slice';

export const store = configureStore({
  reducer: {
    cart: cartSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
