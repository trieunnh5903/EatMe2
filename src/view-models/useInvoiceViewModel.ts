import {
  addFood,
  decreaseFoodQuantity,
  increaseFoodQuantity,
  removeAllFood,
  removeFood,
} from '../redux/slice/invoices.slice';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {FoodReduxType, Shop} from '../types/types';

const useInvoiceViewModel = () => {
  console.log('useInvoiceViewModel');
  const {allIds, byId} = useAppSelector(state => state.invoice);
  const dispatch = useAppDispatch();

  const addFoodToInvoice = (food: FoodReduxType, shop: Shop) => {
    console.log('addFoodToInvoice');
    dispatch(addFood({food, shop}));
  };

  const getDataInvoiceById = (invoiceId: string) => {
    return byId[invoiceId];
  };

  const increaseQuantity = (foodId: string, invoiceId: string) => {
    dispatch(increaseFoodQuantity({foodId, invoiceId}));
  };

  const decreaseQuantity = (foodId: string, invoiceId: string) => {
    dispatch(decreaseFoodQuantity({foodId, invoiceId}));
  };

  const deleteFood = (foodId: string, invoiceId: string) => {
    dispatch(removeFood({foodId, invoiceId}));
  };

  const deleteAllFood = (invoiceId: string) => {
    dispatch(removeAllFood({invoiceId}));
  };
  return {
    deleteAllFood,
    deleteFood,
    increaseQuantity,
    decreaseQuantity,
    getDataInvoiceById,
    addFoodToInvoice,
    allIds,
    byId,
  };
};

export default useInvoiceViewModel;
