/* eslint-disable react-hooks/rules-of-hooks */
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ViewToken,
} from 'react-native';
import React, {useRef, useEffect, useCallback} from 'react';
import {COLORS, SIZES, FONTS, icons} from '../config';
import {Shadow} from 'react-native-shadow-2';
import convertToVND from '../utils/convertToVND';
import {
  Break,
  ButtonText,
  ButtonTextIcon,
  HeaderCustom,
  VerticalFoodCard,
} from '../components';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Food} from '../types/types';
import {DetailRestaurantNavigationProps} from '../types/navigation.type';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {store, useAppDispatch} from '../redux/store';
import {setRestaurant} from '../redux/slice/restaurant.slice';
import {getTotalFoodCount, useSelectCartById} from '../redux/hooks';

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
}

const HEADERHEIGHT = SIZES.height * 0.15;
const DetailRestaurantScreen = ({
  navigation,
  route,
}: DetailRestaurantNavigationProps) => {
  const {restaurant} = route.params;
  const {bestSeller, menuFoods} = restaurant.allFoods;
  console.log('DetailRestaurantScreen');
  const menuListRef = useRef<FlatList>(null);
  const scrollY = useSharedValue(0);
  const detailMenuRef = useRef<Animated.FlatList<any> & FlatList>(null);
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
    if (restaurant) {
      dispatch(
        setRestaurant({
          id: restaurant.id,
          address: restaurant.address,
          image: restaurant.image,
          name: restaurant.name,
        }),
      );
    }
  }, [dispatch, restaurant]);

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
      restaurant,
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

  const onCartPress = () =>
    navigation.navigate('CartScreen', {restaurantId: restaurant.id});
  return (
    <SafeAreaView style={styles.container}>
      {/* header sau khi cuon */}
      <Animated.View style={[styles.headerWrapper, headerWrapperz]}>
        <Shadow distance={5}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.buttonBackWrapper}
              onPress={() => navigation.goBack()}>
              <Image source={icons.arrow_back} style={styles.icon} />
            </TouchableOpacity>
            {/* tim kiem */}
            <TouchableOpacity style={styles.searchContainer}>
              <Image source={icons.search} style={styles.iconSearch} />
              <TextInput
                style={{width: '85%', color: COLORS.blackText}}
                placeholderTextColor={COLORS.gray}
                cursorColor={COLORS.gray}
                numberOfLines={1}
                placeholder={`Tìm món tại ${restaurant.name}`}
              />
            </TouchableOpacity>
            {/* btn yeu thich */}
            <TouchableOpacity
              style={[styles.buttonFavoriteWrapper, {alignItems: 'center'}]}>
              <Image
                source={icons.favourite}
                style={[styles.icon, {tintColor: COLORS.black}]}
              />
            </TouchableOpacity>
          </View>
          {/* menu */}
          <FlatList
            style={{height: '50%'}}
            ref={menuListRef}
            horizontal
            contentContainerStyle={styles.menuListContentContainer}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.label}
            data={menuFoods}
            renderItem={({item, index}) => {
              const backgroundColor =
                index === 0 ? COLORS.primary : COLORS.white;
              const color = index === 0 ? COLORS.white : COLORS.black;
              return (
                <TouchableOpacity
                  ref={buttonRefs[index]}
                  onPress={() => {
                    onMenuListPress(index);
                  }}
                  style={[styles.menuItem, {backgroundColor}]}>
                  <Text
                    ref={textRefs[index]}
                    style={[{color}, FONTS.label_large]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        </Shadow>
      </Animated.View>
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
          style={{height: 40, position: 'absolute', top: 0, left: 0, right: 0}}
        />
      </View>
      {/* list detail menu */}
      <Animated.FlatList
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
                  0.3km •{' '}
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
                      style={{color: COLORS.blackText, ...FONTS.title_medium}}>
                      Giao hàng tiêu chuẩn
                    </Text>
                    <Text
                      style={{color: COLORS.blackText, ...FONTS.body_large}}>
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
            <RenderListHighLight
              highLightList={bestSeller}
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
        renderItem={({item}) => (
          <MenuFoodItem foodItem={item} onFoodItemPress={onFoodItemPress} />
        )}
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
            labelStyle={{color: COLORS.white}}
            containerStyle={styles.btnCheckout}
            label={'Trang thanh toán'}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const RenderListHighLight = ({
  highLightList,
  onFoodItemPress,
}: {
  highLightList: Food[];
  onFoodItemPress: (item: Food) => void;
}) => {
  return (
    <FlatList
      ListHeaderComponent={
        <Text style={styles.categoryWrapper}>Không thể bỏ qua</Text>
      }
      numColumns={2}
      columnWrapperStyle={{
        marginHorizontal: 2 * SIZES.spacing,
        gap: 2 * SIZES.spacing,
      }}
      ItemSeparatorComponent={() => (
        <View style={{height: 2 * SIZES.spacing}} />
      )}
      data={highLightList}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        return (
          <VerticalFoodCard
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
  );
};

const MenuFoodItem: React.FC<MenuFoodItemProp> = ({
  foodItem,
  onFoodItemPress,
}) => {
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
        {foodItem.foods.map((item, index) => (
          <TouchableOpacity
            onPress={() => {
              onFoodItemPress(item);
            }}
            key={item.id}
            style={{width: '100%'}}>
            <View style={styles.foodItemWrapper}>
              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Text
                  numberOfLines={2}
                  style={[{color: COLORS.blackText}, FONTS.body_large]}>
                  {item.name}
                </Text>
                <Text style={[{color: COLORS.gray, ...FONTS.body_medium}]}>
                  {item.description}
                </Text>
                <Text style={[{color: COLORS.blackText, ...FONTS.body_medium}]}>
                  {convertToVND(item.price)}
                </Text>
              </View>
              <Image
                source={{uri: item.image}}
                style={{
                  width: SIZES.width * 0.2,
                  height: SIZES.width * 0.2,
                  borderRadius: SIZES.radius,
                }}
              />
            </View>
            {index !== lastIndex && <Break height={1} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
export default DetailRestaurantScreen;

const styles = StyleSheet.create({
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
  foodItemWrapper: {flexDirection: 'row', padding: SIZES.padding},
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
