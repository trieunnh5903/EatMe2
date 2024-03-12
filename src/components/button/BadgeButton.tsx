import React, {memo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
  ImageSourcePropType,
  ImageStyle,
  GestureResponderEvent,
  Pressable,
} from 'react-native';
import {COLORS} from '../../theme';

interface BadgeButtonProps {
  containerStyle?: StyleProp<ViewStyle>;
  icon: ImageSourcePropType;
  iconStyle?: ImageStyle;
  onPress?: (event: GestureResponderEvent) => void;
  badgeText?: string;
  badgeContainerStyle?: ViewStyle;
}
const BadgeButton: React.FC<BadgeButtonProps> = ({
  containerStyle,
  icon,
  iconStyle,
  onPress,
  badgeText,
  badgeContainerStyle,
}) => {
  return (
    <Pressable style={[containerStyle]} onPress={onPress}>
      <Image source={icon} style={iconStyle} />
      <View style={[badgeContainerStyle, styles.badge]}>
        <Text style={styles.badgeText}>{badgeText}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    borderRadius: 1000,
    top: 0,
    right: 0,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: COLORS.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default memo(BadgeButton);
