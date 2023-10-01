import {
  addItem,
  clearCart,
  removeItem,
  updateItemQuantity,
} from '../redux/slice/cart.slice';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {FoodObject} from '../types/types';

const useCartViewModel = () => {
  const {cartList, totalCartPrice} = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const clearFoodCart = () => dispatch(clearCart());

  const updateFoodItemQuantity = (item: FoodObject, newQuantity: number) => {
    return dispatch(updateItemQuantity({...item, quantity: newQuantity}));
  };

  const removeFoodItem = (id: string) => {
    return dispatch(removeItem(id));
  };

  const addItemToCart = (item: FoodObject, quantity: number) => {
    return dispatch(addItem({...item, quantity}));
  };

  return {
    addItemToCart,
    cartList,
    removeFoodItem,
    totalCartPrice,
    clearFoodCart,
    updateFoodItemQuantity,
  };
};

export default useCartViewModel;
