import {StyleSheet, TouchableOpacity, Image, Text, View} from 'react-native';
import React from 'react';
import convertToVND from '../../utils/convertToVND';
import {COLORS, FONTS, SIZES, icons} from '../../config';
import {Food} from '../../types/types';

const ListHeaderComponent = ({foodItem}: {foodItem: Food}) => {
  return (
    <View style={{backgroundColor: COLORS.white, padding: SIZES.padding}}>
      <View style={styles.nameWrapper}>
        <Text style={styles.name}>{foodItem.name}</Text>
        <Text style={styles.mainPrice}>{convertToVND(foodItem.price)}</Text>
      </View>

      <Text style={[styles.description]}>{foodItem.description}</Text>

      <TouchableOpacity style={{flexDirection: 'row'}}>
        <Image
          source={icons.note}
          style={styles.iconNote}
          resizeMode="contain"
        />
        <Text style={styles.note}>Bạn có muốn nhắn gì đến cửa hàng không</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ListHeaderComponent;

const styles = StyleSheet.create({
  note: {
    color: COLORS.gray,
    ...FONTS.body_large,
    marginLeft: SIZES.base,
    marginRight: SIZES.padding,
  },

  iconNote: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },
  description: {
    color: COLORS.gray,
    ...FONTS.body_medium,
    marginBottom: SIZES.padding,
  },
  nameWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    width: '70%',
    color: COLORS.blackText,
    ...FONTS.headline_medium,
    fontWeight: 'bold',
  },

  mainPrice: {
    textAlign: 'center',
    width: '30%',
    color: COLORS.blackText,
    ...FONTS.title_large,
  },
});
