import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import React, {memo} from 'react';
import {COLORS, FONTS, SIZES, icons} from '../config';
import FastImage, {ImageStyle} from 'react-native-fast-image';

interface VerticalFoodCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  item: {
    id: string;
    name: string;
    description: string;
    categories: number[];
    price: string;
    calories: number;
    image: string;
  };
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: (event: GestureResponderEvent) => any;
}
const VerticalFoodCard: React.FC<VerticalFoodCardProps> = ({
  containerStyle,
  item,
  imageStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[containerStyle]}>
      {/* image */}

      <FastImage
        style={[imageStyle, {borderRadius: SIZES.radius}]}
        source={{uri: item.image}}
      />
      {/* info */}
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text
          style={{
            color: COLORS.darkGray2,
            ...FONTS.body_medium,
          }}>
          {item.description}
        </Text>
        <View style={styles.rowWrapper}>
          <Text style={[styles.price]}>{item.price}đ</Text>
          <View style={styles.starWrapper}>
            <Image
              source={icons.star}
              resizeMode="contain"
              style={styles.iconStar}
            />
            <Text style={[styles.price]}>4.5</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(VerticalFoodCard);

const styles = StyleSheet.create({
  rowWrapper: {flexDirection: 'row', alignItems: 'center', columnGap: 10},
  starWrapper: {flexDirection: 'row', alignItems: 'center', columnGap: 2},
  iconStar: {width: 18, height: 18, marginBottom: -5},
  price: {
    color: COLORS.blackText,
    marginTop: SIZES.base,
    ...FONTS.title_small,
  },
  name: {
    color: COLORS.blackText,
    ...FONTS.title_medium,
  },
  textCalories: {
    flex: 1,
    ...FONTS.label_large,
    color: COLORS.darkGray2,
  },
  iconCalories: {width: 24, height: 24},

  info: {
    marginVertical: SIZES.radius,
  },
  calories: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
