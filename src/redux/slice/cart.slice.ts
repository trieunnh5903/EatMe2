import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {FoodObject} from '../../types/types';

interface CartState {
  cartList: FoodObject[];
  totalCartPrice: number;
  totalProductQuantity: number;
}

export const addItem = createAsyncThunk(
  'cart/addItemMiddleware',
  (item: FoodObject, {dispatch}) => {
    dispatch(cartSlice.actions.addItem(item));
    dispatch(cartSlice.actions.calculateTotalCart());
  },
);

export const updateItemQuantity = createAsyncThunk(
  'cart/updateItemQuantityMiddleware',
  (payload: FoodObject, {dispatch}) => {
    dispatch(cartSlice.actions.updateItemQuantity(payload));
    dispatch(cartSlice.actions.calculateTotalCart());
  },
);

export const removeItem = createAsyncThunk(
  'cart/removeItemMiddleware',
  (itemIdToRemove: string, {dispatch}) => {
    dispatch(cartSlice.actions.removeItem(itemIdToRemove));
    dispatch(cartSlice.actions.calculateTotalCart());
  },
);

export const clearCart = createAsyncThunk(
  'cart/clearCartMiddleware',
  (_payload, {dispatch}) => {
    dispatch(cartSlice.actions.clearCart());
    dispatch(cartSlice.actions.calculateTotalCart());
  },
);

const initialState: CartState = {
  cartList: [],
  totalCartPrice: 0,
  totalProductQuantity: 0,
};

const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addItem(state, action: PayloadAction<FoodObject>) {
      const newItem = action.payload;
      if (newItem.quantity !== undefined) {
        const priceTotal =
          parseFloat((newItem.quantity * Number(newItem.price)).toFixed(2)) ||
          0;
        state.cartList.push({...newItem, priceTotal});
      }
    },
    updateItemQuantity(state, action: PayloadAction<FoodObject>) {
      const {quantity, id: itemId} = action.payload;
      const newCartList = state.cartList.map(item => {
        if (item.id === itemId && quantity !== undefined) {
          const priceTotal =
            parseFloat((quantity * Number(item.price)).toFixed(3)) || 0;
          return {...item, quantity, priceTotal};
        }
        return item;
      });
      state.cartList = newCartList;
    },
    calculateTotalCart(state) {
      state.totalCartPrice = parseFloat(
        state.cartList
          .reduce((total, item) => {
            if (item.priceTotal === undefined) {
              return 0;
            }
            return (total += item.priceTotal);
          }, 0)
          .toFixed(2),
      );

      state.totalProductQuantity = state.cartList.reduce((total, item) => {
        if (item.quantity === undefined) {
          return 0;
        }
        return total + item.quantity;
      }, 0);
    },
    removeItem(state, action: PayloadAction<string>) {
      const itemIdToRemove = action.payload;
      state.cartList = state.cartList.filter(
        item => item.id !== itemIdToRemove,
      );
    },
    clearCart(state) {
      state.cartList = [];
    },
  },
});

export default cartSlice.reducer;
