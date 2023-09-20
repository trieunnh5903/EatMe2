import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {COLORS, FONTS, SIZES, icons} from '../config';
import {Break, ButtonText, QuantityInput} from '../components';
import {DetailFoodNavigationProps} from '../navigation/types';
import {FoodObject} from './types';
import {useAppDispatch, useAppSelector} from '../utils/hooks';
import {addItem, updateItemQuantity} from '../redux/slice/cart.slice';
import {addToFavorite, removeFromFavorite} from '../redux/slice/user.slice';
import convertToVND from '../utils/convertToVND';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Shadow} from 'react-native-shadow-2';
import {FlashList, ViewToken} from '@shopify/flash-list';
import {nanoid} from '@reduxjs/toolkit';
import {Line} from 'react-native-svg';

const HEADER_MAX_HEIGHT = SIZES.height * 0.3;
const HEADER_MIN_HEIGHT = 60;
const DetailFoodScreen = ({navigation, route}: DetailFoodNavigationProps) => {
  const {foodItem} = route.params;
  const {cartList} = useAppSelector(state => state.cart);
  const favorite = useAppSelector(state => state.user.favorite);
  const dispatch = useAppDispatch();
  const [currentFlashListIndex, setCurrentFlashListIndex] = useState(0);
  const flashListRef = useRef<FlashList<FlastListItemProps>>(null);
  const menuListRef = useRef<FlatList>(null);

  const isFavorite = favorite.some(
    (product: FoodObject) => product.id === foodItem.id,
  );

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorite(foodItem));
    } else {
      dispatch(addToFavorite(foodItem));
    }
  };

  const onMenuListPress = (index: number) => {
    flashListRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });
    menuListRef.current?.scrollToIndex({
      index: index,
      animated: true,
    });
  };

  const onViewableItemsChanged = (info: {
    viewableItems: ViewToken[];
    changed: ViewToken[];
  }) => {
    if (info.viewableItems.length > 1) {
      // Lấy index của phần tử đầu tiên trong danh sách viewableItems
      const currentIndex = info.viewableItems[0].index;
      if (currentIndex !== null) {
        setCurrentFlashListIndex(currentIndex);
        menuListRef.current?.scrollToIndex({
          index: currentIndex,
          animated: true,
        });
      }
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Shadow style={styles.menuList}>
        <View style={styles.headerContainer}>
          {/* btn back */}
          <TouchableOpacity
            style={styles.buttonBackWrapper}
            onPress={() => navigation.goBack()}>
            <Image source={icons.arrow_back} style={styles.icon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.searchContainer}>
            {/* icon */}
            <Image source={icons.search} style={styles.iconSearch} />
            <TextInput
              style={{width: '85%'}}
              placeholderTextColor={COLORS.gray}
              cursorColor={COLORS.gray}
              placeholder={`Tìm món tại ${foodItem.name}`}
            />
            {/* text input */}
          </TouchableOpacity>

          {/* btn favorite */}
          <TouchableOpacity
            onPress={() => handleToggleFavorite()}
            style={[styles.buttonFavoriteWrapper, {alignItems: 'center'}]}>
            <Image
              source={isFavorite ? icons.favourite_fill : icons.favourite}
              style={[styles.icon]}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          ref={menuListRef}
          contentContainerStyle={styles.menuListContentContainer}
          data={DATA}
          horizontal
          renderItem={({item, index}) => {
            const textColor =
              currentFlashListIndex === index ? COLORS.white : COLORS.blackText;
            const backgroundColor =
              currentFlashListIndex === index ? COLORS.primary : COLORS.white;
            return (
              <TouchableOpacity
                onPress={() => {
                  onMenuListPress(index);
                }}
                style={[styles.menuItem, {backgroundColor: backgroundColor}]}
                key={item.label}>
                <Text style={[{color: textColor}, FONTS.label_large]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </Shadow>
      <FlashList
        onViewableItemsChanged={onViewableItemsChanged}
        ref={flashListRef}
        onEndReachedThreshold={0.1}
        data={DATA}
        estimatedItemSize={SIZES.width}
        renderItem={({item}) => <FlastListItem item={item} />}
      />
    </SafeAreaView>
  );
};

interface FlastListItemProps {
  label: string;
  data: {
    name: string;
    description: string;
    price: number;
    image: string;
    id: string;
  }[];
}

const FlastListItem = ({item: categoryItem}: {item: FlastListItemProps}) => {
  const lastIndex = categoryItem.data.length - 1;
  return (
    <View style={{width: SIZES.width}}>
      <Text style={styles.categoryWrapper}>{categoryItem.label}</Text>
      <View>
        {categoryItem.data.map((item, index) => (
          <View key={item.id} style={{width: '100%'}}>
            <View style={styles.foodItemWrapper}>
              <View style={{flex: 1, justifyContent: 'space-between'}}>
                <Text style={[{color: COLORS.blackText}, FONTS.title_medium]}>
                  {item.name}
                </Text>
                <Text style={[{color: COLORS.gray}]}>{item.description}</Text>
                <Text>{convertToVND(item.price)}</Text>
              </View>
              <Image
                source={{uri: item.image}}
                style={{width: SIZES.width * 0.2, height: SIZES.width * 0.2}}
              />
            </View>
            {index !== lastIndex && <Break height={1} />}
          </View>
        ))}
      </View>
    </View>
  );
};

const DATA = [
  {
    label: 'Khuyến mãi',
    data: [
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/image-3111762a-200910114155.jpeg',
      },
    ],
  },
  {
    label: 'Thực đơn',
    data: [
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/image-3111762a-200910114155.jpeg',
      },
    ],
  },
  {
    label: 'Chọn thêm',
    data: [
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/image-3111762a-200910114155.jpeg',
      },
    ],
  },
  {
    label: 'Không thể bỏ lở',
    data: [
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/image-3111762a-200910114155.jpeg',
      },
      {
        name: 'Bún bò - chả',
        id: nanoid(),
        description: 'Bao gồm: hộp, muỗng, đũa mang về',
        price: 31000,
        image:
          'https://images.foody.vn/res/g2/11349/prof/image-3111762a-200910114155.jpeg',
      },
    ],
  },
];

