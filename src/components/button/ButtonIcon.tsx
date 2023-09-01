import {
  StyleSheet,
  TouchableOpacity,
  Image,
  StyleProp,
  ViewStyle,
  GestureResponderEvent,
  ImageSourcePropType,
  ImageStyle,
} from 'react-native';
import React from 'react';

interface ButtonIconProps {
  onPress?: (event: GestureResponderEvent) => void;
  icon: ImageSourcePropType;
  iconStyle?: StyleProp<ImageStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}
const ButtonIcon: React.FC<ButtonIconProps> = ({
  containerStyle,
  icon,
  iconStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[containerStyle, {justifyContent: 'center', alignItems: 'center'}]}
      onPress={onPress}>
      <Image source={icon} style={iconStyle} />
    </TouchableOpacity>
  );
};

export default ButtonIcon;

const styles = StyleSheet.create({});
