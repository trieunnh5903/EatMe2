export interface RestaurantOptionGroup {
  title: string;
  optionGroup: {option: string; price: number}[];
}

export interface RestaurantOption {
  title: string;
  option: string;
  price: number;
}

export interface RestaurantTopping {
  name: string;
  price: number;
  quantity: number;
}
export interface RestaurantToppings {
  title: string;
  maximum: number;
  data: {
    name: string;
    price: number;
    quantity?: number;
  }[];
}

export interface Food {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  quantity?: number;
  options?: RestaurantOptionGroup[];
  toppings?: RestaurantToppings;
}

export interface FoodWithQuantity extends Food {
  quantity: number;
}

export type Restaurant = {
  id: string;
  name: string;
  image: string;
  address: string;
  allFoods: {
    bestSeller: Food[];
    menuFoods: {
      label: string;
      foods: Food[];
    }[];
  };
  // totalPrice?: number;
};

export interface FoodReduxType {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  quantity: number;
  options?: RestaurantOption[];
  toppings?: RestaurantTopping[];
  // totalPrice: number;
}

export interface Invoice extends Restaurant {
  totalPrice: number;
  numOfFood: number;
  listFood: FoodReduxType[];
}

export interface RestaurantInformation {
  address: string;
  id: string;
  image: string;
  name: string;
  bestSeller: Food[];
}
