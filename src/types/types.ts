export type FoodObject = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  priceTotal?: number;
  quantity?: number;
};

export interface FoodArray {
  data: FoodObject[];
}
