import {
  useFoodNearByModel,
  usePopularFoodModel,
  useSeachFoodByNameModel,
} from '../models/useFoodModel';

export const useFoodNearByViewModel = () => {
  return useFoodNearByModel();
};

export const usePopularFoodViewModel = () => {
  return usePopularFoodModel();
};

export const useSeachFoodByNameViewModel = (keyword: string) => {
  return useSeachFoodByNameModel(keyword);
};
