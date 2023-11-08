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
import {Image} from 'react-native';
import {Restaurant} from '../types/types';
import FastImage, {ImageStyle} from 'react-native-fast-image';
import Dot from './Dot';

interface HorizontalRestaurantCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  item: Restaurant;
  imageStyle?: StyleProp<ImageStyle>;
  textWrapperStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

const HorizontalRestaurantCard: React.FC<HorizontalRestaurantCardProps> = ({
  containerStyle,
  item,
  imageStyle,
  onPress,
  textWrapperStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      <FastImage
        style={[styles.image, imageStyle]}
        source={{uri: item.image}}
        resizeMode={FastImage.resizeMode.cover}
      />
      {/* tên */}
      <View style={[{flex: 1, marginLeft: SIZES.spacing}, textWrapperStyle]}>
        <Text
          numberOfLines={2}
          style={[FONTS.body_large, {color: COLORS.blackText}]}>
          <Image
            source={icons.verified}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />
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
            {/* sao */}
            <Image
              source={icons.star}
              resizeMode="contain"
              style={styles.iconStar}
            />
            <Text style={[styles.price]}>4.5</Text>
            <Text style={[styles.price, {color: COLORS.gray}]}>(999+)</Text>
            <Dot />
            <Text style={[styles.price]}>0.3km</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(HorizontalRestaurantCard);

const styles = StyleSheet.create({
  price: {
    color: COLORS.blackText,
  },
  rowWrapper: {flexDirection: 'row', gap: 3},
  starWrapper: {flexDirection: 'row', columnGap: 2},
  iconStar: {width: 20, height: 20},
  container: {
    alignItems: 'center',
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
