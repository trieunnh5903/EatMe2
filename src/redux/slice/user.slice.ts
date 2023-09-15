import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {FoodObject} from '../../screens/types';

interface UserState {
  favorite: FoodObject[];
  address: {name: string; location: string}[];
}

const initialState: UserState = {
  favorite: [],
  address: [],
};
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<FoodObject>) => {
      state.favorite.push(action.payload);
    },
    removeFromFavorite: (state, action: PayloadAction<FoodObject>) => {
      const index = state.favorite.findIndex(
        item => item.id === action.payload.id,
      );
      if (index !== -1) {
        state.favorite.splice(index, 1);
      }
    },
    addAddress: (
      state,
      action: PayloadAction<{name: string; location: string}>,
    ) => {
      const index = state.address.findIndex(
        item => item.name === action.payload.name,
      );
      if (index !== -1) {
        state.address.splice(index, 1, action.payload);
      }
    },
    removeAddress: (
      state,
      action: PayloadAction<{name: string; location: string}>,
    ) => {
      const index = state.address.findIndex(
        item => item.name === action.payload.name,
      );
      if (index !== -1) {
        state.address.splice(index, 1);
      }
    },
  },
});

export const {addToFavorite, removeFromFavorite, addAddress, removeAddress} =
  userSlice.actions;

export default userSlice.reducer;
