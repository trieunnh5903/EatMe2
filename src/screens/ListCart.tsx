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
import FastImage from 'react-native-fast-image';
import {store, useAppSelector} from '../redux/store';
import {
  getTotalFoodCount,
  useSelectAllCart,
  useSelectTotalPriceSelector,
} from '../redux/hooks';
import {useNavigation} from '@react-navigation/native';
import {ListCartScreenProp} from '../types/navigation.type';
import convertToVND from '../utils/convertToVND';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const ListCart = () => {
  console.log('ListCart');
  const [isDelete, setIsDelete] = useState(false);
  const navigation = useNavigation<ListCartScreenProp['navigation']>();
  const listCart = useAppSelector(useSelectAllCart);
  const [checkedId, setCheckedId] = useState<string[]>([]);
  const checkedIdLenghth = checkedId.length;
  const canDelete = checkedIdLenghth > 0;
  const numberOfSelected = canDelete ? '(' + checkedIdLenghth + ')' : '';
  const isAllSelected = checkedIdLenghth === listCart.length;

  const onRestaurantPress = (restaurantId: string) => {
    if (isDelete) {
      if (!checkedId.includes(restaurantId)) {
        setCheckedId([...checkedId, restaurantId]);
      } else {
        setCheckedId(checkedId.filter(item => item !== restaurantId));
      }
    }
  };

  const onSelectAllPress = () => {
    if (isAllSelected) {
      setCheckedId([]);
    } else {
      const allId = listCart?.map(item => item.id);
      setCheckedId(allId);
    }
  };

  const onBackPress = () => navigation.goBack();
  const onDeletePress = () => setIsDelete(!isDelete);

  return (
    <View style={styles.container}>
      <HeaderCustom
        containerStyle={styles.headerWrapperContainer}
        title="Danh sách giỏ hàng"
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

      <FlatList
        ItemSeparatorComponent={() => <Break height={2} />}
        ListHeaderComponent={
          <View style={styles.headerWrapper}>
            <Text style={styles.textBlackBold}>Đơn lẻ</Text>
            <TouchableOpacity onPress={onDeletePress}>
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
        data={listCart}
        renderItem={props => {
          const isChecked = checkedId.some(i => i === props.item.id);
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
            disabled={!canDelete}
            labelStyle={{color: COLORS.white}}
            containerStyle={styles.btnCheckout}
            label={`Xóa ${numberOfSelected}`}
          />
        </View>
      )}
    </View>
  );
};

const FoodItem: React.FC<ListRenderItemInfo<RestaurantInformation>> = ({
  item,
}) => {
  const totalFood = getTotalFoodCount(store.getState(), item.id);
  const totalPrice = useSelectTotalPriceSelector(store.getState(), item.id);
  return (
    <View style={[styles.horizontalCard]}>
      <FastImage
        style={[styles.imageFood]}
        source={{uri: item.image}}
        resizeMode={FastImage.resizeMode.cover}
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

export default ListCart;

const styles = StyleSheet.create({
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
