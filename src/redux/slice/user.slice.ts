import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {FoodObject} from '../../screens/types';

interface UserState {
  favorite: FoodObject[];
}

const initialState: UserState = {
  favorite: [],
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
  },
});

export const {addToFavorite, removeFromFavorite} = userSlice.actions;

export default userSlice.reducer;
