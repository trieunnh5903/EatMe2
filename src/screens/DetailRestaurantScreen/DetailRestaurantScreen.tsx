/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useEffect, useCallback, useState} from 'react';
import {COLORS, SIZES, FONTS, icons} from '../../config';
import {Break, ButtonText, ButtonTextIcon} from '../../components';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Food, Restaurant} from '../../types/types';
import {
  CartScreenProp,
  DetailRestaurantNavigationProps,
} from '../../types/navigation.type';
import LinearGradient from 'react-native-linear-gradient';
import {store, useAppDispatch} from '../../redux/store';
import {setRestaurant} from '../../redux/slice/restaurant.slice';
import {getTotalFoodCount, useSelectCartById} from '../../redux/hooks';
import {useQuery} from '@tanstack/react-query';
import {fetchRestaurantById} from '../../services/restaurant.service';
import {useNavigation} from '@react-navigation/native';
import AnimatedHeader, {HEADER_HEIGHT} from './AnimatedHeader';
import BaseHeader from './BaseHeader';
import MenuFoodItemHorizontail from './MenuFoodItemHorizontal';
import ListHightLight from './ListHightLight';
import CardInformation from './CardInformation';

interface MyDetailRestaurantProps {
  restaurant: Restaurant;
}

const DetailRestaurantScreen = ({route}: DetailRestaurantNavigationProps) => {
  const {restaurantId} = route.params;
  console.log('DetailRestaurantScreen');
  const [loading, setLoading] = useState(true);
  const {data} = useQuery({
    queryKey: ['restaurant', restaurantId],
    queryFn: () => fetchRestaurantById(restaurantId),
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 0);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {data === undefined || loading === true ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <MyDetailRestaurant restaurant={data} />
      )}
    </SafeAreaView>
  );
};

