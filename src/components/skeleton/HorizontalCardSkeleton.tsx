import {StyleSheet, View} from 'react-native';
import React from 'react';
import {SIZES} from '../../config';
import Skeleton from './Skeleton';

const HorizontalCardSkeleton = () => {
  return (
    <View style={styles.wrapper}>
      <Skeleton width={SIZES.width} style={styles.image} />
      <View style={{flex: 1}}>
        <Skeleton width={SIZES.width * 0.4} style={styles.line1} />
        <Skeleton width={SIZES.width * 0.4} style={styles.line2} />
        <View style={{flex: 1}} />
        <Skeleton width={SIZES.width * 0.4} style={styles.line3} />
      </View>
    </View>
  );
};

export default HorizontalCardSkeleton;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginHorizontal: SIZES.padding,
  },
  image: {
    width: SIZES.width * 0.3,
    height: SIZES.width * 0.3,
    borderRadius: SIZES.radius,
    marginRight: SIZES.base,
  },
  line1: {
    borderRadius: SIZES.radius,
    marginTop: SIZES.spacing,
    height: 10,
  },
  line2: {
    borderRadius: SIZES.radius,
    marginTop: SIZES.base,
    height: 10,
  },
  line3: {
    borderRadius: SIZES.radius,
    marginBottom: SIZES.spacing,
    height: 10,
    width: '50%',
  },
});