{
  /* header */
}
//   <Animated.View style={[styles.header, headerStyle]}>
//   <Shadow>
//     <View style={styles.headerContainer}>
//       {/* btn back */}
//       <TouchableOpacity
//         style={styles.buttonBackWrapper}
//         onPress={() => navigation.goBack()}>
//         <Image source={icons.arrow_back} style={styles.icon} />
//       </TouchableOpacity>

//       <TouchableOpacity style={styles.searchContainer}>
//         {/* icon */}
//         <Image source={icons.search} style={styles.iconSearch} />
//         <TextInput
//           style={{width: '85%'}}
//           placeholderTextColor={COLORS.gray}
//           cursorColor={COLORS.gray}
//           placeholder={`Tìm món tại ${foodItem.name}`}
//         />
//         {/* text input */}
//       </TouchableOpacity>

//       {/* btn favorite */}
//       <TouchableOpacity
//         onPress={() => handleToggleFavorite()}
//         style={[styles.buttonFavoriteWrapper, {alignItems: 'center'}]}>
//         <Image
//           source={isFavorite ? icons.favourite_fill : icons.favourite}
//           style={[styles.icon]}
//         />
//       </TouchableOpacity>
//     </View>
//   </Shadow>
// </Animated.View>

// <Animated.ScrollView
//   onScroll={onListViewScroll}
//   showsVerticalScrollIndicator={false}>
//   {/* image */}
//   <View style={styles.imageFoodWrapper}>
//     <AnimatedImageBackGround
//       resizeMode={'cover'}
//       style={[styles.imageFood, animtedStyles]}
//       source={{uri: foodItem.image}}>
//       <TouchableOpacity
//         onPress={() => navigation.goBack()}
//         style={styles.iconHeaderWrapper}>
//         <Image
//           style={[styles.icon, {tintColor: COLORS.white}]}
//           source={icons.arrow_back}
//         />
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => handleToggleFavorite()}
//         style={styles.iconHeaderWrapper}>
//         <Image
//           style={[
//             styles.icon,
//             {tintColor: isFavorite ? COLORS.primary : COLORS.white},
//           ]}
//           source={isFavorite ? icons.favourite_fill : icons.favourite}
//         />
//       </TouchableOpacity>
//     </AnimatedImageBackGround>
//   </View>

//   {/* content */}
//   <View style={styles.infoFoodWrapper}>
//     {/* input quantity */}
//     <QuantityInput
//       iconLeft={icons.remove_wght500}
//       iconRight={icons.add_wght500}
//       onAddPress={() => setQuantity(value => value + 1)}
//       onRemovePress={() => {
//         if (quantity > 0) {
//           setQuantity(quantity - 1);
//         }
//       }}
//       labelStyle={styles.quantityLabel}
//       iconContainerStyle={styles.quantityIconContainer}
//       quantity={quantity}
//       iconStyle={styles.quantityIcon}
//       containerStyle={styles.quantityContainer}
//     />
//     {/* title */}
//     <View style={styles.foodTitle}>
//       <View style={{flex: 1}}>
//         <Text style={styles.textTitle}>{foodItem.name}</Text>
//       </View>
//     </View>
//     {/* địa chỉ */}
//     <View>
//       <Text style={styles.textAddress}>
//         142 Ba Đình, P. 10, Quận 8, TP. HCM
//       </Text>
//     </View>
//     <Text style={styles.textPrice}>
//       Giá: {convertToVND(foodItem.price)}
//     </Text>
//     {/* desc */}
//     <TextMore />
//     {/* delivery */}
//     <View style={styles.deliveryWrapper}>
//       <Image source={icons.clock} style={styles.icon} />
//       <Text
//         style={{
//           marginHorizontal: SIZES.radius,
//           color: COLORS.black,
//           ...FONTS.title_medium,
//         }}>
//         Thời gian giao hàng dự kiến:
//         <Text
//           style={{
//             color: COLORS.gray,
//             ...FONTS.title_medium,
//           }}>
//           {' '}
//           30 Phút
//         </Text>
//       </Text>
//     </View>
//   </View>
// </Animated.ScrollView>
// {/* footer */}
// <ButtonText
//   onPress={() => onAddToCartPress(foodItem)}
//   label={'Thêm vào giỏ hàng'}
//   containerStyle={styles.buttonFooter}
//   labelStyle={styles.labelFooter}
// />

// const TextMore = () => {
//   const descText =
//     "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)" +
//     "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";
//   return (
//     <>
//       <Text
//         style={{
//           color: COLORS.blackText,
//           ...FONTS.body_large,
//         }}>
//         {descText}
//       </Text>
//     </>
//   );
// };

export default DetailFoodScreen;

const styles = StyleSheet.create({
  menuListContentContainer: {
    paddingLeft: SIZES.spacing,
    alignItems: 'center',
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
    height: HEADER_MIN_HEIGHT,
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

  headerContainer: {
    width: SIZES.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SIZES.radius,
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
    height: HEADER_MAX_HEIGHT,
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