const MyDetailRestaurant: React.FC<MyDetailRestaurantProps> = ({
  restaurant,
}) => {
  const navigation = useNavigation<CartScreenProp['navigation']>();
  const scrollY = useSharedValue(0);
  const {bestSeller, menuFoods} = restaurant.allFoods;
  const menuListRef = useRef<FlatList>(null);
  const detailMenuRef = useRef<any>();
  const buttonRefs = Array.from({length: menuFoods.length}, () =>
    useRef<TouchableOpacity>(null),
  );
  const textRefs = Array.from({length: menuFoods.length}, () =>
    useRef<Text>(null),
  );
  const totalFood = getTotalFoodCount(store.getState(), restaurant.id);
  const cart = useSelectCartById(restaurant.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // save current restaurant
    dispatch(
      setRestaurant({
        bestSeller: restaurant.allFoods.bestSeller,
        id: restaurant.id,
        address: restaurant.address,
        image: restaurant.image,
        name: restaurant.name,
      }),
    );
  }, [
    dispatch,
    restaurant.address,
    restaurant.allFoods.bestSeller,
    restaurant.id,
    restaurant.image,
    restaurant.name,
  ]);

  const onListScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const onMenuListPress = useCallback(
    (index: number) => {
      detailMenuRef.current?.scrollToIndex({
        index: index,
        animated: true,
      });

      for (let i = 0; i < buttonRefs.length; i++) {
        buttonRefs[i].current?.setNativeProps({
          style: {backgroundColor: COLORS.white},
        });

        textRefs[i].current?.setNativeProps({
          style: {color: COLORS.black},
        });
      }

      textRefs[index].current?.setNativeProps({
        style: {color: COLORS.white},
      });

      buttonRefs[index].current?.setNativeProps({
        style: {backgroundColor: COLORS.primary},
      });
    },
    [buttonRefs, textRefs],
  );

  const onBackPress = () => navigation.goBack();

  const onFoodItemPress = (item: Food) => {
    navigation.navigate('DetailFood', {
      foodId: item.id,
      restaurantId: restaurant.id,
    });
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        const index = viewableItems[0].index;
        if (index !== null) {
          if (index === 0 || index === buttonRefs.length) {
            menuListRef.current?.scrollToIndex({
              index: index,
              animated: true,
            });
          } else {
            menuListRef.current?.scrollToIndex({
              index: index - 1,
              animated: true,
            });
          }

          for (let i = 0; i < buttonRefs.length; i++) {
            buttonRefs[i].current?.setNativeProps({
              style: {backgroundColor: COLORS.white},
            });

            textRefs[i].current?.setNativeProps({
              style: {color: COLORS.black},
            });
          }

          textRefs[index].current?.setNativeProps({
            style: {color: COLORS.white},
          });

          buttonRefs[index].current?.setNativeProps({
            style: {backgroundColor: COLORS.primary},
          });
        }
      }
    },
  );

  const headerWrapperz = useAnimatedStyle(() => {
    const zIndex = interpolate(
      scrollY.value,
      [0, SIZES.height * 0.3],
      [0, 2],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      scrollY.value,
      [0, SIZES.height * 0.3],
      [0, 1],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      zIndex,
    };
  });

  const baseHeaderz = useAnimatedStyle(() => {
    const zIndex = interpolate(
      scrollY.value,
      [0, SIZES.height * 0.2],
      [1, 0],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      scrollY.value,
      [0, SIZES.height * 0.3],
      [1, 0],
      Extrapolate.CLAMP,
    );

    return {
      opacity,
      zIndex,
    };
  });

  const onCartPress = () =>
    navigation.navigate('CartScreen', {restaurantId: restaurant.id});

  const onCheckoutPress = () =>
    navigation.navigate('CheckoutScreen', {restaurantId: restaurant.id});

  return (
    <>
      {/* Animated Header */}
      <AnimatedHeader
        animatedStyle={headerWrapperz}
        buttonMenuRefs={buttonRefs}
        menuFoods={menuFoods}
        onMenuListPress={onMenuListPress}
        restaurant={restaurant}
        textMenuRefs={textRefs}
        flatlistButtonGroupRef={menuListRef}
      />

      {/* Base Header*/}
      <BaseHeader animatedStyle={baseHeaderz} onBackPress={onBackPress} />

      <View style={{position: 'absolute', top: 0, left: 0, right: 0}}>
        {/* image restaurant */}
        <Image
          style={{height: SIZES.height * 0.35}}
          source={{uri: restaurant.image}}
        />

        {/* gradian black base header */}
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.6)', 'rgba(255, 255, 255, 0)']}
          style={{
            height: 40,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
          }}
        />
      </View>
      {/* list detail menu */}
      <Animated.FlatList
        overScrollMode={'never'}
        contentContainerStyle={{
          marginTop: HEADER_HEIGHT,
          paddingTop: HEADER_HEIGHT,
        }}
        ListHeaderComponent={
          <View
            style={{
              backgroundColor: COLORS.white,
            }}>
            {/* card information restaurant */}
            <CardInformation
              address={restaurant.address}
              name={restaurant.name}
            />
            <Break />
            {/* list hight light */}
            <ListHightLight
              bestSeller={bestSeller}
              cart={cart}
              onFoodItemPress={onFoodItemPress}
            />
          </View>
        }
        onScroll={onListScroll}
        ref={detailMenuRef}
        data={menuFoods}
        viewabilityConfig={{
          minimumViewTime: 300,
          itemVisiblePercentThreshold: 30,
          waitForInteraction: true,
        }}
        onViewableItemsChanged={onViewableItemsChanged.current}
        renderItem={({item}) => {
          return (
            <MenuFoodItemHorizontail
              foodItem={item}
              onFoodItemPress={onFoodItemPress}
              cart={cart}
            />
          );
        }}
      />
      {cart?.length > 0 && (
        <View style={styles.checkout}>
          <ButtonTextIcon
            onPress={onCartPress}
            icon={icons.cart_fill}
            label={totalFood.toString()}
            containerStyle={styles.btnCart}
            iconStyle={styles.iconCart}
            labelStyle={{color: COLORS.primary}}
          />
          <ButtonText
            onPress={onCheckoutPress}
            labelStyle={{color: COLORS.white}}
            containerStyle={styles.btnCheckout}
            label={'Trang thanh toán'}
          />
        </View>
      )}
    </>
  );
};

export default DetailRestaurantScreen;

