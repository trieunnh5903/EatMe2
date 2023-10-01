import {Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CartScreenProp} from '../types/navigation.type';
import useCartViewModel from '../view-models/useCartViewModel';
import {useCallback} from 'react';
import {FoodObject} from '../types/types';

const useCartController = () => {
  const navigation = useNavigation<CartScreenProp>();
  const {
    cartList,
    clearFoodCart,
    removeFoodItem,
    updateFoodItemQuantity,
    totalCartPrice,
  } = useCartViewModel();
  // tổng số lượng sản phẩm
  const sumQuantityProduct = () => {
    return cartList.reduce((sum, item) => sum + item.quantity, 0);
  };
  // xử lí nút xóa tất cả sản phẩm
  const onDeleteAll = () => {
    Alert.alert(
      'Thông báo',
      'Bạn muốn xóa tất cả sản phẩm không?',
      [
        {
          text: 'Hủy',
          style: 'default',
        },
        {
          text: 'Đồng ý',
          onPress: clearFoodCart,
          style: 'default',
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  // xử lí tăng sản phẩm
  const onIncreasePress = useCallback(
    (item: FoodObject, previousQuantity: number) => {
      const quantity = previousQuantity + 1;
      updateFoodItemQuantity(item, quantity);
    },
    [updateFoodItemQuantity],
  );

  // xử lí giảm sản phẩm
  const onDecreasePress = useCallback(
    (item: FoodObject) => {
      const {id, quantity} = item;
      if (!quantity) {
        return;
      }
      if (quantity > 1) {
        const newQuantity = quantity - 1;
        updateFoodItemQuantity(item, newQuantity);
      } else {
        removeFoodItem(id);
      }
    },
    [removeFoodItem, updateFoodItemQuantity],
  );

  const onBackPress = () => navigation.goBack();
  const onDeleteAllPress = () => onDeleteAll();
  const onGoHomePress = () => navigation.navigate('Home');
  const onCheckoutPress = () =>
    navigation.navigate('EnterAddressScreen', {enableGoogleMap: true});
  return {
    onCheckoutPress,
    onIncreasePress,
    onDecreasePress,
    onBackPress,
    onDeleteAllPress,
    onGoHomePress,
    sumQuantityProduct,
    cartList,
    totalCartPrice,
  };
};

export default useCartController;
