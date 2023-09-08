export type FoodObject = {
  id: string;
  name: string;
  description: string;
  categories: number[];
  price: string;
  calories: number;
  image: string;
  priceTotal: number;
  quantity: number;
};

export interface FoodArray {
  data: FoodObject[];
}
