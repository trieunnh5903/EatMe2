import {View} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../theme';

const Dot = () => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: SIZES.base,
      }}>
      <View
        style={{
          width: 2,
          height: 2,
          borderRadius: 100,
          backgroundColor: COLORS.black,
        }}
      />
    </View>
  );
};

export default Dot;
