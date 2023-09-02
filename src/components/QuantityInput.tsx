import {
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import ButtonIcon from './button/ButtonIcon';
import {icons} from '../config';

interface QuantityInputProps {
  containerStyle?: StyleProp<ViewStyle>;
  iconContainerStyle?: StyleProp<ViewStyle>;
  onAddPress?: (event: GestureResponderEvent) => void;
  onRemovePress?: (event: GestureResponderEvent) => void;
  quantity: number;
  iconStyle?: ImageStyle;
  labelStyle?: TextStyle;
}
const QuantityInput: React.FC<QuantityInputProps> = ({
  containerStyle,
  iconContainerStyle,
  onAddPress,
  onRemovePress,
  quantity = 1,
  iconStyle,
  labelStyle,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <ButtonIcon
        icon={icons.remove}
        iconStyle={iconStyle}
        containerStyle={iconContainerStyle}
        onPress={onRemovePress}
      />
      <Text style={labelStyle}>{`${quantity}`}</Text>
      <ButtonIcon
        icon={icons.add}
        iconStyle={iconStyle}
        containerStyle={iconContainerStyle}
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
