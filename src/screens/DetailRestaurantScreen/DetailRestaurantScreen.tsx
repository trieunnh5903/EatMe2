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
import React, {useRef, useEffect, useCallback, memo, useState} from 'react';
import {COLORS, SIZES, FONTS, icons} from '../../config';
import {
  Break,
  ButtonText,
  ButtonTextIcon,
  HeaderCustom,
  VerticalFoodCard,
} from '../../components';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Food, FoodReduxType, Restaurant} from '../../types/types';
import {
  CartScreenProp,
  DetailRestaurantNavigationProps,
} from '../../types/navigation.type';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {store, useAppDispatch} from '../../redux/store';
import {setRestaurant} from '../../redux/slice/restaurant.slice';
import {getTotalFoodCount, useSelectCartById} from '../../redux/hooks';
import {useQuery} from '@tanstack/react-query';
import {fetchRestaurantById} from '../../services/restaurant.service';
import {useNavigation} from '@react-navigation/native';
import AnimatedHeader from './AnimatedHeader';
import convertToVND from '../../utils/convertToVND';

interface MenuFood {
  label: string;
  foods: {
    name: string;
    id: string;
    description: string;
    price: number;
    image: string;
  }[];
}

interface MenuFoodItemProp {
  foodItem: MenuFood;
  onFoodItemPress: (item: Food) => void;
  cart: FoodReduxType[] | undefined;
}

interface MyDetailRestaurantProps {
  restaurant: Restaurant;
}

