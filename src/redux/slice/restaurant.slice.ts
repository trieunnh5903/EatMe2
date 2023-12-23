import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RestaurantInformation} from '../../types/types';

// save restaurant information
interface RestaurantState {
  currentRestaurant: RestaurantInformation;
  byId: {
    [id: string]: RestaurantInformation;
  };
  allIds: string[];
}

const initialState: RestaurantState = {
  byId: {},
  allIds: [],
  currentRestaurant: {
    bestSeller: [],
    address: '',
    id: '',
    image: '',
    name: '',
  },
};

const restaurantSlice = createSlice({
  initialState,
  name: 'restaurant',
  reducers: {
    setRestaurant(state, action: PayloadAction<RestaurantInformation>) {
      const restaurant = action.payload;
      state.currentRestaurant = restaurant;
    },

    addRestaurant(state, action: PayloadAction<RestaurantInformation>) {
      const restaurant = action.payload;
      state.byId[restaurant.id] = restaurant;
      if (!state.allIds.includes(restaurant.id)) {
        state.allIds.push(restaurant.id);
      }
    },

    deleteRestaurant(state, action: PayloadAction<string[]>) {
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
  },
});

export default restaurantSlice.reducer;
export const {setRestaurant, addRestaurant, deleteRestaurant} =
  restaurantSlice.actions;
