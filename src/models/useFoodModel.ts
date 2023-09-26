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
