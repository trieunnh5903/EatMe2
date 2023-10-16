import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {RestaurantInformation} from '../../types/types';

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
    address: '',
    id: '',
    image: '',
    name: '',
  },
};

const restaurantSlice = createSlice({
  initialState,
  name: 'cart',
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
  },
});

export default restaurantSlice.reducer;
export const {setRestaurant, addRestaurant} = restaurantSlice.actions;
