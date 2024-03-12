import React, {useEffect} from 'react';
import {View, ViewStyle} from 'react-native';
import Animated, {
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../theme';

const Skeleton = ({style, width}: {style: ViewStyle; width: number}) => {
  const translateX = useSharedValue<number>(-width);
  useEffect(() => {
    translateX.value = withRepeat(withTiming(width, {duration: 2000}), -1);
  }, [translateX, width]);

  // const animatedStyles = useAnimatedStyle(() => {
  //   return {
  //     transform: [{translateX: translateX.value}],
  //   } as AnimatedStyleProp<ViewStyle>;
  // });
  return (
    <View
      style={[
        {backgroundColor: 'rgba(0,0,0,0.12)', overflow: 'hidden'},
        style,
      ]}>
      <Animated.View style={[{height: '100%', width: '100%'}]}>
        <LinearGradient
          style={{width: '100%', height: '100%'}}
          colors={[COLORS.transparent, 'rgba(0,0,0,0.05)', COLORS.transparent]}
          start={{x: 1, y: 1}}
        />
      </Animated.View>
    </View>
  );
};

export default Skeleton;
