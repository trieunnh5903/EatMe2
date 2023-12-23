import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {FoodRedux} from '../../types/types';

// lưu danh sách món ăn
interface CartState {
  byId: {
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

    deleteFood: (state, action: PayloadAction<string[]>) => {
      const restaurantIdsToDelete = action.payload;
      restaurantIdsToDelete.forEach(restaurantId => {
        // Kiểm tra xem nhà hàng có tồn tại
        if (state.byId[restaurantId]) {
          // Xóa ID nhà hàng khỏi mảng allIds
          state.allIds = state.allIds.filter(id => id !== restaurantId);
          // Xóa nhà hàng khỏi trạng thái
          delete state.byId[restaurantId];
        }
      });
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
  },
});

export default cartSlice.reducer;
export const {addFood, createCart, updateCart, deleteFood} = cartSlice.actions;
