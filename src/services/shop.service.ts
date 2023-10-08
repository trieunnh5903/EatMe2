import axios from 'axios';

export const fetchAllShops = async ({pageParam = 1}) => {
  try {
    const response = await axios.get(`/shop/${pageParam}`);
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

export const fetchPolpularShop = async ({pageParam = 1}) => {
  try {
    const response = await axios.get(`/shop/popular/${pageParam}`);
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

export const fetchSearchResults = async (keyword: string) => {
  try {
    const response = await axios.get(`/shop/search?q=${keyword}`);
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