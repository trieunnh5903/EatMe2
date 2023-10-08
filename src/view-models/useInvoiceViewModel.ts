import {addFood, createInvoice} from '../redux/slice/invoices.slice';
import {useAppDispatch, useAppSelector} from '../redux/store';
import {FoodReduxType, Shop} from '../types/types';

const useInvoiceViewModel = () => {
  const {allIds, byId} = useAppSelector(state => state.invoice);
  const dispatch = useAppDispatch();
  const addInvoiceToCart = (shop: Shop) => {
    dispatch(createInvoice(shop));
  };

  const addFoodToInvoice = (food: FoodReduxType, idInvoice: string) => {
    dispatch(addFood({food, idInvoice}));
  };

  const getDataInvoiceById = (invoiceId: string) => {
    return byId[invoiceId];
  };

  return {
    getDataInvoiceById,
    addFoodToInvoice,
    addInvoiceToCart,
    allIds,
    byId,
  };
};

export default useInvoiceViewModel;
