import {
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import React from 'react';
import Animated, {StyleProps} from 'react-native-reanimated';
import {HeaderCustom} from '../../components';
import {icons, COLORS, SIZES} from '../../theme';
import {Feather} from '../../utils';

interface BaseHeaderProps {
  animatedStyle: StyleProps;
  onBackPress: ((event: GestureResponderEvent) => void) | undefined;
}
const BaseHeader: React.FC<BaseHeaderProps> = ({
  animatedStyle,
  onBackPress,
}) => {
  return (
    <Animated.View
      style={[
        {position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1},
        animatedStyle,
      ]}>
      <HeaderCustom
        containerStyle={{paddingHorizontal: SIZES.padding}}
        leftComponent={
          <TouchableOpacity
            style={styles.buttonNavWrapper}
            onPress={onBackPress}>
            <Image
              source={icons.arrow_back}
              style={[styles.icon, {tintColor: COLORS.white}]}
            />
          </TouchableOpacity>
        }
        rightComponent={
          <View style={{flexDirection: 'row', gap: 10}}>
            <TouchableOpacity
              style={[styles.buttonNavWrapper, {alignItems: 'center'}]}>
              <Feather name="search" size={20} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonNavWrapper, {alignItems: 'center'}]}>
              <Image
                source={icons.favourite}
                style={[styles.icon, {tintColor: COLORS.white}]}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.buttonNavWrapper, {alignItems: 'center'}]}>
              <Feather name="share-2" size={20} color={COLORS.white} />
            </TouchableOpacity>
          </View>
        }
      />
    </Animated.View>
  );
};

export default BaseHeader;

const styles = StyleSheet.create({
  buttonNavWrapper: {
    borderRadius: 100,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SIZES.radius,
    backgroundColor: COLORS.black2(6),
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: COLORS.black,
  },
});
