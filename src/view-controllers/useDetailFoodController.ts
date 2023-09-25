import {useState} from 'react';
import {
  AnimatedStyleProp,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {FoodObject} from '../types/types';
import useCartViewModel from '../view-models/useCartViewModel';
import {useNavigation} from '@react-navigation/native';
import {DetailFoodNavigationProps} from '../navigation/types';
import {SIZES} from '../config';
import {ViewStyle} from 'react-native';

const HEADER_MAX_HEIGHT = SIZES.height * 0.3;
const useDetailFoodController = () => {
  const navigation = useNavigation<DetailFoodNavigationProps['navigation']>();
  const [quantity, setQuantity] = useState<number>(1);
  const scrollY = useSharedValue(0);
  const {cartList, updateFoodItemQuantity, addItemToCart} = useCartViewModel();

  const animtedStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_MAX_HEIGHT],
      [0, HEADER_MAX_HEIGHT * 0.75],
    );

    const scale = interpolate(scrollY.value, [0, HEADER_MAX_HEIGHT], [1, 0.75]);

    return {
      transform: [{translateY}, {scale}],
    } as AnimatedStyleProp<ViewStyle>;
  });

  const onListViewScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const onBackPress = () => navigation.goBack();
  const onAddPress = () => setQuantity(value => value + 1);
  const onRemovePress = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  const onAddToCartPress = (item: FoodObject) => {
    const existingItem = cartList.find(
      (itemCart: FoodObject) => itemCart.id === item.id,
    );
    if (existingItem) {
      if (quantity === 1) {
        updateFoodItemQuantity(item, existingItem.quantity + 1);
      } else {
        updateFoodItemQuantity(item, existingItem.quantity + quantity);
      }
    } else {
      addItemToCart(item, quantity);
    }
    navigation.goBack();
  };

  return {
    quantity,
    onBackPress,
    onRemovePress,
    onAddPress,
    onListViewScroll,
    animtedStyles,
    onAddToCartPress,
  };
};

export default useDetailFoodController;
