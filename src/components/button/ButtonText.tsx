import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  StyleProp,
  TouchableOpacityProps,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import {FONTS} from '../../config';

interface ButtonTextProps {
  label: string;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  labelStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}
const ButtonText: React.FC<ButtonTextProps> = ({
  label,
  labelStyle,
  containerStyle,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      <Text style={[FONTS.title_medium, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default ButtonText;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
