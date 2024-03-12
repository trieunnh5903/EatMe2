import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  StyleProp,
  GestureResponderEvent,
} from 'react-native';
import React, {memo} from 'react';
import {COLORS, FONTS} from '../../theme';

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
  if (disabled) {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={[
          styles.container,
          containerStyle,
          {backgroundColor: COLORS.gray3},
        ]}>
        <Text style={[FONTS.title_medium, labelStyle]}>{label}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[styles.container, containerStyle]}>
      <Text style={[FONTS.title_medium, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export default memo(ButtonText);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
