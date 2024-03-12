import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
const SIZES = {
  // global sizes
  spacing: 10,
  font: 14,
  radius: 10,
  padding: 18,
  base: 6,

  // app dimensions
  width,
  height,
};

export default SIZES;
