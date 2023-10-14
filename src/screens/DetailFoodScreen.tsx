import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {COLORS, FONTS, SIZES, icons} from '../config';
import {ButtonIcon, QuantityInput, RadioButtonGroup} from '../components';
import {DetailFoodNavigationProps} from '../types/navigation.type';
import convertToVND from '../utils/convertToVND';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {RestaurantOption, RestaurantTopping} from '../types/types';

const HEADER_HEIGHT = 50;
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const DetailFoodScreen = ({route, navigation}: DetailFoodNavigationProps) => {
  console.log('DetalFoodScreen');
  const {foodItem} = route.params;
  const {toppings, options} = foodItem;
  const onBackPress = () => navigation.goBack();
  const [foodQuantity, setFoodQuantity] = useState<number>(1);
  const scrollY = useSharedValue(0);
  const [selectedOption, setSelectedOption] = useState<RestaurantOption[]>([]);
  const [selectedTopping, setSelectedTopping] = useState<RestaurantTopping[]>(
    [],
  );

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

  const onIncreaseToppingPress = useCallback(
    (name: string, price: number) => {
      const currentItem = selectedTopping.find(item => item.name === name);
      if (currentItem) {
        const updatedToppings = selectedTopping.map(item => {
          if (item.name === currentItem.name) {
            return {...item, quantity: currentItem.quantity + 1};
          } else {
            return item;
          }
        });
        setSelectedTopping(updatedToppings);
      } else {
        setSelectedTopping([
          ...selectedTopping,
          {name: name, price: price, quantity: 1},
        ]);
      }
    },
    [selectedTopping],
  );

  const onDecreaseToppingPress = useCallback(
    (name: string) => {
      const currentItem = selectedTopping.find(item => item.name === name);
      if (!currentItem) {
        return;
      }
      if (currentItem) {
        const updatedToppings = selectedTopping.map(item => {
          if (item.name === currentItem.name && item.quantity >= 1) {
            return {...item, quantity: item.quantity - 1};
          }
          return item;
        });
        const filteredTopping = updatedToppings.filter(
          item => item.quantity > 0,
        ) as RestaurantTopping[];
        setSelectedTopping(filteredTopping);
      }
    },
    [selectedTopping, setSelectedTopping],
  );

  const quantityTopping = useMemo(() => {
    return selectedTopping.reduce((pre, curr) => {
      if (curr.quantity) {
        return pre + curr.quantity;
      }
      return 0;
    }, 0);
  }, [selectedTopping]);

  const onIncreaseFoodPress = () => setFoodQuantity(value => value + 1);
  const onDecreaseFoodPress = useCallback(() => {
    if (foodQuantity > 1) {
      setFoodQuantity(foodQuantity - 1);
    }
  }, [foodQuantity]);

  const canAddToCart = useMemo(() => {
    return (
      selectedOption?.length === (options?.length || selectedOption?.length)
    );
  }, [selectedOption, options]);

  const totalPriceOptions = useMemo(() => {
    return selectedOption.reduce((pre, curr) => {
      return pre + curr.price;
    }, 0);
  }, [selectedOption]);

  const totalPriceTopping = useMemo(() => {
    return selectedTopping.reduce((pre, curr) => {
      return pre + curr.price * (curr.quantity || 1);
    }, 0);
  }, [selectedTopping]);

  const totalPrice = () => {
    if (!canAddToCart) {
      return 0;
    }

    return (
      (totalPriceOptions + totalPriceTopping + foodItem.price) * foodQuantity
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* navigation*/}
      <AnimatedTouchableOpacity
        onPress={onBackPress}
        style={[styles.buttonBackWrapper, bgColorIconClose]}>
        <Animated.Image
          source={icons.close}
          style={[styles.icon, tintColorIconClose]}
        />
      </AnimatedTouchableOpacity>

      <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
        <Text style={{color: COLORS.blackText, ...FONTS.label_large}}>
          {foodItem.name}
        </Text>
      </Animated.View>

      {/* img food */}
      <View style={styles.imageFood}>
        <Image
          source={{
            uri: foodItem.image,
          }}
          style={{width: '100%', height: '100%'}}
        />
      </View>

      <FlatList
        ListHeaderComponent={
          // name, price
          <View style={{backgroundColor: COLORS.white, padding: SIZES.padding}}>
            <View style={styles.nameWrapper}>
              <Text style={styles.name}>{foodItem.name}</Text>
              <Text style={styles.mainPrice}>
                {convertToVND(foodItem.price)}
              </Text>
            </View>

            <Text style={[styles.description]}>{foodItem.description}</Text>

            <TouchableOpacity style={{flexDirection: 'row'}}>
              <Image
                source={icons.note}
                style={styles.iconNote}
                resizeMode="contain"
              />
              <Text style={styles.note}>
                Bạn có muốn nhắn gì đến cửa hàng không
              </Text>
            </TouchableOpacity>
          </View>
        }
        onScroll={event => onScroll(event)}
        contentContainerStyle={{
          paddingTop: SIZES.height * 0.3 - HEADER_HEIGHT,
        }}
        showsVerticalScrollIndicator={true}
        data={options}
        renderItem={({item}) => (
          <View style={{backgroundColor: COLORS.white}}>
            <View style={styles.titleWrapper}>
              <Text style={styles.labelText}>{item.title}</Text>
              <Text
                style={[
                  styles.subLabelText,
                  {color: COLORS.primary, marginVertical: SIZES.base},
                ]}>
                Chọn ít nhất 1 mục
              </Text>
            </View>
            <RadioButtonGroup
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              data={item}
            />
          </View>
        )}
        ListFooterComponent={
          toppings && (
            <View style={{paddingBottom: SIZES.height * 0.1}}>
              <View style={styles.toppingHeader}>
                <Text style={styles.labelText}>{toppings.title}</Text>
                <Text
                  style={[
                    styles.subLabelText,
                    {color: COLORS.gray, marginVertical: SIZES.base},
                  ]}>
                  {'Chọn tối đa ' + toppings.maximum}
                </Text>
              </View>

              {toppings.data.map((item: {name: string; price: number}) => {
                const currentItem = selectedTopping?.find(
                  toppingItem => toppingItem.name === item.name,
                );
                const maximum = toppings.maximum;
                const isMaximum = quantityTopping >= maximum;
                const textColor =
                  isMaximum && (currentItem?.quantity || 0) > 0 === false
                    ? COLORS.lightGray1
                    : COLORS.blackText;

                return (
                  <View key={item.name} style={styles.toppingBody}>
                    {currentItem?.quantity === undefined ||
                    // quantity
                    currentItem?.quantity === 0 ? (
                      <ButtonIcon
                        disabled={isMaximum}
                        onPress={() =>
                          onIncreaseToppingPress(item.name, item.price)
                        }
                        containerStyle={[
                          styles.iconQuantityInputContainer,
                          {
                            backgroundColor: isMaximum
                              ? COLORS.lightPrimary_05
                              : COLORS.lightPrimary,
                          },
                        ]}
                        icon={icons.add_wght700}
                        iconStyle={[
                          styles.iconQuantityInput,
                          {
                            tintColor: isMaximum
                              ? COLORS.lightGray1
                              : COLORS.primary,
                          },
                        ]}
                      />
                    ) : (
                      <QuantityInput
                        iconLeft={icons.remove_wght700}
                        iconRight={icons.add_wght700}
                        onAddPress={() =>
                          onIncreaseToppingPress(item.name, item.price)
                        }
                        disableRight={isMaximum}
                        iconRightStyle={{
                          tintColor: isMaximum
                            ? COLORS.lightGray1
                            : COLORS.primary,
                        }}
                        onRemovePress={() => onDecreaseToppingPress(item.name)}
                        labelStyle={[styles.labelQuantityInput]}
                        iconContainerStyle={styles.iconQuantityInputContainer}
                        quantity={currentItem.quantity}
                        iconStyle={styles.iconQuantityInput}
                      />
                    )}
                    {/* end quantity */}
                    {/* name */}
                    <View style={styles.toppingTextWrapper}>
                      <Text
                        style={{
                          color: textColor,
                          fontWeight:
                            currentItem?.quantity || 0 > 0 ? 'bold' : 'normal',
                        }}>
                        {item.name}
                      </Text>
                      <Text style={{color: textColor, ...FONTS.body_medium}}>
                        {convertToVND(item.price)}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )
        }
      />
      <View style={styles.toppingFooter}>
        <QuantityInput
          minimumQuantity={1}
          maximumQuantity={15}
          disableRight={foodQuantity === 15}
          iconLeft={icons.remove_wght700}
          iconRight={icons.add_wght700}
          onAddPress={onIncreaseFoodPress}
          onRemovePress={onDecreaseFoodPress}
          labelStyle={styles.labelQuantityInput}
          iconContainerStyle={styles.iconQuantityInputContainer}
          quantity={foodQuantity}
          iconStyle={styles.iconQuantityInput}
        />
        <TouchableOpacity
          disabled={!canAddToCart}
          style={[
            {
              backgroundColor: canAddToCart ? COLORS.primary : COLORS.gray3,
            },
            styles.btnAddToCartWrapper,
          ]}>
          {canAddToCart ? (
            <>
              <Text style={{color: COLORS.white, ...FONTS.title_medium}}>
                Thêm
              </Text>
              <View style={styles.dot} />
              <Text style={{color: COLORS.white, ...FONTS.title_medium}}>
                {convertToVND(totalPrice())}
              </Text>
            </>
          ) : (
            <Text style={{color: COLORS.white, ...FONTS.title_medium}}>
              Chọn thông tin
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetailFoodScreen;

const styles = StyleSheet.create({
  mainText: {color: COLORS.blackText, ...FONTS.body_large},
  labelText: {color: COLORS.blackText, ...FONTS.label_large},
  subLabelText: {color: COLORS.primary, ...FONTS.body_small},
  toppingHeader: {
    padding: SIZES.padding,
    paddingBottom: 0,
    backgroundColor: COLORS.lightPrimary,
  },
  toppingTextWrapper: {
    marginLeft: SIZES.spacing,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },

  note: {
    color: COLORS.gray,
    ...FONTS.body_large,
    marginLeft: SIZES.base,
    marginRight: SIZES.padding,
  },
  description: {
    color: COLORS.gray,
    ...FONTS.body_medium,
    marginBottom: SIZES.padding,
  },

  btnAddToCartWrapper: {
    flex: 1,
    marginLeft: 3 * SIZES.spacing,
    height: 60,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dot: {
    width: 3,
    height: 3,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    marginHorizontal: SIZES.base,
  },
  titleWrapper: {
    padding: SIZES.padding,
    paddingBottom: 0,
    backgroundColor: COLORS.lightPrimary,
  },
  name: {
    width: '70%',
    color: COLORS.blackText,
    ...FONTS.headline_medium,
    fontWeight: 'bold',
  },
  toppingFooter: {
    height: SIZES.height * 0.15,
    borderColor: COLORS.lightGray2,
    borderTopWidth: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
  },
  toppingBody: {
    backgroundColor: COLORS.white,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray2,
    padding: SIZES.padding,
  },

  labelQuantityInput: {
    color: COLORS.blackText,
    ...FONTS.label_large,
    marginHorizontal: 15,
  },
  headerContainer: {
    zIndex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    height: HEADER_HEIGHT,
  },

  iconQuantityInputContainer: {
    height: 32,
    width: 32,
    backgroundColor: COLORS.lightPrimary,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.base,
  },

  iconNote: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  iconQuantityInput: {
    width: 16,
    height: 16,
    tintColor: COLORS.primary,
  },

  buttonBackWrapper: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    backgroundColor: COLORS.transparentBlack7,
    borderRadius: 40,
    top: 9,
    left: 10,
    position: 'absolute',
  },

  textPrice: {
    color: COLORS.primary,
    ...FONTS.title_medium,
  },

  mainPrice: {
    textAlign: 'center',
    width: '30%',
    color: COLORS.blackText,
    ...FONTS.title_large,
  },

  imageFood: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'red',
    height: SIZES.height * 0.3,
  },

  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: COLORS.white,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
