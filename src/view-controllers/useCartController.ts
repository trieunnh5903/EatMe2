import {useNavigation} from '@react-navigation/native';
import {CartScreenProp} from '../types/navigation.type';
import useInvoiceViewModel from '../view-models/useInvoiceViewModel';

const useCartController = (idInvoice: string) => {
  const navigation = useNavigation<CartScreenProp['navigation']>();
  const {getDataInvoiceById, increaseQuantity, decreaseQuantity, deleteFood} =
    useInvoiceViewModel();
  const {
    listFood: cartList,
    numOfFood,
    totalPrice,
  } = getDataInvoiceById(idInvoice);

  const onIncreaseFoodFress = (foodId: string) => {
    increaseQuantity(foodId, idInvoice);
  };
  const onDecreaseFoodFress = (foodId: string, quantity: number) => {
    if (quantity > 1) {
      decreaseQuantity(foodId, idInvoice);
    } else {
      deleteFood(foodId, idInvoice);
    }
  };

  const onBackPress = () => navigation.goBack();
  return {
    onIncreaseFoodFress,
    onDecreaseFoodFress,
    onBackPress,
    numOfFood,
    totalPrice,
    cartList,
  };
};

export default useCartController;
