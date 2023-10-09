import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Break, Dot, HeaderCustom} from '../components';
import {COLORS, FONTS, SIZES, icons} from '../config';
import {Image} from 'react-native';
import useListCartController from '../view-controllers/useListCartController';
import {Invoice} from '../types/types';
import FastImage from 'react-native-fast-image';
import convertToVND from '../utils/convertToVND';

const ListCart = () => {
  const {onBackPress, listInvoices} = useListCartController();
  return (
    <View style={styles.container}>
      <HeaderCustom
        containerStyle={styles.btnBack}
        title="Danh sách giỏ hàng"
        leftComponent={
          <TouchableOpacity onPress={onBackPress}>
            <Image source={icons.arrow_back} style={styles.icon} />
          </TouchableOpacity>
        }
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
        data={listInvoices}
        renderItem={props => <FoodItem {...props} />}
      />
    </View>
  );
};

const FoodItem: React.FC<ListRenderItemInfo<Invoice>> = ({item}) => {
  return (
    <TouchableOpacity style={[styles.horizontalCard]}>
      <FastImage
        style={[styles.imageFood]}
        source={{uri: item.image}}
        resizeMode={FastImage.resizeMode.cover}
      />
      {/* tên */}
      <View
        style={{
          marginLeft: SIZES.spacing,
          height: SIZES.width * 0.25,
          flex: 1,
        }}>
        <Text
          numberOfLines={2}
          style={[FONTS.body_large, {color: COLORS.blackText}]}>
          {item.name}
        </Text>
        {/* address */}
        <Text
          numberOfLines={1}
          style={[FONTS.body_small, {color: COLORS.darkGray2}]}>
          {item.address}
        </Text>

        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          {/* giá */}
          <View style={styles.rowWrapper}>
            <Text style={styles.textBlackBold}>
              {convertToVND(item.totalPrice)}
            </Text>
            <Dot />
            <Text style={styles.textBlackBold}>{item.numOfFood} món</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ListCart;

const styles = StyleSheet.create({
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
  btnBack: {
    backgroundColor: COLORS.white,
    height: 55,
    paddingHorizontal: SIZES.radius,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
  },
});
