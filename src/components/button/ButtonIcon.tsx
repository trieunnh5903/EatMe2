import {
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';
import React, {memo} from 'react';

interface ButtonIconProps {
  onPress?: (event: GestureResponderEvent) => void;
  icon: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}
const ButtonIcon: React.FC<ButtonIconProps> = ({
  containerStyle,
  icon,
  iconStyle,
  onPress,
  disabled = false,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={[containerStyle, {justifyContent: 'center', alignItems: 'center'}]}
      onPress={onPress}>
      <Image source={icon} style={iconStyle} />
    </TouchableOpacity>
  );
};

export default memo(ButtonIcon);
