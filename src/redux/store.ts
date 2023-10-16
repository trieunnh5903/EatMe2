import {configureStore} from '@reduxjs/toolkit';

import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import restaurantSlice from './slice/restaurant.slice';
import cartSlice from './slice/cart.slice';

export const store = configureStore({
  reducer: {
    restaurant: restaurantSlice,
    cart: cartSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: {warnAfter: 128},
      serializableCheck: {warnAfter: 128},
    }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
