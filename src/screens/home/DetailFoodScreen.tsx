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
import {FoodObjectProps} from '../types';

interface InformationFoodProps {
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  quantity: number;
  item: FoodObjectProps;
}
const TextMore = () => {
  const descText =
    "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).";
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <Text style={{color: COLORS.blackText, ...FONTS.body_large}}>
        {expanded ? descText : descText.substring(0, 150) + '...'}
      </Text>
      {!expanded ? (
        <TouchableOpacity onPress={toggleExpansion}>
          <Text style={styles.readMore}>Xem thêm</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={toggleExpansion}>
          <Text style={styles.readLess}>Thu gọn</Text>
        </TouchableOpacity>
      )}
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
        <View>
          <Text style={styles.textBody}>Mcdonalds</Text>
        </View>
        <Text style={styles.textTitle}>{item.name}</Text>
      </View>
      <Text
        style={[
          styles.textTitle,
          {
            paddingHorizontal: SIZES.padding,
          },
        ]}>
        ${item.price}
      </Text>
    </View>
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
  // const dispatch = useDispatch();
  // const cartList = useSelector(state => state.cart.cartList);
  // const favorite = useSelector(state => state.user.favorite);
  // const foodItem = route.params;
  const {foodItem} = route.params;
  console.log(foodItem);
  const isFavorite = true;
  // const isFavorite = favorite.some(product => product.id === foodItem.id);
  const [quantity, setQuantity] = useState<number>(1);
  // const handleToggleFavorite = () => {
  //   if (isFavorite) {
  //     // dispatch(removeFromFavorite(foodItem));
  //   } else {
  //     // dispatch(addToFavorite(foodItem));
  //   }
  // };

  // const onAddToCartPress = item => {
  //   const existingItem = cartList.find(itemCart => itemCart.id === item.id);
  //   if (existingItem) {
  //     Toast.show('The product already exists in the cart.', Toast.LONG);
  //     return;
  //   }
  //   dispatch(addItem({...item, quantity}));
  //   navigation.goBack();
  //   Toast.show('Add to cart successfully');
  // };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* header */}
        <HeaderCustom
          containerStyle={{
            paddingHorizontal: SIZES.padding,
          }}
          leftComponent={
            <TouchableOpacity
              style={styles.buttonNavWrapper}
              onPress={() => navigation.goBack()}>
              <Image source={icons.arrow_back} style={styles.icon} />
            </TouchableOpacity>
          }
          rightComponent={
            <TouchableOpacity
              // onPress={() => handleToggleFavorite()}
              style={[styles.buttonNavWrapper, {alignItems: 'center'}]}>
              <Image
                source={isFavorite ? icons.favourite_fill : icons.favourite}
                style={[
                  styles.icon,
                  {tintColor: isFavorite ? COLORS.primary : COLORS.black},
                ]}
              />
            </TouchableOpacity>
          }
        />
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
        {/* footer */}
        <ButtonText
          // onPress={() => onAddToCartPress(foodItem)}
          label={'Thêm vào giỏ hàng'}
          containerStyle={styles.buttonFooter}
          labelStyle={styles.labelFooter}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailFoodScreen;

const styles = StyleSheet.create({
  buttonNavWrapper: {
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
  },

  deliveryWrapper: {flexDirection: 'row', marginTop: SIZES.base},

  quantityIconContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    marginHorizontal: SIZES.radius,
  },

  imageFoodWrapper: {paddingHorizontal: SIZES.padding, alignItems: 'center'},

  labelFooter: {
    color: COLORS.white,
    ...FONTS.label_medium,
    fontWeight: 'bold',
  },

  foodTitle: {
    marginTop: SIZES.padding + SIZES.padding / 2,
    flexDirection: 'row',
    alignItems: 'center',
  },

  quantityIcon: {
    width: 36,
    height: 36,
    tintColor: COLORS.white,
  },

  quantityContainer: {
    backgroundColor: COLORS.primary,
    borderRadius: 3 * SIZES.radius,
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
    backgroundColor: COLORS.white,
    paddingHorizontal: SIZES.padding,
  },

  buttonFooter: {
    marginTop: SIZES.radius,
    marginBottom: SIZES.radius,
    marginHorizontal: SIZES.padding,
    height: 50,
    flex: 1,
    borderRadius: SIZES.padding,
    backgroundColor: COLORS.primary,
  },

  textTitle: {
    color: COLORS.blackText,
    ...FONTS.headline_medium,
    fontWeight: 'bold',
  },
  textBody: {
    color: COLORS.blackText,
    ...FONTS.body_large,
  },

  imageFood: {
    height: SIZES.height * 0.4,
    width: SIZES.width - 2 * SIZES.padding,
    resizeMode: 'contain',
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
