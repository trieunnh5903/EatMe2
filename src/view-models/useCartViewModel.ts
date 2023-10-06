import {
  addInvoice,
  clearCart,
  removeItem,
  updateItemQuantity,
} from '../redux/slice/cart.slice';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {Shop, ShopDetailWithQuantity} from '../types/types';

const useCartViewModel = () => {
  const {invoices, totalCartPrice} = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const clearFoodCart = () => dispatch(clearCart());

  const updateFoodItemQuantity = (item: Shop, newQuantity: number) => {
    // return dispatch(updateItemQuantity({...item, quantity: newQuantity}));
  };

  const removeFoodItem = (id: string) => {
    return dispatch(removeItem(id));
  };

  const addInvoiceToCart = (item: ShopDetailWithQuantity) => {
    dispatch(addInvoice(item));
  };

  return {
    addInvoiceToCart,
    invoices,
    removeFoodItem,
    totalCartPrice,
    clearFoodCart,
    updateFoodItemQuantity,
  };
};

export default useCartViewModel;
