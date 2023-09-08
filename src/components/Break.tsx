import {StyleSheet, Text, View, ViewProps, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../config';

const Break = (style: ViewStyle) => {
  return <View style={[styles.line, style]}></View>;
};

export default Break;

const styles = StyleSheet.create({
  line: {
    width: SIZES.width,
    height: 10,
    backgroundColor: '#F5F5F5',
  },
});
