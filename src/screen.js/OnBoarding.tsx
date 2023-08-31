import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SIZES, images} from '../constants';

const OnBoarding: React.FC = () => {
  return (
    <SafeAreaView>
      {/* logo */}
      <View style={styles.headerLogo}>
        <Image
          style={styles.logo}
          source={images.logo_02}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  headerLogo: {
    zIndex: 1,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    width: SIZES.width * 0.5,
    height: 100,
  },
});
