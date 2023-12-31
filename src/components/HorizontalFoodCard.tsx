import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ViewStyle,
  GestureResponderEvent,
  StyleProp,
  Image,
  ImageStyle,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, icons} from '../config';
import convertToVND from '../utils/convertToVND';
import {Food} from '../types/types';

interface HorizontalFoodCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  item: Food;
  imageStyle?: StyleProp<ImageStyle>;
  textWrapperStyle?: StyleProp<ViewStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}

const VericalLine = () => <View style={styles.line} />;
const HorizontalFoodCard: React.FC<HorizontalFoodCardProps> = ({
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
      <Image
        style={[styles.image, imageStyle]}
        source={{uri: item.image}}
        resizeMode={'cover'}
      />
      {/* tên */}
      <View style={[{flex: 1, marginLeft: SIZES.spacing}, textWrapperStyle]}>
        <Text
          numberOfLines={1}
          style={[FONTS.title_medium, {color: COLORS.blackText}]}>
          {item.name}
        </Text>

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

export default HorizontalFoodCard;

const styles = StyleSheet.create({
  price: {
    ...FONTS.title_small,
  },
  rowWrapper: {flexDirection: 'row', alignItems: 'center'},
  starWrapper: {flexDirection: 'row', alignItems: 'center', columnGap: 2},
  iconStar: {width: 18, height: 18},
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
