export type FoodObject = {
  id: string;
  name: string;
  description: string;
  categories: number[];
  price: number;
  calories: number;
  image: string;
  priceTotal: number;
  quantity: number;
};

export interface FoodArray {
  data: FoodObject[];
}
