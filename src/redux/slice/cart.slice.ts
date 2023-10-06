import {PayloadAction, createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {Shop, ShopDetail, ShopDetailWithQuantity} from '../../types/types';

interface CartState {
  invoices: ShopDetailWithQuantity[];
  totalCartPrice: number;
  totalProductQuantity: number;
}

// { ids: [
//   1,2,3
// ], entities: {
//   1: {
//     id: string;
//     name: string;
//     image: string;
//     address: string;
//     listFood: {
//       ids: [1,2,5],
//       entities: {
//         1: {
//           id: string;
//           name: string;
//           description?: string;
//           price: number;
//           image: string;
//           quantity?: number;
//           options?: ShopOptionGroup[];
//           toppings?: ShopToppings;
//         }
//       }
//     };
//     totalPrice: number;
//   }
// } }

export const addInvoice = createAsyncThunk(
  'cart/addInvoiceMiddleware',
  (item: ShopDetailWithQuantity, {dispatch}) => {
    dispatch(cartSlice.actions.addInvoice(item));
    // dispatch(cartSlice.actions.calculateTotalCart());
  },
);

// export const updateItemQuantity = createAsyncThunk(
//   'cart/updateItemQuantityMiddleware',
//   (payload: Shop, {dispatch}) => {
//     // dispatch(cartSlice.actions.updateItemQuantity(payload));
//     // dispatch(cartSlice.actions.calculateTotalCart());
//   },
// );

// export const removeItem = createAsyncThunk(
//   'cart/removeItemMiddleware',
//   (itemIdToRemove: string, {dispatch}) => {
//     // dispatch(cartSlice.actions.removeItem(itemIdToRemove));
//     // dispatch(cartSlice.actions.calculateTotalCart());
//   },
// );

// export const clearCart = createAsyncThunk(
//   'cart/clearCartMiddleware',
//   (_payload, {dispatch}) => {
//     // dispatch(cartSlice.actions.clearCart());
//     // dispatch(cartSlice.actions.calculateTotalCart());
//   },
// );

const initialState: CartState = {
  invoices: [],
  totalCartPrice: 0,
  totalProductQuantity: 0,
};

const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addInvoice(state, action: PayloadAction<ShopDetailWithQuantity>) {
      const newInvoice = action.payload;
      // const existingInvoice = state.invoices.find(
      //   invoice => invoice.id === newInvoice.id,
      // );
      // if (existingInvoice) {
      //   const existingItem = existingInvoice.listFood.find(
      //     item => item.id === newInvoice.id,
      //   );
      //   if (existingItem) {
      //     // Món ăn đã tồn tại, cập nhật số lượng
      //     existingItem.quantity += newInvoice.quantity || 0;
      //   } else {
      //     // Món ăn chưa tồn tại, thêm vào danh sách
      //     invoice.items.push(newItem);
      //   }
      // }
      state.invoices.push(newInvoice);
      // if (newItem.quantity !== undefined) {
      //   const priceTotal =
      //     parseFloat((newItem.quantity * Number(newItem.price)).toFixed(2)) ||
      //     0;
      //   state.cartList.push({...newItem, priceTotal});
      // }
    },
    // removeInvoice: (state, action: PayloadAction<string>) => {
    //   state.invoices = state.invoices.filter(
    //     invoice => invoice.id !== action.payload,
    //   );
    // },

    // updateInvoiceQuantity: (state, action) => {
    //   const {invoiceId, itemId, newQuantity} = action.payload;
    //   const invoice = state.invoices.find(invoice => invoice.id === invoiceId);
    //   if (invoice?.listFood) {
    //     const item = invoice.listFood.find(item => item.id === itemId);
    //     if (item) {
    //       item.quantity = newQuantity;
    //     }
    //   }
    // },

    // updateItemQuantity(state, action: PayloadAction<Shop>) {
    //   const {quantity, id: itemId} = action.payload;
    //   const newCartList = state.cartList.map(item => {
    //     if (item.id === itemId && quantity !== undefined) {
    //       const priceTotal =
    //         parseFloat((quantity * Number(item.price)).toFixed(3)) || 0;
    //       return {...item, quantity, priceTotal};
    //     }
    //     return item;
    //   });
    //   state.cartList = newCartList;
    // },
    // calculateTotalCart(state) {
    //   state.totalCartPrice = parseFloat(
    //     state.cartList
    //       .reduce((total, item) => {
    //         if (item.priceTotal === undefined) {
    //           return 0;
    //         }
    //         return (total += item.priceTotal);
    //       }, 0)
    //       .toFixed(2),
    //   );

    //   state.totalProductQuantity = state.cartList.reduce((total, item) => {
    //     if (item.quantity === undefined) {
    //       return 0;
    //     }
    //     return total + item.quantity;
    //   }, 0);
    // },
    // removeItem(state, action: PayloadAction<string>) {
    //   const itemIdToRemove = action.payload;
    //   state.cartList = state.cartList.filter(
    //     item => item.id !== itemIdToRemove,
    //   );
    // },
    // clearCart(state) {
    //   state.cartList = [];
    // },
  },
});

export default cartSlice.reducer;
