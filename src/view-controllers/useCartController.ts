import {useNavigation} from '@react-navigation/native';
import {CartScreenProp} from '../types/navigation.type';
import useCartViewModel from '../view-models/useCartViewModel';
import useInvoiceViewModel from '../view-models/useInvoiceViewModel';

const useCartController = (idInvoice: string) => {
  const navigation = useNavigation<CartScreenProp['navigation']>();
  const {
    // cartList,
    // clearFoodCart,
    // removeFoodItem,
    // updateFoodItemQuantity,
    // totalCartPrice,
  } = useCartViewModel();
  const {getDataInvoiceById} = useInvoiceViewModel();
  // tổng số lượng sản phẩm
  // const sumQuantityProduct = () => {
  //   return cartList.reduce((sum, item) => sum + item.quantity, 0);
  // };
  // xử lí nút xóa tất cả sản phẩm
  // const onDeleteAll = () => {
  //   Alert.alert(
  //     'Thông báo',
  //     'Bạn muốn xóa tất cả sản phẩm không?',
  //     [
  //       {
  //         text: 'Hủy',
  //         style: 'default',
  //       },
  //       {
  //         text: 'Đồng ý',
  //         onPress: clearFoodCart,
  //         style: 'default',
  //       },
  //     ],
  //     {
  //       cancelable: false,
  //     },
  //   );
  // };

  const {
    listFood: cartList,
    numOfFood,
    totalPrice,
  } = getDataInvoiceById(idInvoice);
  // xử lí tăng sản phẩm
  // const onIncreasePress = useCallback(
  //   (item: Shop, previousQuantity: number) => {
  //     const quantity = previousQuantity + 1;
  //     updateFoodItemQuantity(item, quantity);
  //   },
  //   [updateFoodItemQuantity],
  // );

  // xử lí giảm sản phẩm
  // const onDecreasePress = useCallback(
  //   (item: Shop) => {
  //     const {id, quantity} = item;
  //     if (!quantity) {
  //       return;
  //     }
  //     if (quantity > 1) {
  //       const newQuantity = quantity - 1;
  //       updateFoodItemQuantity(item, newQuantity);
  //     } else {
  //       removeFoodItem(id);
  //     }
  //   },
  //   [removeFoodItem, updateFoodItemQuantity],
  // );

  const onBackPress = () => navigation.goBack();
  // const onDeleteAllPress = () => onDeleteAll();
  // const onGoHomePress = () => navigation.goBack();
  // const onCheckoutPress = () =>
  //   navigation.navigate('EnterAddressScreen', {enableGoogleMap: true});
  return {
    // onIncreasePress,
    // onDecreasePress,
    onBackPress,
    // onDeleteAllPress,
    // onGoHomePress,
    // sumQuantityProduct,
    numOfFood,
    totalPrice,
    cartList,
    // totalCartPrice,
  };
};

export default useCartController;
