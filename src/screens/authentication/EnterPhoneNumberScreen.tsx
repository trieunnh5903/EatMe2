import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';

export default function EnterPhoneNumberScreen() {
  return (
    <View style={styles.container}>
      <View style={{position: 'absolute', width: '100%'}}>
        <View style={{backgroundColor: 'red', height: 200}} />
        <Svg
          style={styles.svg}
          height="50%"
          width="100%"
          viewBox="0 0 1440 320">
          <Path
            fill="#5000ca"
            d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  svg: {
    position: 'absolute',
    top: 180,
  },
});
