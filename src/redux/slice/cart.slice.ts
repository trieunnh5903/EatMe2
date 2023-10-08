import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {FoodReduxType} from '../../types/types';

interface CartState {
  byId: {
    [id: string]: FoodReduxType;
  };
  allIds: string[];
}

const initialState: CartState = {
  byId: {},
  allIds: [],
};

const cartSlice = createSlice({
  initialState,
  name: 'cart',
  reducers: {
    addFood(state, action: PayloadAction<FoodReduxType>) {
      const {id} = action.payload;
      state.byId[id] = action.payload;
      const isEsixtingId = state.allIds.find(item => item === id);
      if (isEsixtingId === undefined) {
        state.allIds.push(id);
      }
    },
    // updateFoodQuantity(state, action: PayloadAction<FoodReduxType>) {
    //   const {quantity} = action.payload;
    //   const newCartList = state.foods.map(item => {
    //     if (JSON.stringify(item) === JSON.stringify(action.payload)) {
    //       return {...item, quantity: item.quantity + quantity};
    //     }
    //     return item;
    //   });
    //   state.foods = newCartList;
    // },
  },
});

export default cartSlice.reducer;
export const {addFood} = cartSlice.actions;
