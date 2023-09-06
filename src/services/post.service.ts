import axios from 'axios';

export const fetchAllFoods = async (pageParam: number) => {
  try {
    const response = await axios.get(
      `http://192.168.1.4:3000/products/${pageParam}`,
    );
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
