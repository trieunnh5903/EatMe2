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
import {COLORS, FONTS, SIZES} from '../theme';
import convertToVND from '../utils/convertToVND';
import {Food, FoodRedux} from '../types/types';

interface VerticalFoodCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  item: Food;
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: (event: GestureResponderEvent) => any;
  foodChecked?: FoodRedux[] | undefined;
}
const VerticalFoodCard: React.FC<VerticalFoodCardProps> = ({
  containerStyle,
  item,
  imageStyle,
  foodChecked,
  onPress,
}) => {
  const bought = foodChecked && foodChecked.length > 0;
  const fontWeight = bought ? 'bold' : 'normal';
  const boughtQuantity = foodChecked?.reduce((pre, curr) => {
    if (curr.baseId === item.id) {
      return (pre = pre + curr.quantity);
    }
    return 0;
  }, 0);
  return (
    <TouchableOpacity onPress={onPress} style={[containerStyle]}>
      {/* image */}
      <Image
        resizeMode="cover"
        style={[imageStyle, {borderRadius: SIZES.radius}]}
        source={{uri: item.image}}
      />
      {/* info */}
      <View style={styles.info}>
        <Text style={[styles.name, {fontWeight}]}>
          {bought && boughtQuantity && boughtQuantity > 0 && (
            <Text style={{color: COLORS.primary}}>{boughtQuantity}x </Text>
          )}
          {item.name}
        </Text>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text style={[styles.price, {color: COLORS.blackText}]}>
            {convertToVND(item.price)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default memo(VerticalFoodCard);

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  starWrapper: {flexDirection: 'row', alignItems: 'center', columnGap: 2},
  iconStar: {width: 18, height: 18, marginBottom: -5},
  price: {
    color: COLORS.gray,
    marginTop: SIZES.base,
    ...FONTS.body_medium,
  },
  name: {
    color: COLORS.blackText,
    ...FONTS.body_large,
  },

  info: {
    marginVertical: SIZES.radius,
    flex: 1,
  },
});
