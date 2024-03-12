import {StyleSheet, ViewStyle, View} from 'react-native';
import React from 'react';
import Skeleton from './Skeleton';
import {SIZES} from '../../theme';

const VerticalCardSkeleton = ({style}: {style: ViewStyle}) => {
  return (
    <View
      style={[{width: SIZES.width * 0.4, marginLeft: SIZES.padding}, style]}>
      <Skeleton width={SIZES.width * 0.4} style={styles.image} />
      <Skeleton width={SIZES.width * 0.4} style={styles.line1} />
      <Skeleton width={SIZES.width * 0.4} style={styles.line2} />
      <Skeleton width={SIZES.width * 0.4} style={styles.line3} />
    </View>
  );
};

export default VerticalCardSkeleton;

const styles = StyleSheet.create({
  image: {
    height: 150,
    borderRadius: SIZES.radius,
  },
  line1: {
    width: '100%',
    borderRadius: SIZES.radius,
    marginTop: SIZES.spacing,
    height: 10,
  },
  line2: {
    width: '80%',
    borderRadius: SIZES.radius,
    marginTop: SIZES.base,
    height: 10,
  },
  line3: {
    width: '60%',
    borderRadius: SIZES.radius,
    marginTop: SIZES.base,
    height: 10,
  },
});
