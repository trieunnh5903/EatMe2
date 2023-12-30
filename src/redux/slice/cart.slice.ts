import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {FoodRedux} from '../../types/types';

// save food
interface CartState {
  byId: {
    // id restaurant : list food
    [id: string]: FoodRedux[];
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
      action: PayloadAction<{listFood: FoodRedux[]; restaurantId: string}>,
    ) => {
      const {restaurantId, listFood} = action.payload;
      if (state.byId[restaurantId] === undefined) {
        return;
      }
      if (listFood.length === 0) {
        state.allIds = state.allIds.filter(id => id !== restaurantId);
        delete state.byId[restaurantId];
      }
      state.byId[restaurantId] = listFood;
    },

    addFood(
      state,
      action: PayloadAction<{food: FoodRedux; restaurantId: string}>,
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

    updateFood: (
      state,
      action: PayloadAction<{restaurantId: string; newFood: FoodRedux}>,
    ) => {
      const {newFood, restaurantId} = action.payload;
      const restaurant = state.byId[restaurantId];
      const newRestaurant = restaurant.map(item =>
        item.id === newFood.id ? newFood : item,
      );
      state.byId[restaurantId] = newRestaurant;
    },

    deleteAllFoodPerRestaurant: (state, action: PayloadAction<string[]>) => {
      const restaurantIdsToDelete = action.payload;
      restaurantIdsToDelete.forEach(restaurantId => {
        if (state.byId[restaurantId]) {
          state.allIds = state.allIds.filter(id => id !== restaurantId);
          delete state.byId[restaurantId];
        }
      });
    },
  },
});

export default cartSlice.reducer;
export const {
  addFood,
  updateFood,
  deleteAllFoodPerRestaurant,
  createCart,
  updateCart,
} = cartSlice.actions;
