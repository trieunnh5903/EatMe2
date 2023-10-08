export interface ShopOptionGroup {
  title: string;
  optionGroup: {option: string; price: number}[];
}

export interface ShopOption {
  title: string;
  option: string;
  price: number;
}

export interface ShopTopping {
  name: string;
  price: number;
  quantity: number;
}
export interface ShopToppings {
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
  options?: ShopOptionGroup[];
  toppings?: ShopToppings;
}

export interface FoodWithQuantity extends Food {
  quantity: number;
}

export type Shop = {
  id: string;
  name: string;
  image: string;
  address: string;
  // listFood?: Food[];
  // totalPrice?: number;
};

export interface FoodReduxType {
  id: string;
  name: string;
  description?: string;
  price: number;
  image: string;
  quantity: number;
  options?: ShopOption[];
  toppings?: ShopTopping[];
  // totalPrice: number;
}

// export interface Invoice extends Shop {
//   listFood: {
//     id: string;
//     name: string;
//     description?: string;
//     price: number;
//     image: string;
//     quantity: number;
//     options?: ShopOption[];
//     toppings?: ShopTopping[];
//     totalPrice: number;
//   }[];
// }

export interface Invoice extends Shop {
  totalPrice: number;
  // foodIds: string[];
  listFood: FoodReduxType[];
}
