import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES, icons} from '../../config';
import {ButtonText, HeaderCustom, QuantityInput} from '../../components';
import {DetailFoodNavigationProps} from '../../navigation/types';
import {FoodObject} from '../types';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {addItem, updateItemQuantity} from '../../redux/slice/cart.slice';
import {addToFavorite, removeFromFavorite} from '../../redux/slice/user.slice';

interface InformationFoodProps {
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  quantity: number;
  item: FoodObject;
}

const TextMore = () => {
  const descText =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";
  return (
    <>
      <Text
        style={{
          color: COLORS.blackText,
          ...FONTS.body_large,
        }}>
        {descText.substring(0, 150) + '...'}
      </Text>
    </>
  );
};

const InformationFood: React.FC<InformationFoodProps> = ({
  setQuantity,
  quantity,
  item,
}) => (
  <View style={styles.infoFoodWrapper}>
    {/* input quantity */}
    <QuantityInput
      onAddPress={() => setQuantity(value => value + 1)}
      onRemovePress={() => {
        if (quantity > 0) {
          setQuantity(quantity - 1);
        }
      }}
      labelStyle={styles.quantityLabel}
      iconContainerStyle={styles.quantityIconContainer}
      quantity={quantity}
      iconStyle={styles.quantityIcon}
      containerStyle={styles.quantityContainer}
    />
    {/* title */}
    <View style={styles.foodTitle}>
      <View style={{flex: 1}}>
        <Text style={styles.textTitle}>{item.name}</Text>
      </View>
    </View>
    {/* địa chỉ */}
    <View>
      <Text style={styles.textAddress}>
        142 Ba Đình, P. 10, Quận 8, TP. HCM
      </Text>
    </View>
    <Text style={styles.textPrice}>Giá: {item.price}đ</Text>
    {/* desc */}
    <TextMore />
    {/* delivery */}
    <View style={styles.deliveryWrapper}>
      <Image source={icons.clock} style={styles.icon} />
      <Text
        style={{
          marginHorizontal: SIZES.radius,
          color: COLORS.black,
          ...FONTS.title_medium,
        }}>
        Thời gian giao hàng dự kiến:
        <Text
          style={{
            color: COLORS.gray,
            ...FONTS.title_medium,
          }}>
          {' '}
          30 Phút
        </Text>
      </Text>
    </View>
  </View>
);

const DetailFoodScreen = ({navigation, route}: DetailFoodNavigationProps) => {
  const {foodItem} = route.params;
  const {cartList} = useAppSelector(state => state.cart);
  const favorite = useAppSelector(state => state.user.favorite);
  const dispatch = useAppDispatch();
  const isFavorite = favorite.some(product => product.id === foodItem.id);
  const [quantity, setQuantity] = useState<number>(1);
  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorite(foodItem));
    } else {
      dispatch(addToFavorite(foodItem));
    }
  };

  const onAddToCartPress = (item: FoodObject) => {
    const existingItem = cartList.find(
      (itemCart: FoodObject) => itemCart.id === item.id,
    );
    if (existingItem) {
      if (quantity === 1) {
        dispatch(
          updateItemQuantity({...item, quantity: existingItem.quantity + 1}),
        );
      } else {
        dispatch(
          updateItemQuantity({
            ...item,
            quantity: existingItem.quantity + quantity,
          }),
        );
      }
    } else {
      dispatch(addItem({...item, quantity}));
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        {/* header */}
        {/* btn back */}
        <TouchableOpacity
          style={styles.buttonBackWrapper}
          onPress={() => navigation.goBack()}>
          <Image source={icons.arrow_back} style={styles.icon} />
        </TouchableOpacity>
        {/* btn favorite */}
        <TouchableOpacity
          onPress={() => handleToggleFavorite()}
          style={[styles.buttonFavoriteWrapper, {alignItems: 'center'}]}>
          <Image
            source={isFavorite ? icons.favourite_fill : icons.favourite}
            style={[
              styles.icon,
              {tintColor: isFavorite ? COLORS.primary : COLORS.black},
            ]}
          />
        </TouchableOpacity>
        {/* image */}
        <View style={styles.imageFoodWrapper}>
          <Image style={styles.imageFood} source={{uri: foodItem.image}} />
        </View>
        {/* content */}
        <InformationFood
          item={foodItem}
          quantity={quantity}
          setQuantity={setQuantity}
        />
      </ScrollView>
      {/* footer */}
      <ButtonText
        onPress={() => onAddToCartPress(foodItem)}
        label={'Thêm vào giỏ hàng'}
        containerStyle={styles.buttonFooter}
        labelStyle={styles.labelFooter}
      />
    </SafeAreaView>
  );
};

export default DetailFoodScreen;

const styles = StyleSheet.create({
  buttonBackWrapper: {
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    top: SIZES.padding,
    left: SIZES.padding,
    backgroundColor: COLORS.lightGray2,
  },

  textPrice: {
    color: COLORS.primary,
    ...FONTS.title_medium,
  },

  buttonFavoriteWrapper: {
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
    top: SIZES.padding,
    right: SIZES.padding,
    backgroundColor: COLORS.lightGray2,
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

  imageFoodWrapper: {
    height: SIZES.height * 0.4,
    width: SIZES.width,
  },

  labelFooter: {
    color: COLORS.white,
    ...FONTS.title_medium,
    fontWeight: 'bold',
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
    height: undefined,
    width: undefined,
    flex: 1,
    resizeMode: 'cover',
  },

  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
