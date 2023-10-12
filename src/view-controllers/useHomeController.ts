import {useRef, useMemo, useEffect} from 'react';
import {Shop} from '../types/types';
import data from '../data';
import {FlatList, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {SIZES} from '../config';
import {useNavigation} from '@react-navigation/native';
import {useShopViewModel} from '../view-models/useShopViewModel';
import {HomeScreenProp} from '../types/navigation.type';
import useInvoiceViewModel from '../view-models/useInvoiceViewModel';

const useHomeController = () => {
  console.log('useHomeController');
  const navigation = useNavigation<HomeScreenProp['navigation']>();
  const carouselRef = useRef<FlatList>(null);
  let carouselIndex = useRef(0);
  const totalIndex = data.carousel.length - 1;
  const {byId, allIds} = useInvoiceViewModel();
  const listInvoices = useMemo(
    () => allIds.map(id => byId[id]),
    [allIds, byId],
  );
  const {useGetPopularShop, useGetShopNearBy} = useShopViewModel();
  const {data: popularShop} = useGetPopularShop();
  const {
    isLoading,
    data: shopNearYou,
    isFetchingNextPage: isFetchingShopNearYou,
    fetchNextPage: fetchNextShopNearYou,
  } = useGetShopNearBy();

  useEffect(() => {
    let timer = setInterval(() => {
      if (carouselIndex.current < totalIndex) {
        carouselRef?.current?.scrollToIndex({
          index: carouselIndex.current + 1,
          animated: true,
        });
      } else {
        carouselRef?.current?.scrollToIndex({
          index: 0,
          animated: true,
        });
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [totalIndex]);

  const onEndReached = () => {
    if (shopNearYou?.pageParams && shopNearYou?.pageParams.length < 3) {
      return fetchNextShopNearYou();
    }
  };

  const onShopItemPress = (item: Shop) =>
    navigation.navigate('DetailShop', {
      shopInfo: item,
    });

  const onEnterAddressPress = () =>
    navigation.navigate('EnterAddressScreen', {enableGoogleMap: false});

  const getItemLayoutCarousel = (index: number) => {
    let itemWidth;
    if (index === 0) {
      itemWidth = SIZES.width - 2 * SIZES.padding + SIZES.padding;
    } else if (index === data.carousel.length - 1) {
      itemWidth = SIZES.width - 2 * SIZES.padding + 20;
    } else {
      itemWidth = SIZES.width - 2 * SIZES.padding + 10;
    }
    return {
      length: itemWidth,
      offset: itemWidth * index,
      index,
    };
  };

  const onCarouselScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollOffset = event.nativeEvent.contentOffset.x;
    const index = parseInt(
      (scrollOffset / (SIZES.width - 2 * SIZES.padding)).toString(),
      10,
    );
    carouselIndex.current = index;
  };

  const onListCartPress = () => {
    navigation.navigate('ListCart');
  };

  return {
    onListCartPress,
    listInvoices,
    onCarouselScroll,
    onEnterAddressPress,
    getItemLayoutCarousel,
    carouselRef,
    totalIndex,
    popularShop,
    onShopItemPress,
    shopNearYou,
    isFetchingShopNearYou,
    onEndReached,
    isLoading,
  };
};

export default useHomeController;
