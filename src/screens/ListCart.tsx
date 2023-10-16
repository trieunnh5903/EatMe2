import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Break, ButtonIcon, Dot, HeaderCustom} from '../components';
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

const ListCart = () => {
  // const {onBackPress, listInvoices} = useListCartController();
  const navigation = useNavigation<ListCartScreenProp['navigation']>();
  const listCart = useAppSelector(useSelectAllCart);
  const onBackPress = () => navigation.goBack();
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
            <TouchableOpacity>
              <Text style={styles.textRed}>Xóa</Text>
            </TouchableOpacity>
          </View>
        }
        data={listCart}
        renderItem={props => <FoodItem {...props} />}
      />
    </View>
  );
};

const FoodItem: React.FC<ListRenderItemInfo<RestaurantInformation>> = ({
  item,
}) => {
  const totalFood = getTotalFoodCount(store.getState(), item.id);
  const totalPrice = useSelectTotalPriceSelector(store.getState(), item.id);
  return (
    <TouchableOpacity style={[styles.horizontalCard]}>
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
    </TouchableOpacity>
  );
};

export default ListCart;

const styles = StyleSheet.create({
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
  },

  headerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.padding,
    paddingTop: SIZES.padding,
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
  icon: {width: 26, height: 26, tintColor: COLORS.black},
  headerWrapperContainer: {
    backgroundColor: COLORS.white,
    height: 55,
    // paddingHorizontal: SIZES.radius,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});
