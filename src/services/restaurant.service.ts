import axios from 'axios';
import {Food, Restaurant} from '../types/types';

export const fetchAllRestaurant = async ({pageParam = 1}) => {
  try {
    const response = await axios.get(`/restaurant/all/${pageParam}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('fetchAllRestaurant error message: ', error.message);
      return Promise.reject(new Error(error.message));
    } else {
      console.log('fetchAllRestaurant unexpected error: ', error);
      return Promise.reject(new Error('unexpected error'));
    }
  }
};

export const fetchRestaurantById = async (restaurantId: string) => {
  try {
    const response = await axios.get<Restaurant>(`/restaurant/${restaurantId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('fetchRestaurantById error message: ', error.message);
      return Promise.reject(new Error(error.message));
    } else {
      console.log('fetchRestaurantById unexpected error: ', error);
      return Promise.reject(new Error('unexpected error'));
    }
  }
};

export const fetchFeatureCategory = async () => {
  try {
    const response = await axios.get('/featureCategory');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('fetchFeatureCategory error message: ', error.message);
      return Promise.reject(new Error(error.message));
    } else {
      console.log('fetchFeatureCategory unexpected error: ', error);
      return Promise.reject(new Error('unexpected error'));
    }
  }
};

export const fetchFoodById = async (foodId: string) => {
  try {
    const response = await axios.get<Food>('/food/' + foodId);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return Promise.reject(new Error(error.message));
    } else {
      return Promise.reject(new Error('unexpected error'));
    }
  }
};
// ///////
// export const fetchPolpularShop = async ({pageParam = 1}) => {
//   try {
//     const response = await axios.get(`/shop/popular/${pageParam}`);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log('error message: ', error.message);
//       return Promise.reject(new Error(error.message));
//     } else {
//       console.log('unexpected error: ', error);
//       return Promise.reject(new Error('unexpected error'));
//     }
//   }
// };

// export const fetchSearchResults = async (keyword: string) => {
//   try {
//     const response = await axios.get(`/shop/search?q=${keyword}`);
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.log('error message: ', error.message);
//       return Promise.reject(new Error(error.message));
//     } else {
//       console.log('unexpected error: ', error);
//       return Promise.reject(new Error('unexpected error'));
//     }
//   }
// };
