/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Break, ButtonIcon, ButtonText, Dot, HeaderCustom} from '../components';
import {COLORS, FONTS, SIZES, icons} from '../config';
import {RestaurantInformation} from '../types/types';
import {store, useAppDispatch, useAppSelector} from '../redux/store';
import {
  getTotalFoodCount,
  getTotalFoodPriceOneInvoice,
  useSelectAllRestaurant,
} from '../redux/hooks';
import {useNavigation} from '@react-navigation/native';
import convertToVND from '../utils/convertToVND';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {deleteAllFoodPerRestaurant} from '../redux/slice/cart.slice';
import {deleteRestaurant} from '../redux/slice/restaurant.slice';
import {ListInvoicesScreenProp} from '../types/navigation.type';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Image} from 'react-native';

const initialCheckedId: Set<string> = new Set();
const ListInvoices = () => {
  console.log('ListInvoices');
  const [isDelete, setIsDelete] = useState(false);
  const navigation = useNavigation<ListInvoicesScreenProp['navigation']>();
  const listRestaurant = useAppSelector(useSelectAllRestaurant);

  const [checkedId, setCheckedId] = useState(initialCheckedId);
  const checkedIdLenghth = checkedId.size;
  const canDelete = checkedIdLenghth > 0;
  const numberOfSelected = canDelete ? '(' + checkedIdLenghth + ')' : '';
  const isAllSelected = checkedIdLenghth === listRestaurant.length;
  const dispatch = useAppDispatch();
  const onRestaurantPress = (restaurantId: string) => {
    if (isDelete) {
      const newCheckedId = new Set(checkedId);
      if (!newCheckedId.has(restaurantId)) {
        newCheckedId.add(restaurantId);
      } else {
        newCheckedId.delete(restaurantId);
      }
      setCheckedId(newCheckedId);
    } else {
      navigation.navigate('CheckoutScreen', {restaurantId: restaurantId});
    }
  };

  const onSelectAllPress = () => {
    if (isAllSelected) {
      setCheckedId(initialCheckedId);
    } else {
      const newCheckedId = new Set<string>();
      listRestaurant?.map(item => newCheckedId.add(item.id));
      setCheckedId(newCheckedId);
    }
  };

  const onBackPress = () => navigation.goBack();
  const onToggleDeletePress = () => setIsDelete(!isDelete);
  const onDeletePress = () => {
    dispatch(deleteAllFoodPerRestaurant([...checkedId]));
    dispatch(deleteRestaurant([...checkedId]));
  };

  const onShoppingPress = () => {
    navigation.navigate('HomeScreen');
  };
  return (
    <View style={styles.container}>
      {/* header navigation */}
      <HeaderCustom
        containerStyle={styles.headerWrapperContainer}
        title="Danh sách hóa đơn"
        leftComponent={
          <ButtonIcon
            onPress={onBackPress}
            icon={icons.close}
            containerStyle={styles.btnBack}
            iconStyle={styles.icon}
          />
        }
        rightComponent={<View style={styles.btnBack} />}
      />

      {/* có hóa đơn */}
      {listRestaurant.length > 0 ? (
        <>
          <FlatList
            ItemSeparatorComponent={() => <Break height={2} />}
            ListHeaderComponent={
              <View style={styles.headerWrapper}>
                <Text style={styles.textBlackBold}>Đơn lẻ</Text>
                <TouchableOpacity onPress={onToggleDeletePress}>
                  <Text
                    style={[
                      styles.textRed,
                      {color: isDelete ? COLORS.primary : COLORS.red},
                    ]}>
                    {isDelete ? 'Hủy' : 'Xóa'}
                  </Text>
                </TouchableOpacity>
              </View>
            }
            data={listRestaurant}
            renderItem={props => {
              const isChecked = checkedId.has(props.item.id);
              const backgroundColor = isChecked ? COLORS.primary : COLORS.white;
              const borderWidth = isChecked ? 0 : 1;
              return (
                <TouchableOpacity
                  onPress={() => onRestaurantPress(props.item.id)}
                  style={{flex: 1, flexDirection: 'row'}}>
                  {isDelete && (
                    <View style={styles.checkSquareWrapper}>
                      <View
                        style={[
                          {
                            borderWidth,
                            backgroundColor,
                          },
                          styles.btnCheck,
                        ]}>
                        {isChecked && (
                          <FontAwesome6
                            name="check"
                            color={COLORS.white}
                            size={18}
                          />
                        )}
                      </View>
                    </View>
                  )}
                  <FoodItem {...props} />
                </TouchableOpacity>
              );
            }}
          />
          {isDelete && (
            <View style={styles.deleteWrapper}>
              <TouchableOpacity
                onPress={onSelectAllPress}
                style={styles.btnSelectAll}>
                <View
                  style={[
                    {
                      backgroundColor: isAllSelected
                        ? COLORS.primary
                        : COLORS.white,
                      borderWidth: isAllSelected ? 0 : 1,
                    },
                    styles.btnCheck,
                  ]}>
                  {isAllSelected && (
                    <FontAwesome6 name="check" color={COLORS.white} size={18} />
                  )}
                </View>
                <Text style={styles.textGrayBold}>Chọn tất cả</Text>
              </TouchableOpacity>
              <ButtonText
                onPress={onDeletePress}
                disabled={!canDelete}
                labelStyle={{color: COLORS.white}}
                containerStyle={styles.btnCheckout}
                label={`Xóa ${numberOfSelected}`}
              />
            </View>
          )}
        </>
      ) : (
        // sau khi xóa hóa đơn hiện danh sách rỗng
        <>
          <View style={styles.emptyWrapper}>
            <MaterialCommunityIcons
              name="ticket-confirmation-outline"
              color={COLORS.primary}
              size={70}
            />
            {/* <Image style={styles.imageEmty} source={icons.cart_weight400} /> */}
            <Text
              style={{
                color: COLORS.black,
                ...FONTS.title_large,
              }}>
              Hóa đơn của bạn trống!
            </Text>
          </View>
          <TouchableOpacity
            onPress={onShoppingPress}
            style={styles.buttonStartShopping}>
            <Text style={styles.textTitle}>Mua sắm ngay</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const FoodItem: React.FC<ListRenderItemInfo<RestaurantInformation>> = ({
  item,
}) => {
  const totalFood = getTotalFoodCount(store.getState(), item.id);
  const totalPrice = getTotalFoodPriceOneInvoice(store.getState(), item.id);
  return (
    <View style={[styles.horizontalCard]}>
      <Image
        style={[styles.imageFood]}
        source={{uri: item.image}}
        resizeMode={'cover'}
      />
      {/* tên */}
      <View style={styles.contentWrapper}>
        <Text
          numberOfLines={2}
          style={[FONTS.body_large, {color: COLORS.blackText}]}>
          {item.name}
        </Text>
        {/* address */}
        <Text
          numberOfLines={1}
          style={[FONTS.body_small, {color: COLORS.darkGray}]}>
          {item.address}
        </Text>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          {/* giá */}
          <View style={styles.rowWrapper}>
            <Text style={styles.textBlackBold}>{convertToVND(totalPrice)}</Text>
            <Dot />
            <Text style={styles.textBlackBold}>{totalFood} món</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ListInvoices;

const styles = StyleSheet.create({
  buttonStartShopping: {
    margin: SIZES.radius,
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.primary,
  },

  emptyWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSelectAll: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
    gap: 16,
  },
  deleteWrapper: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    backgroundColor: COLORS.white,
  },
  btnCheckout: {
    backgroundColor: COLORS.primary,
    height: 60,
    flex: 1,
    marginLeft: SIZES.spacing,
    paddingHorizontal: SIZES.spacing,
    borderRadius: SIZES.radius,
  },
  btnCheck: {
    width: 22,
    height: 22,
    borderColor: COLORS.gray,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },

  imageEmty: {
    tintColor: COLORS.primary,
    width: 70,
    height: 70,
  },

  textTitle: {
    color: COLORS.white2,
    ...FONTS.title_medium,
    fontWeight: 'bold',
  },

  checkSquareWrapper: {
    width: SIZES.width * 0.1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: COLORS.white,
  },
  contentWrapper: {
    marginLeft: SIZES.spacing,
    height: SIZES.width * 0.25,
    flex: 1,
  },
  btnBack: {
    paddingLeft: SIZES.spacing,
    paddingRight: SIZES.spacing,
    height: '100%',
  },
  rowWrapper: {flexDirection: 'row', gap: 3},
  imageFood: {
    width: SIZES.width * 0.25,
    height: SIZES.width * 0.25,
    borderRadius: SIZES.radius,
  },

  horizontalCard: {
    backgroundColor: COLORS.white,
    height: 150,
    width: SIZES.width,
    alignItems: 'center',
    flexDirection: 'row',
    padding: SIZES.padding,
    flex: 1,
  },

  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding + SIZES.spacing,
    paddingBottom: SIZES.base,
  },
  textRed: {
    color: COLORS.red,
    ...FONTS.title_small,
  },
  textBlackBold: {
    color: COLORS.blackText,
    ...FONTS.title_small,
  },
  textGrayBold: {
    color: COLORS.gray,
    ...FONTS.title_small,
  },
  icon: {width: 26, height: 26, tintColor: COLORS.black},
  headerWrapperContainer: {
    backgroundColor: COLORS.white,
    height: 55,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});
