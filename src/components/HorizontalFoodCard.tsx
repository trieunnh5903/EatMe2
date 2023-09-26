import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  GestureResponderEvent,
  StyleProp,
} from 'react-native';
import React, {memo} from 'react';
import {COLORS, FONTS, SIZES, icons} from '../config';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import {Image} from 'react-native';
import convertToVND from '../utils/convertToVND';
import {FoodObject} from '../types/types';

interface HorizontalFoodCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  item: FoodObject;
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

const VericalLine = () => <View style={styles.line} />;
const HorizontalFoodCard: React.FC<HorizontalFoodCardProps> = ({
  containerStyle,
  item,
  imageStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      <FastImage
        style={[imageStyle, styles.image]}
        source={{uri: item.image}}
      />
      {/* tên */}
      <View style={{flex: 1, marginLeft: SIZES.spacing}}>
        <Text style={[FONTS.title_medium, {color: COLORS.blackText}]}>
          {item.name}
        </Text>
        {/* mô tả */}
        <Text
          numberOfLines={1}
          style={[FONTS.body_medium, {color: COLORS.darkGray2}]}>
          {item.description}
        </Text>

        <View style={{width: '100%', flex: 1}} />
        {/* giá */}
        <View style={styles.rowWrapper}>
          <Text style={[styles.price, {color: COLORS.blackText}]}>
            {convertToVND(item.price)}
          </Text>
          <VericalLine />
          {/* sao */}
          <View style={styles.starWrapper}>
            <Image
              source={icons.star}
              resizeMode="contain"
              style={styles.iconStar}
            />
            <Text style={[styles.price, {color: COLORS.gray}]}>4.5</Text>
          </View>
          <VericalLine />
          {/* km */}
          <Text style={[styles.price, {color: COLORS.gray}]}>0.3km </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(HorizontalFoodCard);

const styles = StyleSheet.create({
  price: {
    ...FONTS.title_small,
  },
  rowWrapper: {flexDirection: 'row', alignItems: 'center'},
  starWrapper: {flexDirection: 'row', alignItems: 'center', columnGap: 2},
  iconStar: {width: 18, height: 18},
  container: {
    flexDirection: 'row',
    borderRadius: SIZES.radius,
    padding: SIZES.padding,
  },

  image: {
    width: SIZES.width * 0.3,
    height: SIZES.width * 0.3,
    borderRadius: SIZES.radius,
  },

  line: {
    height: 20,
    width: 1,
    backgroundColor: COLORS.gray,
    marginHorizontal: SIZES.spacing,
  },
});