const styles = StyleSheet.create({
  lineVertical: {
    height: '100%',
    width: 6,
  },

  foodInfoWrapper: {
    marginVertical: SIZES.padding,
    flex: 1,
    marginLeft: SIZES.padding - 6,
    justifyContent: 'space-between',
  },

  invoiceGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    flex: 1,
  },

  voucherWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    flex: 1,
  },

  timeDeliveryWrapper: {
    flexDirection: 'row',
    marginRight: 16,
    flex: 1,
    alignItems: 'center',
  },
  textVoucher: {
    flex: 1,
    color: COLORS.blackText,
    ...FONTS.label_large,
  },

  btnInfo: {
    position: 'absolute',
    right: 10,
    top: -16,
    backgroundColor: COLORS.white,
    padding: 5,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  partnerWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.base,
  },
  mainInformation: {
    backgroundColor: COLORS.white,
    alignItems: 'center',
    marginTop: -60,
    paddingVertical: SIZES.spacing,
    paddingHorizontal: SIZES.spacing * 2,
    borderRadius: SIZES.radius,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,

    elevation: 1,
  },

  baseHeader: {
    paddingHorizontal: SIZES.padding,
  },

  iconCart: {width: 32, height: 32, tintColor: COLORS.primary},
  btnCart: {
    height: 60,
    width: '25%',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  btnCheckout: {
    backgroundColor: COLORS.primary,
    height: 60,
    flex: 1,
    marginLeft: SIZES.spacing,
    paddingHorizontal: SIZES.spacing,
    borderRadius: SIZES.radius,
  },

  checkout: {
    width: '100%',
    height: SIZES.height * 0.12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: SIZES.spacing,
    paddingHorizontal: SIZES.padding,
  },
  subInfo: {
    marginTop: SIZES.padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  voucher: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: SIZES.spacing,
  },

  buttonNavWrapper: {
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.radius,
    backgroundColor: COLORS.black2(6),
  },
  menuListContentContainer: {
    paddingLeft: SIZES.spacing,
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.white,
  },
  menuItem: {
    borderRadius: 20,
    padding: 8,
  },
  menuList: {
    width: SIZES.width,
  },
  foodItemWrapper: {
    flexDirection: 'row',

    paddingLeft: 0,
  },
  categoryWrapper: {
    color: COLORS.blackText,
    padding: SIZES.padding,
    ...FONTS.title_large,
    fontWeight: 'bold',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 10,
    backgroundColor: COLORS.white,
  },

  iconHeaderWrapper: {
    backgroundColor: COLORS.transparentBlack7,
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  foodName: {
    fontSize: 28,
    color: COLORS.blackText,
    fontWeight: 'bold',
    marginTop: SIZES.base,
    textAlign: 'center',
    marginBottom: SIZES.base,
  },
  headerContainer: {
    height: '50%',
    width: SIZES.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },

  buttonBackWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  textPrice: {
    color: COLORS.primary,
    ...FONTS.title_medium,
  },

  buttonFavoriteWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  deliveryWrapper: {
    flexDirection: 'row',
    marginTop: SIZES.base,
  },

  quantityIconContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    marginHorizontal: SIZES.radius,
  },

  imageFoodWrapper: {justifyContent: 'center', alignItems: 'center'},

  labelFooter: {
    color: COLORS.white,
    ...FONTS.title_medium,
    fontWeight: 'bold',
  },

  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 46,
    backgroundColor: COLORS.lightGray2,
    paddingHorizontal: 12,
    borderRadius: SIZES.padding,
    alignItems: 'center',
  },

  foodTitle: {
    marginTop: 4 * SIZES.spacing,
  },

  quantityIcon: {
    width: 36,
    height: 36,
    tintColor: COLORS.white,
  },

  quantityContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 2 * SIZES.radius,
    height: 50,
    alignSelf: 'center',
    position: 'absolute',
    top: -25,
  },

  quantityLabel: {
    color: COLORS.white,
    marginHorizontal: 5,
    ...FONTS.title_large,
    fontWeight: 'bold',
  },

  readLess: {
    color: COLORS.primary,
    ...FONTS.body_large,
    fontWeight: 'bold',
  },

  readMore: {
    color: COLORS.primary,
    ...FONTS.body_large,
    fontWeight: 'bold',
  },

  infoFoodWrapper: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.white,
  },

  buttonFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    marginTop: SIZES.radius,
    marginBottom: SIZES.radius,
    marginHorizontal: SIZES.padding,
    height: 50,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },

  textTitle: {
    color: COLORS.blackText,
    ...FONTS.headline_medium,
    fontWeight: 'bold',
  },
  textAddress: {
    color: COLORS.blackText,
    ...FONTS.body_medium,
    marginBottom: SIZES.spacing,
  },

  imageFood: {
    height: 100,
    width: SIZES.width * 1.3,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: SIZES.width * 0.17,
    paddingTop: SIZES.spacing,
  },

  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: COLORS.black,
  },

  iconSearch: {
    width: 24,
    height: 24,
    marginRight: SIZES.spacing,
    resizeMode: 'contain',
    tintColor: COLORS.gray2,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
