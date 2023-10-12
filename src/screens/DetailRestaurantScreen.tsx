import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
  GestureResponderEvent,
  ColorValue,
  ViewToken,
} from 'react-native';
import React, {useRef, useCallback, useState} from 'react';
import {COLORS, SIZES, FONTS, icons} from '../config';
import {Shadow} from 'react-native-shadow-2';
import convertToVND from '../utils/convertToVND';
import {Break, HeaderCustom, VerticalFoodCard} from '../components';
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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

interface ButtonMenuProp {
  onPress: (event: GestureResponderEvent) => void;
  backgroundColor: ColorValue;
  textColor: ColorValue;
  label: string;
}

const HEADERHEIGHT = 116;
const DetailRestaurantScreen = ({
  navigation,
  route,
}: DetailRestaurantNavigationProps) => {
  const {restaurant} = route.params;
  const {bestSeller, menuFoods} = restaurant.allFoods;
  // const {
  //   invoiceData,
  //   onCartPress,
  //   onFoodItemPress,
  //   headerStyle,
  //   onBackPress,
  //   menuListRef,
  //   allFood,
  //   detailMenuRef,
  //   onListScroll,
  //   onViewableItemsChanged,
  //   onMenuListPress,
  //   hightLightFood,
  //   currentMenuItem,
  //   isFavorite,
  //   handleToggleFavorite,
  // } = useDetailShopController(shopInfo);
  console.log('DetailRestaurantScreen');
  const menuListRef = useRef<FlatList>(null);
  const scrollY = useSharedValue(0);
  const [currentMenuItem, setCurrentMenuItem] = useState(menuFoods[0].label);
  const detailMenuRef = useRef<Animated.FlatList<any> & FlatList>(null);

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

  const onBackPress = () => navigation.goBack();
  const onFoodItemPress = (item: Food) => {
    navigation.navigate('DetailFood', {
      foodItem: {...item},
      restaurant,
    });
  };

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
  return (
    <SafeAreaView style={styles.container}>
      {/* header sau khi cuon */}
      <Animated.View style={[styles.headerWrapper, headerStyle]}>
        <Shadow>
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
            {/* icon yeu thich */}
            <TouchableOpacity
              style={[styles.buttonFavoriteWrapper, {alignItems: 'center'}]}>
              <Image
                source={icons.favourite}
                style={[styles.icon, {tintColor: COLORS.black}]}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            ref={menuListRef}
            horizontal
            contentContainerStyle={styles.menuListContentContainer}
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.label}
            data={menuFoods}
            renderItem={({item, index}) => {
              const textColor =
                currentMenuItem === item.label
                  ? COLORS.white
                  : COLORS.blackText;

              const backgroundColor =
                currentMenuItem === item.label ? COLORS.primary : COLORS.white;
              return (
                <ButtonMenu
                  backgroundColor={backgroundColor}
                  label={item.label}
                  onPress={() => {
                    onMenuListPress(index);
                  }}
                  textColor={textColor}
                />
              );
            }}
          />
        </Shadow>
      </Animated.View>

      {/* list detail menu */}
      <Animated.FlatList
        ListHeaderComponent={
          <View>
            {/* header ban dau */}
            <ImageBackground
              style={{height: SIZES.height * 0.4}}
              source={{uri: restaurant.image}}>
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.6)', 'rgba(255, 255, 255, 0)']}
                style={{height: 40}}
              />
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
            </ImageBackground>

            {/* thong tin quan an */}
            <View style={{margin: 2 * SIZES.spacing}}>
              {/* thông tin chính */}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={icons.verified}
                  style={{width: 20, height: 20}}
                  resizeMode="contain"
                />
                <Text
                  style={[
                    {color: COLORS.blackText, marginLeft: SIZES.base},
                    FONTS.label_large,
                  ]}>
                  Đã xác thực
                </Text>
              </View>
              <Text style={[FONTS.title_large, styles.foodName]}>
                {restaurant.name}
              </Text>
              <Text style={{color: COLORS.blackText, ...FONTS.body_large}}>
                0.3km - {restaurant.address}
              </Text>
              {/* thông tin phụ */}
              <View style={styles.subInfo}>
                <View>
                  <Text
                    style={{color: COLORS.blackText, ...FONTS.title_medium}}>
                    Giao hàng tiêu chuẩn
                  </Text>
                  <Text style={{color: COLORS.blackText, ...FONTS.body_large}}>
                    Dự kiến giao hàng lúc 18:30
                  </Text>
                </View>
                <TouchableOpacity>
                  <Text style={{color: COLORS.primary, ...FONTS.label_large}}>
                    Thay đổi
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.voucher}>
                <Text style={{color: COLORS.blackText, ...FONTS.body_medium}}>
                  Nhập "BANMOI" giảm 40k trên giá món
                </Text>
                <TouchableOpacity>
                  <Text style={{color: COLORS.primary, ...FONTS.label_large}}>
                    Thay đổi
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

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
          minimumViewTime: 100,
          itemVisiblePercentThreshold: 50,
        }}
        onViewableItemsChanged={onViewableItemsChanged.current}
        onEndReachedThreshold={0.2}
        renderItem={({item}) => (
          <MenuFoodItem foodItem={item} onFoodItemPress={onFoodItemPress} />
        )}
      />
      {/* {invoiceData?.numOfFood > 0 && (
        <View style={styles.checkout}>
          <ButtonTextIcon
            onPress={onCartPress}
            icon={icons.cart_fill}
            label={invoiceData.numOfFood.toString()}
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
      )} */}
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

const ButtonMenu: React.FC<ButtonMenuProp> = ({
  onPress,
  backgroundColor,
  textColor,
  label,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.menuItem, {backgroundColor: backgroundColor}]}>
    <Text style={[{color: textColor}, FONTS.label_large]}>{label}</Text>
  </TouchableOpacity>
);

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
  baseHeader: {
    paddingHorizontal: SIZES.padding,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
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
  },
  voucher: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.spacing,
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
    alignItems: 'flex-start',
    gap: 10,
    marginVertical: SIZES.radius,
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
  },
  headerContainer: {
    width: SIZES.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.radius,
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
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: COLORS.primary,
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
