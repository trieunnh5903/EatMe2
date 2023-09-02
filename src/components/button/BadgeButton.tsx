import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
  GestureResponderEvent,
} from 'react-native';

interface BadgeButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  icon: ImageSourcePropType;
  iconStyle?: ImageStyle;
  onPress?: (event: GestureResponderEvent) => void;
  badgeText?: string;
  badgeStyle?: ViewStyle;
}
const BadgeButton: React.FC<BadgeButtonProps> = ({
  containerStyle,
  icon,
  iconStyle,
  onPress,
  badgeText,
  badgeStyle,
}) => {
  return (
    <TouchableOpacity style={[containerStyle]} onPress={onPress}>
      <Image source={icon} style={iconStyle} />
      <View style={[badgeStyle]}>
        <Text style={styles.badgeText}>{badgeText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
});

export default BadgeButton;
