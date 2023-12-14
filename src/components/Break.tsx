import {StyleSheet, View, ViewStyle} from 'react-native';
import React, {memo} from 'react';
import {COLORS, SIZES} from '../config';

const Break = (style: ViewStyle) => {
  return <View style={[styles.line, style]} />;
};

export default memo(Break);

const styles = StyleSheet.create({
  line: {
    width: SIZES.width,
    height: 10,
    backgroundColor: COLORS.secondaryBackground,
  },
});
