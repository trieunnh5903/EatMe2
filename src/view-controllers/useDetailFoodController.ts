import {useState} from 'react';
import {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';
import {DetailFoodNavigationProps} from '../types/navigation.type';
import {COLORS, SIZES} from '../config';
import {NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {Food, ShopOption, ShopTopping} from '../types/types';

const HEADER_HEIGHT = 50;
const useDetailFoodController = (foodItem: Food) => {
  const navigation = useNavigation<DetailFoodNavigationProps['navigation']>();
  const {toppings: toppingData, options} = foodItem;
  const [quantity, setQuantity] = useState<number>(1);
  const scrollY = useSharedValue(0);
  const [selectedOption, setSelectedOption] = useState<ShopOption[]>([]);
  const [topping, setTopping] = useState<ShopTopping[]>([]);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, SIZES.height * 0.3 - HEADER_HEIGHT],
      [0, 1],
    );
    return {
      opacity,
    };
  });

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollY.value = event.nativeEvent.contentOffset.y;
  };

  const tintColorIconClose = useAnimatedStyle(() => {
    const tintColor = interpolateColor(
      scrollY.value,
      [0, SIZES.height * 0.3 - HEADER_HEIGHT],
      [COLORS.white, COLORS.black],
    );
    return {
      tintColor,
    };
  });

  const bgColorIconClose = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scrollY.value,
      [0, SIZES.height * 0.3 - HEADER_HEIGHT],
      [COLORS.black06, COLORS.white],
    );
    return {
      backgroundColor,
    };
  });

  const onIncreasePress = (
    name: string,
    price: number,
    currentQuantity: number = 0,
  ) => {
    const currentItem = topping.find(item => item.name === name);
    if (currentItem) {
      const newArr = topping.map(item => {
        if (item.name === currentItem.name) {
          return {...item, quantity: currentQuantity + 1};
        } else {
          return item;
        }
      });
      setTopping(newArr);
    } else {
      const newArr = [...topping, {name: name, price: price, quantity: 1}];
      setTopping(newArr);
    }
  };

  const onDecreasePress = (name: string, currentQuantity: number = 0) => {
    if (toppingData) {
      const currentItem = toppingData.data.find(item => item.name === name);
      if (currentItem) {
        const newArr = topping.map(item => {
          if (item.name === currentItem.name) {
            if (item.quantity === 1) {
              return null;
            } else {
              return {...item, quantity: currentQuantity - 1};
            }
          }
          return item;
        });
        const filteredTopping = newArr.filter(
          item => item !== null,
        ) as ShopTopping[];
        setTopping(filteredTopping);
      }
    }
  };

  const canAddToCart =
    selectedOption?.length === (options?.length || selectedOption?.length);

  const totalPrice = () => {
    if (canAddToCart === false) {
      return 0;
    }

    const totalPriceOptions = selectedOption.reduce((pre, curr) => {
      return pre + curr.price;
    }, 0);

    const totalPriceTopping = topping.reduce((pre, curr) => {
      return pre + curr.price * (curr.quantity || 1);
    }, 0);

    console.log(totalPriceTopping);
    return (totalPriceOptions + totalPriceTopping) * quantity;
  };

  const quantityTopping = topping.reduce((pre, curr) => {
    if (curr.quantity) {
      return pre + curr.quantity;
    }
    return 0;
  }, 0);

  const onBackPress = () => navigation.goBack();
  const onAddPress = () => setQuantity(value => value + 1);
  const onRemovePress = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const onAddToCartPress = () => {};

  return {
    onAddToCartPress,
    toppingData,
    options,
    totalPrice,
    bgColorIconClose,
    tintColorIconClose,
    selectedOption,
    setSelectedOption,
    topping,
    quantityTopping,
    setTopping,
    onScroll,
    quantity,
    headerAnimatedStyle,
    onBackPress,
    onRemovePress,
    canAddToCart,
    onAddPress,
    onIncreasePress,
    onDecreasePress,
  };
};

export default useDetailFoodController;
