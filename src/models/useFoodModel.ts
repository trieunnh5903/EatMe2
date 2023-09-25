import {nanoid} from '@reduxjs/toolkit';
import {FoodObject} from '../types/types';
import {
  fetchPolpularFood,
  fetchSearchResults,
  useGetAllFood,
} from '../services/food.service';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

export const useFoodNearByModel = () => {
  const {
    data: foodNearYou,
    error: errorFoodNearYou,
    fetchNextPage: fetchNextPageFoodNearYou,
    isFetching: isFetchingFoodNearYou,
    isFetchingNextPage: isFetchingNextPageFoodNearYou,
    status: statusFoodNearYou,
  } = useGetAllFood();
  return {
    errorFoodNearYou,
    foodNearYou,
    fetchNextPageFoodNearYou,
    isFetchingFoodNearYou,
    isFetchingNextPageFoodNearYou,
    statusFoodNearYou,
  };
};

const _enerateArray = (n: number) => {
  let data = new Array<FoodObject>(n);
  for (let i = 0; i < n; i++) {
    data[i] = {
      id: nanoid(),
      name: `Hamburger ${i}`,
      description: 'Hamburger thịt gà',
      priceTotal: 0,
      price: 20000,
      image:
        'https://images.foody.vn/res/g2/11349/prof/s408x200/image-3111762a-200910114155.jpeg',
    };
  }
  return data;
};

export const usePopularFoodModel = () => {
  const result = useInfiniteQuery({
    queryKey: ['food'],
    queryFn: fetchPolpularFood,
    getNextPageParam: (_lastPage, allPage) => {
      return allPage.length + 1;
    },
  });
  return result;
};

export const useSeachFoodByNameModel = (keyword: string) => {
  const result = useQuery({
    queryKey: ['search', keyword],
    queryFn: async () => {
      const data = await fetchSearchResults(keyword);
      return data;
    },
    enabled: !!keyword,
  });

  return result;
};
