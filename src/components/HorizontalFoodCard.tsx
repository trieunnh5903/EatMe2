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
import {COLORS, FONTS, SIZES} from '../config';
import FastImage, {ImageStyle} from 'react-native-fast-image';

interface HorizontalFoodCardProps {
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
  imageStyle?: StyleProp<ImageStyle>;
  onPress?: (event: GestureResponderEvent) => void;
}
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
      <FastImage style={imageStyle} source={{uri: item.image}} />
      <View style={{flex: 1, marginTop: SIZES.radius}}>
        <Text
          numberOfLines={1}
          style={[
            FONTS.title_large,
            {color: COLORS.blackText, fontWeight: 'bold'},
          ]}>
          {item.name}
        </Text>
        <Text
          numberOfLines={1}
          style={[FONTS.body_medium, {color: COLORS.darkGray2}]}>
          {item.description}
        </Text>
        <Text
          numberOfLines={1}
          style={[
            FONTS.title_large,
            {color: COLORS.blackText, fontWeight: 'bold'},
          ]}>
          ${item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default memo(HorizontalFoodCard);

const styles = StyleSheet.create({
  icon: {
    flexDirection: 'row',
    position: 'absolute',
    top: SIZES.radius,
    right: SIZES.radius,
  },

  container: {
    flexDirection: 'row',
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
    alignItems: 'center',
    // padding: SIZES.radius,
  },
});
