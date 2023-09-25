import useShopModel from '../models/useShopModel';
import {addToFavorite, removeFromFavorite} from '../redux/slice/user.slice';
import {FoodObject} from '../types/types';
import {useAppDispatch, useAppSelector} from '../utils/hooks';

export const useShopViewModel = () => {
  const data = useShopModel();
  const dispatch = useAppDispatch();
  const favoriteList = useAppSelector(state => state.user.favorite);
  const removeFromFavoriteList = (foodItem: FoodObject) => {
    return dispatch(removeFromFavorite(foodItem));
  };

  const addToFavoriteList = (foodItem: FoodObject) => {
    return dispatch(addToFavorite(foodItem));
  };

  return {
    data,
    favoriteList,
    removeFromFavoriteList,
    addToFavoriteList,
  };
};
