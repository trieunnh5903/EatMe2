import {HomeNavigationProps} from '../navigation/types';

export type FoodObjectProps = {
  id: string;
  name: string;
  description: string;
  categories: number[];
  price: number;
  calories: number;
  image: string;
};

export interface FoodArrayProps {
  data: FoodObjectProps[];
}
