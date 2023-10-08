import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS, FONTS, SIZES, icons} from '../config';
import {HeaderCustom, QuantityInput} from '../components';
import convertToVND from '../utils/convertToVND';
import {FoodReduxType} from '../types/types';
import useCartController from '../view-controllers/useCartController';
import {CartScreenProp} from '../types/navigation.type';

const FoodItem = ({
  data,
  onDecreaseFoodFress,
  onIncreaseFoodFress,
}: {
  data: FoodReduxType;
  onIncreaseFoodFress: (id: string) => void;
  onDecreaseFoodFress: (id: string, quantity: number) => void;
}) => {
  return (
    <View style={styles.itemContainer}>
      {/* content */}
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text style={styles.itemName}>{data.name}</Text>
          <Text style={{color: COLORS.gray, ...FONTS.body_small}}>
            {data.options?.map((item, index) => {
              const lastIndex = data.options?.length;
              if (lastIndex) {
                if (index === lastIndex - 1) {
                  return item.option;
                }
              }
              return item.option + ', ';
            })}
            {data.toppings?.map((item, index) => {
              const lastIndex = data.toppings?.length;
              if (lastIndex) {
                if (index === lastIndex - 1) {
                  return item.name;
                }
              }
              return item.name + ', ';
            })}
          </Text>
        </View>
        <View style={styles.quantityWrapper}>
          <Text style={styles.totalPrice}>
            {convertToVND(data.price * data.quantity)}
          </Text>
          <View style={styles.paymentWrapper}>
            {/* quantity input */}
            <QuantityInput
              onAddPress={() => onIncreaseFoodFress(data.id)}
              onRemovePress={() => onDecreaseFoodFress(data.id, data.quantity)}
              iconLeft={icons.remove_wght700}
              iconRight={icons.add_wght700}
              labelStyle={styles.labelQuantityInput}
              iconContainerStyle={styles.iconQuantityInputContainer}
              quantity={data.quantity || 0}
              iconStyle={styles.iconQuantityInput}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const CartScreen = ({route}: CartScreenProp) => {
  const {
    cartList = [],
    numOfFood,
    totalPrice,
    onBackPress,
    onDecreaseFoodFress,
    onIncreaseFoodFress,
  } = useCartController(route.params.idInvoices);

  return (
    <SafeAreaView style={styles.container}>
      {/* header navigation */}
      <HeaderCustom
        leftComponent={
          <TouchableOpacity onPress={onBackPress}>
            <Image source={icons.close} style={styles.icon} />
          </TouchableOpacity>
        }
        rightComponent={
          cartList.length > 0 ? (
            // có sản phẩm
            <TouchableOpacity>
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
            renderItem={({item}) => (
              <FoodItem
                data={item}
                onDecreaseFoodFress={onDecreaseFoodFress}
                onIncreaseFoodFress={onIncreaseFoodFress}
              />
            )}
          />
          {/* nút thanh toán */}
          <View>
            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={styles.textTitle}>{numOfFood} sản phẩm</Text>
              <Text style={styles.textTitle}>Thanh toán</Text>
              <Text style={styles.textTitle}>{convertToVND(totalPrice)}</Text>
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
                ...FONTS.title_large,
              }}>
              Giỏ hàng của bạn trống!
            </Text>
          </View>
          <TouchableOpacity style={styles.buttonStartShopping}>
            <Text style={styles.textTitle}>Mua sắm ngay</Text>
          </TouchableOpacity>
        </>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  quantityInputContainer: {
    justifyContent: 'space-between',
    marginVertical: 6,
  },

  imageEmty: {
    tintColor: COLORS.primary,
    width: 70,
    height: 70,
  },

  quantityWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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

  paymentWrapper: {
    alignItems: 'flex-end',
    margin: SIZES.radius,
  },
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
    height: 32,
    width: 32,
    backgroundColor: COLORS.lightGray2,
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
    width: 16,
    height: 16,
    tintColor: COLORS.primary,
  },

  down_arrow: {width: 18, height: 18, tintColor: COLORS.black},

  labelQuantityInput: {
    color: COLORS.blackText,
    ...FONTS.label_large,
    marginHorizontal: 15,
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
    ...FONTS.label_large,
  },

  itemImage: {
    borderRadius: SIZES.radius,
    marginRight: SIZES.spacing,
    width: SIZES.width * 0.2,
    height: '100%',
    resizeMode: 'cover',
  },

  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.spacing,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.lightGray2,
    minHeight: 130,
  },

  textTitle: {
    color: COLORS.white2,
    ...FONTS.title_medium,
    fontWeight: 'bold',
  },

  icon: {
    width: 28,
    height: 28,
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
