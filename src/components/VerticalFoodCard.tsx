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
import React from 'react';
import {COLORS, FONTS, SIZES} from '../config';

interface VerticalFoodCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  item: {
    id: string;
    name: string;
    description: string;
    categories: number[];
    price: number;
    calories: number;
    image: string;
  };
  imageStyle?: ImageStyle;
  onPress?: (event: GestureResponderEvent) => any;
}
const VerticalFoodCard: React.FC<VerticalFoodCardProps> = ({
  containerStyle,
  item,
  imageStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      {/* image */}
      <Image style={imageStyle} source={{uri: item.image}} />
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
        <Text style={[styles.price, FONTS.label_large]}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default VerticalFoodCard;

const styles = StyleSheet.create({
  price: {
    color: COLORS.blackText,
    marginTop: SIZES.base,
    ...FONTS.title_large,
    fontWeight: 'bold',
  },
  name: {
    color: COLORS.blackText,
    ...FONTS.title_large,
    fontWeight: 'bold',
  },
  textCalories: {
    flex: 1,
    ...FONTS.label_large,
    color: COLORS.darkGray2,
  },
  iconCalories: {width: 24, height: 24},
  container: {
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
    alignItems: 'center',
  },

  info: {
    alignItems: 'center',
  },
  calories: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
