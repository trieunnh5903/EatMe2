import {useInfiniteQuery} from '@tanstack/react-query';
import axios from 'axios';

const fetchAllFoods = async ({pageParam = 1}) => {
  try {
    const response = await axios.get(`/products/${pageParam}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return Promise.reject(new Error(error.message));
    } else {
      console.log('unexpected error: ', error);
      return Promise.reject(new Error('unexpected error'));
    }
  }
};

export const useGetAllFood = () => {
  const result = useInfiniteQuery({
    queryKey: ['food'],
    queryFn: fetchAllFoods,
    getNextPageParam: (_lastPage, allPage) => {
      return allPage.length + 1;
    },
  });
  return result;
};

export const fetchSearchResults = async (keyword: string) => {
  try {
    const response = await axios.get(`/products/search?q=${keyword}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('error message: ', error.message);
      return Promise.reject(new Error(error.message));
    } else {
      console.log('unexpected error: ', error);
      return Promise.reject(new Error('unexpected error'));
    }
  }
};
