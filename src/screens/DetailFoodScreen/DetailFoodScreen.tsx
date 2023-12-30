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
import {COLORS, FONTS, SIZES, icons} from '../../config';
import {QuantityInput, RadioButtonGroup} from '../../components';
import {DetailFoodNavigationProps} from '../../types/navigation.type';
import convertToVND from '../../utils/convertToVND';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {
  Food,
  FoodRedux,
  RestaurantOption,
  RestaurantTopping,
} from '../../types/types';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {addFood, createCart, updateFood} from '../../redux/slice/cart.slice';
import {nanoid} from '@reduxjs/toolkit';
import {addRestaurant} from '../../redux/slice/restaurant.slice';
import ListHeaderComponent from './ListHeaderComponent';
import ListFooterComponent from './ListFooterComponent';
import {useQuery} from '@tanstack/react-query';
import {fetchFoodById} from '../../services/restaurant.service';
import {ActivityIndicator} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelectCartById} from '../../redux/hooks';

interface MyDetailFoodProps {
  food: Food;
}

const HEADER_HEIGHT = 50;
const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);
const DetailFoodScreen = ({route}: DetailFoodNavigationProps) => {
  console.log('DetalFoodScreen');
  const {foodId} = route.params;

  const {data} = useQuery({
    queryKey: ['food', foodId],
    queryFn: () => fetchFoodById(foodId),
  });

  return (
    <SafeAreaView style={styles.container}>
      {data === undefined ? (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <MyDetailFood food={data} />
      )}
    </SafeAreaView>
  );
};

const MyDetailFood: React.FC<MyDetailFoodProps> = ({food}) => {
  const navigation = useNavigation<DetailFoodNavigationProps['navigation']>();

  const {
    params: {foodReduxId, restaurantId},
  } = useRoute<DetailFoodNavigationProps['route']>();
  const cart = useSelectCartById(restaurantId);
  const foodRedux = cart?.find(i => i.id === foodReduxId);

  const [foodQuantity, setFoodQuantity] = useState<number>(
    foodRedux?.quantity || 1,
  );
  const scrollY = useSharedValue(0);
  const dispatch = useAppDispatch();
  const [selectedOption, setSelectedOption] = useState<RestaurantOption[]>(
    foodRedux?.options || [],
  );
  const [selectedTopping, setSelectedTopping] = useState<RestaurantTopping[]>(
    foodRedux?.toppings || [],
  );
  const restaurant = useAppSelector(
    state => state.restaurant.currentRestaurant,
  );

  // event
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

  const quantityTopping = useMemo(() => {
    return selectedTopping.reduce((pre, curr) => {
      if (curr.quantity) {
        return pre + curr.quantity;
      }
      return 0;
    }, 0);
  }, [selectedTopping]);

  const canAddToCart = useMemo(() => {
    return (
      selectedOption?.length ===
      (food.options?.length || selectedOption?.length)
    );
  }, [food.options?.length, selectedOption?.length]);

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

    return totalPriceOptions + totalPriceTopping + food.price;
  };

  const onBackPress = () => navigation.goBack();

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

  const onIncreaseFoodPress = () => setFoodQuantity(value => value + 1);
  const onDecreaseFoodPress = useCallback(() => {
    if (foodQuantity > 1) {
      setFoodQuantity(foodQuantity - 1);
    }
  }, [foodQuantity]);
  const onAddToCartPress = () => {
    // update exsiting food
    if (foodRedux) {
      const newFood: FoodRedux = {
        ...foodRedux,
        options: selectedOption,
        toppings: selectedTopping,
        price: totalPrice(),
        quantity: foodQuantity,
      };
      dispatch(updateFood({newFood, restaurantId: restaurantId}));
      navigation.goBack();
      return;
    }

    // add new food
    const newFood: FoodRedux = {
      id: nanoid(),
      baseId: food?.id,
      image: food.image,
      name: food.name,
      price: totalPrice(),
      quantity: foodQuantity,
      description: food.description,
      options: selectedOption,
      toppings: selectedTopping,
    };
    dispatch(createCart(restaurant));
    dispatch(addFood({food: newFood, restaurantId: restaurant.id}));
    dispatch(addRestaurant(restaurant));
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* animated header*/}
      <AnimatedTouchableOpacity
        onPress={onBackPress}
        style={[styles.buttonBackWrapper, bgColorIconClose]}>
        <Animated.Image
          source={icons.close}
          style={[styles.icon, tintColorIconClose]}
        />
      </AnimatedTouchableOpacity>

      <Animated.View style={[styles.headerContainer, headerAnimatedStyle]}>
        <Text style={{color: COLORS.blackText, ...FONTS.title_medium}}>
          {food.name}
        </Text>
      </Animated.View>

      {/* image food */}
      <View style={styles.imageFood}>
        <Image
          source={{
            uri: food.image,
          }}
          style={{width: '100%', height: '100%'}}
        />
      </View>

      <FlatList
        overScrollMode="never"
        ListHeaderComponent={
          // name, price food
          <ListHeaderComponent foodItem={food} />
        }
        onScroll={event => onScroll(event)}
        contentContainerStyle={{
          paddingTop: SIZES.height * 0.3 - HEADER_HEIGHT,
        }}
        showsVerticalScrollIndicator={true}
        data={food.options}
        renderItem={({item}) => (
          // option item
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
        // list topping
        ListFooterComponent={
          food.toppings && (
            <ListFooterComponent
              onDecreaseToppingPress={onDecreaseToppingPress}
              onIncreaseToppingPress={onIncreaseToppingPress}
              quantityTopping={quantityTopping}
              selectedTopping={selectedTopping}
              toppings={food.toppings}
            />
          )
        }
      />

      {/* footer quantity food */}
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
          onPress={onAddToCartPress}
          disabled={!canAddToCart}
          style={[
            {
              backgroundColor: canAddToCart ? COLORS.primary : COLORS.gray3,
            },
            styles.btnAddToCartWrapper,
          ]}>
          {canAddToCart ? (
            foodRedux ? (
              <Text style={{color: COLORS.white, ...FONTS.title_medium}}>
                Thay đổi
              </Text>
            ) : (
              <>
                <Text style={{color: COLORS.white, ...FONTS.title_medium}}>
                  Thêm
                </Text>
                <View style={styles.dot} />
                <Text style={{color: COLORS.white, ...FONTS.title_medium}}>
                  {convertToVND(totalPrice() * foodQuantity)}
                </Text>
              </>
            )
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
  labelText: {color: COLORS.blackText, ...FONTS.label_large},
  subLabelText: {color: COLORS.primary, ...FONTS.body_small},

  btnAddToCartWrapper: {
    flex: 1,
    marginLeft: 3 * SIZES.spacing,
    height: 60,
    borderRadius: SIZES.radius,
    flexDirection: 'row',
    justifyContent: 'center',
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

  toppingFooter: {
    height: SIZES.height * 0.15,
    borderColor: COLORS.lightGray2,
    borderTopWidth: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    alignItems: 'center',
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
