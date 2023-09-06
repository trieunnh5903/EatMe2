import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONTS, SIZES, icons} from '../../config';
import {HeaderCustom, QuantityInput} from '../../components';
import {useAppDispatch, useAppSelector} from '../../utils/hooks';
import {FoodObject} from '../types';
import {CartScreenProp} from '../../navigation/types';
import {
  clearCart,
  removeItem,
  updateItemQuantity,
} from '../../redux/slice/cart.slice';

const FoodItem = ({data, index}: {data: FoodObject; index: number}) => {
  const dispatch = useAppDispatch();
  // xử lí tăng sản phẩm
  const onIncreasePress = useCallback(
    (item: FoodObject, previousQuantity: number) => {
      const quantity = previousQuantity + 1;
      dispatch(updateItemQuantity({...item, quantity}));
    },
    [dispatch],
  );

  // xử lí giảm sản phẩm
  const onDecreasePress = useCallback(
    (item: FoodObject) => {
      const {id, quantity} = item;
      if (quantity > 1) {
        const newQuantity = quantity - 1;
        dispatch(updateItemQuantity({...item, quantity: newQuantity}));
      } else {
        dispatch(removeItem(id));
      }
    },
    [dispatch],
  );
  return (
    <View style={styles.itemContainer}>
      {/* image */}
      <Image
        style={styles.itemImage}
        source={{
          uri: data.image,
        }}
      />
      {/* content */}
      <View style={{flex: 1}}>
        <Text style={styles.itemName}>{data.name}</Text>
        <TouchableOpacity style={styles.itemBtnDetail}>
          <Text
            style={{
              color: COLORS.darkGray,
              ...FONTS.title_small,
            }}>
            Xem chi tiết
          </Text>
          <Image source={icons.down_arrow} style={styles.down_arrow} />
        </TouchableOpacity>
      </View>
      <View style={styles.paymentWrapper}>
        {/* total price */}
        <Text style={styles.totalPrice}>${data.priceTotal}</Text>
        {/* quantity input */}
        <QuantityInput
          onAddPress={() => onIncreasePress(data, data.quantity)}
          onRemovePress={() => onDecreasePress(data)}
          labelStyle={styles.labelQuantityInput}
          iconContainerStyle={styles.iconQuantityInputContainer}
          quantity={data.quantity}
          iconStyle={styles.iconQuantityInput}
          containerStyle={styles.quantityInputContainer}
        />
        <Text
          style={{
            color: COLORS.black,
            ...FONTS.label_medium,
          }}>
          ${data.price}/sản phẩm
        </Text>
      </View>
    </View>
  );
};

const CartScreen = ({navigation}: CartScreenProp) => {
  const {cartList, totalCartPrice} = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  // tổng số lượng sản phẩm
  const sumQuantityProduct = () => {
    return cartList.reduce((sum, item) => sum + item.quantity, 0);
  };

  // xử lí nút xóa tất cả sản phẩm
  const onDeleteAll = () => {
    Alert.alert(
      'Thông báo',
      'Bạn muốn xóa tất cả sản phẩm không?',
      [
        {
          text: 'Hủy',
          style: 'default',
        },
        {
          text: 'Đồng ý',
          onPress: () => dispatch(clearCart()),
          style: 'default',
        },
      ],
      {
        cancelable: false,
      },
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* header navigation */}
      <HeaderCustom
        leftComponent={
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.btnBack}>
            <Image source={icons.arrow_back} style={styles.icon} />
          </TouchableOpacity>
        }
        rightComponent={
          cartList.length > 0 ? (
            // có sản phẩm
            <TouchableOpacity onPress={() => onDeleteAll()}>
              <Text
                style={{
                  color: COLORS.red,
                  ...FONTS.title_small,
                }}>
                Xóa tất cả
              </Text>
            </TouchableOpacity>
          ) : (
            // không có sản phẩm
            <View style={styles.transparent} />
          )
        }
        title={'Giỏ hàng'}
        containerStyle={{
          paddingHorizontal: SIZES.radius,
        }}
      />

      {cartList.length > 0 ? (
        <>
          {/* có sản phẩm trong giỏ hàng */}
          {/* list */}
          <FlatList
            data={cartList}
            keyExtractor={item => {
              return item.id;
            }}
            renderItem={({item, index}) => (
              <FoodItem data={item} index={index} />
            )}
          />
          {/* nút thanh toán */}
          <View
            style={{
              backgroundColor: COLORS.white,
              width: SIZES.width,
            }}>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.textTitle}>
                {sumQuantityProduct() || 0} sản phẩm
              </Text>
              <Text style={styles.textTitle}>Thanh toán</Text>
              <Text style={styles.textTitle}>${totalCartPrice}</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        // không có sản phẩm trong giỏ hàng
        <>
          <View style={styles.emptyWrapper}>
            <Image style={styles.imageEmty} source={icons.cart_weight400} />
            <Text
              style={{
                color: COLORS.black,
                ...FONTS.headline_small,
              }}>
              Giỏ hàng của bạn trống!
            </Text>
          </View>
          <View
            style={{
              backgroundColor: COLORS.white,
              width: SIZES.width,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Home')}
              style={styles.buttonStartShopping}>
              <Text style={styles.textTitle}>Mua sắm ngay</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  quantityInputContainer: {
    justifyContent: 'space-between',
    height: 40,
    marginVertical: 6,
  },

  imageEmty: {
    tintColor: COLORS.primary,
    width: 70,
    height: 70,
  },

  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonStartShopping: {
    margin: SIZES.radius,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },

  paymentWrapper: {alignItems: 'flex-end', marginHorizontal: SIZES.radius},
  btnBack: {
    paddingHorizontal: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  transparent: {
    paddingHorizontal: SIZES.radius,
    width: 24,
    height: 24,
  },

  iconQuantityInputContainer: {
    borderColor: COLORS.primary,
    borderWidth: 1,
    height: 40,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.base,
  },

  checkoutButton: {
    margin: SIZES.radius,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },
  iconQuantityInput: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },

  down_arrow: {width: 18, height: 18, tintColor: COLORS.black},

  labelQuantityInput: {
    color: COLORS.blackText,
    ...FONTS.title_medium,
    fontWeight: 'bold',
    marginHorizontal: SIZES.radius,
  },

  totalPrice: {
    color: COLORS.black,
    ...FONTS.title_medium,
    fontWeight: 'bold',
  },
  hiddenLayoutContainer: {
    width: 100,
    height: 100,
    backgroundColor: COLORS.primary,
  },
  hiddenLayoutIcon: {
    width: 48,
    height: 48,
    tintColor: COLORS.white,
  },
  hiddenLayoutWrapper: {
    height: 100,
    width: SIZES.width,
    alignItems: 'flex-end',
  },
  itemBtnDetail: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },

  itemName: {
    color: COLORS.blackText,
    ...FONTS.title_medium,
  },

  itemImage: {
    margin: SIZES.base,
    width: 70,
    height: 80,
    resizeMode: 'contain',
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SIZES.radius,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray2,
  },

  textTitle: {
    color: COLORS.white2,
    ...FONTS.title_medium,
    fontWeight: 'bold',
  },

  icon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },

  imageCard: {
    width: 110,
    height: 110,
    marginTop: 20,
  },

  horizontalFoodCard: {
    height: 150,
    marginHorizontal: SIZES.padding,
    marginBottom: SIZES.radius,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
});
