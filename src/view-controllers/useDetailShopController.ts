import {useRef, useCallback, useState} from 'react';
import {FlatList, ViewToken} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {FoodObject} from '../types/types';
import {useShopViewModel} from '../view-models/useShopViewModel';
import {SIZES} from '../config';
import {useNavigation} from '@react-navigation/native';
import {DetailShopNavigationProps} from '../navigation/types';

const HEADERHEIGHT = 106;
const useDetailShopController = (foodItem: FoodObject) => {
  const navigation = useNavigation<DetailShopNavigationProps['navigation']>();
  const {
    data: {data: allFood, hightLight: hightLightFood},
    addToFavoriteList,
    favoriteList,
    removeFromFavoriteList,
  } = useShopViewModel();

  const isFavorite = favoriteList.some(product => product.id === foodItem.id);
  const [currentMenuItem, setCurrentMenuItem] = useState(allFood[0].label);
  const menuListRef = useRef<FlatList>(null);
  const detailMenuRef = useRef<Animated.FlatList<any> & FlatList>(null);
  const scrollY = useSharedValue(0);

  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavoriteList(foodItem);
    } else {
      addToFavoriteList(foodItem);
    }
  };
  const onBackPress = () => navigation.goBack();
  const onFoodItemPress = (item: FoodObject) => {
    navigation.navigate('DetailFood', {
      foodItem: {...item, priceTotal: 0, quantity: 0},
    });
  };

  const onMenuListPress = useCallback((index: number) => {
    detailMenuRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });

    menuListRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });
  }, []);

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      const firstItem = viewableItems[0];
      if (firstItem?.index || firstItem?.index === 0) {
        menuListRef.current?.scrollToIndex({
          index: firstItem.index,
          animated: true,
        });
        setCurrentMenuItem(firstItem.item.label);
      }
    },
  );

  const onListScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const headerStyle = useAnimatedStyle(() => {
    const height = interpolate(
      scrollY.value,
      [0, SIZES.height * 0.5],
      [-HEADERHEIGHT, 0],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      scrollY.value,
      [0, SIZES.height * 0.5],
      [0, 1],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      marginTop: height,
    };
  });

  return {
    onFoodItemPress,
    headerStyle,
    onBackPress,
    menuListRef,
    allFood,
    detailMenuRef,
    onListScroll,
    handleToggleFavorite,
    onViewableItemsChanged,
    onMenuListPress,
    hightLightFood,
    currentMenuItem,
    isFavorite,
  };
};
export default useDetailShopController;
