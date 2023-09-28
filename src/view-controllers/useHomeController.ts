import {useRef, useEffect} from 'react';
import {FoodObject} from '../types/types';
import data from '../data';
import {FlatList, NativeScrollEvent, NativeSyntheticEvent} from 'react-native';
import {SIZES} from '../config';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp} from '../navigation/types';
import {
  useFoodNearByViewModel,
  usePopularFoodViewModel,
} from '../view-models/useFoodViewModel';

const useHomeController = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const carouselRef = useRef<FlatList>(null);
  let carouselIndex = useRef(0);
  const totalIndex = data.carousel.length - 1;
  const {data: popularFood} = usePopularFoodViewModel();
  const {
    error: errorFoodNearYou,
    data: foodNearYou,
    isFetching: isFetchingFoodNearYou,
  } = useFoodNearByViewModel();
  if (errorFoodNearYou === 'error') {
    console.log('errorFoodNearYou', errorFoodNearYou);
  }

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

  const onFoodItemPress = (item: FoodObject) =>
    navigation.navigate('DetailShop', {
      foodItem: item,
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

  return {
    onCarouselScroll,
    onEnterAddressPress,
    foodNearYou,
    isFetchingFoodNearYou,
    getItemLayoutCarousel,
    carouselRef,
    totalIndex,
    popularFood,
    onFoodItemPress,
  };
};

export default useHomeController;