const HEADERHEIGHT = SIZES.height * 0.15;
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
  const {bestSeller, menuFoods} = restaurant.allFoods;
  const menuListRef = useRef<FlatList>(null);
  const scrollY = useSharedValue(0);
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

      menuListRef.current?.scrollToIndex({
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
      foodItem: {...item},
    });
  };

  const onViewableItemsChanged = useRef(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      if (viewableItems.length > 0) {
        // Lấy index của item đang hiển thị đầu tiên trong danh sách hiển thị
        const index = viewableItems[0].index;
        if (index !== null) {
          menuListRef.current?.scrollToIndex({
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
  const navigation = useNavigation<CartScreenProp['navigation']>();
  const onCartPress = () =>
    navigation.navigate('CartScreen', {restaurantId: restaurant.id});

  const onCheckoutPress = () =>
    navigation.navigate('CheckoutScreen', {restaurantId: restaurant.id});
  return (
    <>
      {/* header sau khi cuon */}
      <AnimatedHeader
        animatedStyle={headerWrapperz}
        buttonMenuRefs={buttonRefs}
        menuFoods={menuFoods}
        onMenuListPress={onMenuListPress}
        restaurant={restaurant}
        textMenuRefs={textRefs}
        flatlistButtonGroupRef={menuListRef}
      />
      {/* header ban dau */}
      <Animated.View
        style={[
          {position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1},
          baseHeaderz,
        ]}>
        <HeaderCustom
          containerStyle={styles.baseHeader}
          leftComponent={
            <TouchableOpacity
              style={styles.buttonNavWrapper}
              onPress={onBackPress}>
              <Image
                source={icons.arrow_back}
                style={[styles.icon, {tintColor: COLORS.white}]}
              />
            </TouchableOpacity>
          }
          rightComponent={
            <View style={{flexDirection: 'row', gap: 10}}>
              <TouchableOpacity
                style={[styles.buttonNavWrapper, {alignItems: 'center'}]}>
                <Feather name="search" size={20} color={COLORS.white} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonNavWrapper, {alignItems: 'center'}]}>
                <Image
                  source={icons.favourite}
                  style={[styles.icon, {tintColor: COLORS.white}]}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonNavWrapper, {alignItems: 'center'}]}>
                <Feather name="share-2" size={20} color={COLORS.white} />
              </TouchableOpacity>
            </View>
          }
        />
      </Animated.View>

      <View style={{position: 'absolute', top: 0, left: 0, right: 0}}>
        <Image
          style={{height: SIZES.height * 0.35}}
          source={{uri: restaurant.image}}
        />

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
        contentContainerStyle={{paddingTop: SIZES.height * 0.35}}
        ListHeaderComponent={
          <View style={{backgroundColor: COLORS.white}}>
            {/* thong tin quan an */}
            <View style={{margin: 2 * SIZES.spacing}}>
              {/* thông tin chính */}
              <View style={styles.mainInformation}>
                <TouchableOpacity style={styles.btnInfo}>
                  <Ionicons
                    name="information-circle-outline"
                    size={24}
                    color={COLORS.black}
                  />
                </TouchableOpacity>
                <View style={styles.partnerWrapper}>
                  <Image
                    source={icons.verified}
                    style={{width: 20, height: 20}}
                    resizeMode="contain"
                  />
                  <Text
                    style={[
                      {color: COLORS.primary, marginLeft: SIZES.base},
                      FONTS.label_large,
                    ]}>
                    ĐỐI TÁC CỦA EATME
                  </Text>
                </View>
                <Text style={[FONTS.title_large, styles.foodName]}>
                  {restaurant.name}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    color: COLORS.darkGray,
                    marginBottom: SIZES.base,
                    ...FONTS.title_medium,
                  }}>
                  0.3km •
                  <Text style={FONTS.body_large}>{restaurant.address}</Text>
                </Text>
              </View>

              {/* thông tin phụ */}
              <View style={styles.subInfo}>
                <View style={styles.timeDeliveryWrapper}>
                  <Feather
                    name="clock"
                    size={24}
                    color={COLORS.black}
                    style={{marginRight: 10}}
                  />
                  <View>
                    <Text
                      style={{
                        color: COLORS.blackText,
                        ...FONTS.title_medium,
                      }}>
                      Giao hàng tiêu chuẩn
                    </Text>
                    <Text
                      style={{
                        color: COLORS.blackText,
                        ...FONTS.body_large,
                      }}>
                      Dự kiến giao hàng lúc 18:30
                    </Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Text style={{color: COLORS.primary, ...FONTS.label_large}}>
                    Thay đổi
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.voucher}>
                <View style={styles.voucherWrapper}>
                  <Feather
                    name="gift"
                    size={24}
                    color={COLORS.black}
                    style={{marginRight: 10}}
                  />
                  <Text numberOfLines={1} style={styles.textVoucher}>
                    Nhập "BANMOI" giảm 40k trên giá món
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={{color: COLORS.primary, ...FONTS.label_large}}>
                    Xem thêm
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.voucher}>
                <View style={styles.invoiceGroup}>
                  <Feather
                    name="users"
                    size={24}
                    color={COLORS.black}
                    style={{marginRight: 10}}
                  />
                  <Text style={{color: COLORS.blackText, ...FONTS.label_large}}>
                    Đơn nhóm
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text style={{color: COLORS.primary, ...FONTS.label_large}}>
                    Tạo đơn
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Break />

            {/* list best seller */}
            <FlatList
              ListHeaderComponent={
                <Text style={styles.categoryWrapper}>Không thể bỏ qua</Text>
              }
              numColumns={2}
              columnWrapperStyle={{
                marginHorizontal: 2 * SIZES.spacing,
                gap: 2 * SIZES.spacing,
              }}
              // eslint-disable-next-line react/no-unstable-nested-components
              ItemSeparatorComponent={() => (
                <View style={{height: 2 * SIZES.spacing}} />
              )}
              data={bestSeller}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                const foodChecked = cart?.find(food => food.name === item.name);
                return (
                  <VerticalFoodCard
                    foodChecked={foodChecked}
                    onPress={() => onFoodItemPress(item)}
                    imageStyle={{
                      height: (SIZES.width - 6 * SIZES.spacing) / 2,
                      width: (SIZES.width - 6 * SIZES.spacing) / 2,
                    }}
                    containerStyle={{flex: 1}}
                    item={item}
                  />
                );
              }}
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
            <MenuFoodItem
              foodItem={item}
              onFoodItemPress={onFoodItemPress}
              cart={cart}
            />
          );
        }}
      />
      {cart?.length > 0 && (
        // <CheckoutFooter onCartPress={onCartPress} totalFood={totalFood} />
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

// item food
const MenuFoodItem: React.FC<MenuFoodItemProp> = memo(
  ({foodItem, cart, onFoodItemPress}) => {
    const lastIndex = foodItem.foods.length - 1;
    return (
      <View
        style={{
          width: SIZES.width,
          paddingVertical: SIZES.spacing,
          backgroundColor: COLORS.white,
        }}>
        <Text style={styles.categoryWrapper}>{foodItem.label}</Text>
        <View>
          {foodItem.foods.map((item, index) => {
            const foodChecked = cart?.find(food => food.name === item.name);
            const backgroundColor = foodChecked ? COLORS.primary : COLORS.white;
            const fontWeight = foodChecked ? 'bold' : 'normal';
            return (
              <TouchableOpacity
                onPress={() => {
                  onFoodItemPress(item);
                }}
                key={item.id}
                style={{width: '100%'}}>
                <View style={styles.foodItemWrapper}>
                  <View
                    style={[
                      {backgroundColor: backgroundColor},
                      styles.lineVertical,
                    ]}
                  />
                  <View style={styles.foodInfoWrapper}>
                    <Text
                      numberOfLines={2}
                      style={[
                        FONTS.body_large,
                        {color: COLORS.blackText, fontWeight},
                      ]}>
                      {foodChecked?.quantity && (
                        <Text style={{color: COLORS.primary}}>
                          {foodChecked?.quantity}x{' '}
                        </Text>
                      )}
                      {item.name}
                    </Text>
                    <Text style={[{color: COLORS.gray, ...FONTS.body_medium}]}>
                      {item.description}
                    </Text>
                    <Text
                      style={[{color: COLORS.blackText, ...FONTS.body_medium}]}>
                      {convertToVND(item.price)}
                    </Text>
                  </View>
                  <Image
                    source={{uri: item.image}}
                    style={{
                      width: SIZES.width * 0.2,
                      height: SIZES.width * 0.2,
                      borderRadius: SIZES.radius,
                      marginVertical: SIZES.padding,
                      marginRight: SIZES.padding,
                    }}
                  />
                </View>
                {index !== lastIndex && <Break height={1} />}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  },
);
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
  headerWrapper: {
    backgroundColor: COLORS.white,
    height: HEADERHEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // zIndex: 2,
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
