import {useShopModel} from '../models/useShopModel';
import {addToFavorite, removeFromFavorite} from '../redux/slice/user.slice';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {Shop} from '../types/types';

export const useShopViewModel = () => {
  const {
    getShopByIdModel,
    useGetPopularShop,
    useGetShopNearBy,
    useSeachShopByName,
  } = useShopModel();
  const getShopById = (shopId: string) => {
    return getShopByIdModel(shopId);
  };
  console.log('useShopViewModel');
  const dispatch = useAppDispatch();
  const favoriteList = useAppSelector(state => state.user.favorite);
  const removeFromFavoriteList = (foodItem: Shop) => {
    return dispatch(removeFromFavorite(foodItem));
  };

  const addToFavoriteList = (foodItem: Shop) => {
    return dispatch(addToFavorite(foodItem));
  };

  return {
    getShopById,
    favoriteList,
    removeFromFavoriteList,
    addToFavoriteList,
    useGetPopularShop,
    useGetShopNearBy,
    useSeachShopByName,
  };
};
