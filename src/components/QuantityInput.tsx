import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  GestureResponderEvent,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import ButtonIcon from './button/ButtonIcon';
import {COLORS} from '../config';

interface QuantityInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
  onAddPress?: (event: GestureResponderEvent) => void;
  onRemovePress?: (event: GestureResponderEvent) => void;
  quantity: number;
  iconStyle?: ImageStyle;
  labelStyle?: StyleProp<TextStyle>;
  iconLeft: ImageSourcePropType;
  iconRight: ImageSourcePropType;
  maximumQuantity?: number;
  minimumQuantity?: number;
}
const QuantityInput: React.FC<QuantityInputProps> = ({
  containerStyle,
  iconContainerStyle,
  onAddPress,
  onRemovePress,
  quantity = 1,
  maximumQuantity,
  minimumQuantity = 0,
  iconStyle,
  labelStyle,
  iconLeft,
  iconRight,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ButtonIcon
        disabled={quantity === minimumQuantity ? true : false}
        icon={iconLeft}
        iconStyle={[
          iconStyle,
          {
            tintColor:
              quantity === minimumQuantity ? COLORS.lightGray1 : COLORS.primary,
          },
        ]}
        containerStyle={[
          iconContainerStyle,
          {
            backgroundColor:
              quantity === minimumQuantity
                ? COLORS.lightPrimary
                : COLORS.lightPrimary,
          },
        ]}
        onPress={onRemovePress}
      />
      <Text style={labelStyle}>{`${quantity}`}</Text>
      <ButtonIcon
        disabled={maximumQuantity && quantity >= maximumQuantity ? true : false}
        icon={iconRight}
        iconStyle={[
          iconStyle,
          {
            tintColor:
              maximumQuantity && quantity >= maximumQuantity
                ? COLORS.lightGray1
                : COLORS.primary,
          },
        ]}
        containerStyle={[
          iconContainerStyle,
          {
            backgroundColor:
              maximumQuantity && quantity >= maximumQuantity
                ? COLORS.lightPrimary_05
                : COLORS.lightPrimary,
          },
        ]}
        onPress={onAddPress}
      />
    </View>
  );
};

export default QuantityInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
