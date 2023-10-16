import {
  StyleSheet,
  Text,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
  GestureResponderEvent,
  TouchableOpacity,
  TextStyle,
} from 'react-native';
import React from 'react';
import {SIZES, FONTS} from '../../config';

interface ButtonTextIconProp {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  icon: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  labelStyle?: StyleProp<TextStyle>;
}
const ButtonTextIcon: React.FC<ButtonTextIconProp> = ({
  icon,
  containerStyle,
  disabled = false,
  iconStyle,
  onPress,
  label,
  labelStyle,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.wrapper, containerStyle]}>
      <Image source={icon} style={[iconStyle]} />
      <Text
        style={[
          {
            marginLeft: SIZES.spacing,
            ...FONTS.title_medium,
          },
          labelStyle,
        ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default React.memo(ButtonTextIcon);

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.spacing,
  },
});
