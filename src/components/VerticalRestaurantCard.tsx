import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  ImageStyle,
  GestureResponderEvent,
} from 'react-native';
import React, {memo} from 'react';
import {COLORS, FONTS, SIZES, icons} from '../config';
import {Restaurant} from '../types/types';
import Dot from './Dot';

interface VerticalRestaurantCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  item: Restaurant;
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: (event: GestureResponderEvent) => any;
}
const VerticalRestaurantCard: React.FC<VerticalRestaurantCardProps> = ({
  containerStyle,
  item,
  imageStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[containerStyle]}>
      {/* image */}
      <Image
        resizeMode="cover"
        style={[imageStyle, {borderRadius: SIZES.radius}]}
        source={{uri: item.image}}
      />
      {/* info */}
      <View>
        <Text numberOfLines={2} style={styles.name}>
          <Image
            source={icons.verified}
            style={{width: 20, height: 20}}
            resizeMode="contain"
          />{' '}
          {item.name}
        </Text>

        <View style={styles.rowWrapper}>
          <Image
            source={icons.star}
            resizeMode="contain"
            style={styles.iconStar}
          />
          <Text style={[styles.price, {color: COLORS.blackText}]}>4.5</Text>
          <Text style={[styles.price, {color: COLORS.gray}]}>(100+)</Text>
          <Dot />
          <Text style={[styles.price, {color: COLORS.blackText}]}>0.3km </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(VerticalRestaurantCard);

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    columnGap: 3,
    marginTop: SIZES.base,
  },
  iconStar: {width: 18, height: 18},
  price: {
    color: COLORS.gray,
    ...FONTS.body_small,
  },
  name: {
    color: COLORS.blackText,
    ...FONTS.body_large,
  },
});
