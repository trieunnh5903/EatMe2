import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');
export const SIZES = {
  // global sizes
  spacing: 10,
  font: 14,
  radius: 12,
  padding: 24,
  base: 6,

  // app dimensions
  width,
  height,
};
