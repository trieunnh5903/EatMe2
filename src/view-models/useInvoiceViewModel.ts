import {addFood, increaseFoodQuantity} from '../redux/slice/invoices.slice';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {FoodReduxType, Shop} from '../types/types';

const useInvoiceViewModel = () => {
  const {allIds, byId} = useAppSelector(state => state.invoice);
  const dispatch = useAppDispatch();

  const addFoodToInvoice = (food: FoodReduxType, shop: Shop) => {
    dispatch(addFood({food, shop}));
  };

  const getDataInvoiceById = (invoiceId: string) => {
    return byId[invoiceId];
  };

  const increaseQuantity = (foodId: string, invoiceId: string) => {
    dispatch(increaseFoodQuantity({foodId, invoiceId}));
  };

  return {
    increaseQuantity,
    getDataInvoiceById,
    addFoodToInvoice,
    allIds,
    byId,
  };
};

export default useInvoiceViewModel;
