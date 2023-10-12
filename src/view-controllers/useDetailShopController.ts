import {useRef, useCallback, useState} from 'react';
import {FlatList, ViewToken} from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Food, Shop} from '../types/types';
import {useShopViewModel} from '../view-models/useShopViewModel';
import {SIZES} from '../config';
import {useNavigation} from '@react-navigation/native';
import {DetailShopNavigationProps} from '../types/navigation.type';
import useInvoiceViewModel from '../view-models/useInvoiceViewModel';

const HEADERHEIGHT = 116;
const useDetailShopController = (shopInfo: Shop) => {
  console.log('useDetailShopController');
  const navigation = useNavigation<DetailShopNavigationProps['navigation']>();
  const {getShopById, addToFavoriteList, favoriteList, removeFromFavoriteList} =
    useShopViewModel();
  const {data: allFood, hightLight: hightLightFood} = getShopById(shopInfo.id);
  const {getDataInvoiceById} = useInvoiceViewModel();
  const isFavorite = favoriteList.some(shop => shop.id === shopInfo.id);
  const [currentMenuItem, setCurrentMenuItem] = useState(allFood[0].label);
  const menuListRef = useRef<FlatList>(null);
  const detailMenuRef = useRef<Animated.FlatList<any> & FlatList>(null);
  const scrollY = useSharedValue(0);
  const handleToggleFavorite = () => {
    if (isFavorite) {
      removeFromFavoriteList(shopInfo);
    } else {
      addToFavoriteList(shopInfo);
    }
  };
  const onBackPress = () => navigation.goBack();
  const onFoodItemPress = (item: Food) => {
    navigation.navigate('DetailFood', {
      foodItem: {...item},
      shopInfo,
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
    const marginTop = interpolate(
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
      marginTop,
    };
  });

  const onCartPress = () => {
    navigation.navigate('CartScreen', {
      idInvoices: shopInfo.id,
    });
  };

  const invoiceData = getDataInvoiceById(shopInfo.id);
  return {
    invoiceData,
    onCartPress,
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
