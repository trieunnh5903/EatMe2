import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {FoodObject} from '../../types/types';

interface UserState {
  logged: boolean;
  favorite: FoodObject[];
  address: {name: string; location: string}[];
}

const initialState: UserState = {
  logged: false,
  favorite: [],
  address: [
    {
      name: 'Nhà',
      location: '214/66 Nguyễn Oanh, phường 17, Gò Vấp, Thành phố Hồ Chí Minh',
    },
  ],
};
const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    changeLoginSate: (state, action: PayloadAction<boolean>) => {
      state.logged = action.payload;
    },
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

export const {
  addToFavorite,
  removeFromFavorite,
  addAddress,
  removeAddress,
  changeLoginSate,
} = userSlice.actions;

export default userSlice.reducer;
