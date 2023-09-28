import {
  fetchAllFoods,
  fetchPolpularFood,
  fetchSearchResults,
} from '../services/food.service';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

export const useFoodNearByModel = () => {
  const result = useInfiniteQuery({
    queryKey: ['foodNearBy'],
    queryFn: fetchAllFoods,
    getNextPageParam: (_lastPage, allPage) => {
      return allPage.length + 1;
    },
  });
  return result;
};

// export const useFoodNearByModel = () => {
//   const result = useQuery({
//     queryKey: ['foodNearBy'],
//     queryFn: fetchAllFoods,
//   });
//   return result;
// };

export const usePopularFoodModel = () => {
  const result = useInfiniteQuery({
    queryKey: ['foodPopular'],
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
