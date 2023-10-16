import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {FoodReduxType} from '../../types/types';

interface CartState {
  byId: {
    [id: string]: FoodReduxType[];
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
    createCart: (
      state,
      action: PayloadAction<{
        address: string;
        id: string;
        image: string;
        name: string;
      }>,
    ) => {
      const {id} = action.payload;
      if (state.byId[id] === undefined) {
        state.byId[id] = [];
      }

      if (!state.allIds.includes(id)) {
        state.allIds.push(id);
      }
    },

    updateCart: (
      state,
      action: PayloadAction<{listFood: FoodReduxType[]; restaurantId: string}>,
    ) => {
      console.log('updateCart');
      const {restaurantId, listFood} = action.payload;
      if (state.byId[restaurantId] === undefined) {
        console.log('updateCart undefined');
        return;
      }
      state.byId[restaurantId] = listFood;
    },

    addFood(
      state,
      action: PayloadAction<{food: FoodReduxType; restaurantId: string}>,
    ) {
      const {food, restaurantId} = action.payload;
      const restaurant = state.byId[restaurantId];
      const existingFood = restaurant.find(item => {
        return (
          item.name === food.name &&
          JSON.stringify(item.options) === JSON.stringify(food.options) &&
          JSON.stringify(item.toppings) === JSON.stringify(food.toppings)
        );
      });

      if (existingFood === undefined) {
        restaurant.push(food);
      } else {
        existingFood.quantity += food.quantity;
      }
    },
  },
});

export default cartSlice.reducer;
export const {addFood, createCart, updateCart} = cartSlice.actions;
