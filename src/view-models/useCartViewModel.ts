import {addFood} from '../redux/slice/cart.slice';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {FoodReduxType} from '../types/types';

const useCartViewModel = () => {
  console.log('useCartViewModel');
  // const {allIds, byId} = useAppSelector(state => state.cart);
  // const dispatch = useAppDispatch();
  // const clearFoodCart = () => dispatch(clearCart());

  // const updateFoodItemQuantity = (item: Shop, newQuantity: number) => {
  //   // return dispatch(updateItemQuantity({...item, quantity: newQuantity}));
  // };

  // const removeFoodItem = (id: string) => {
  //   return dispatch(removeItem(id));
  // };

  // const addInvoiceToCart = (item: ShopDetailWithQuantity) => {
  //   dispatch(addInvoice(item));
  // };

  // const addFoodToCart = (food: FoodReduxType) => {
  //   dispatch(addFood(food));
  };

  // const updateQuantityFood = (food: FoodReduxType) => {
  //   dispatch(updateFoodQuantity(food));
  // };

  return {addFoodToCart, byId, allIds};
};

export default useCartViewModel;
