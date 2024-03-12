import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React, {memo} from 'react';
import {COLORS, FONTS} from '../theme';

interface HeaderCustomProps {
  title?: string;
  containerStyle?: ViewStyle;
  leftComponent?: JSX.Element;
  rightComponent?: JSX.Element;
}
const HeaderCustom: React.FC<HeaderCustomProps> = ({
  title,
  containerStyle,
  leftComponent,
  rightComponent,
}) => {
  return (
    <View style={[styles.container, {...containerStyle}]}>
      {/* left */}
      {leftComponent}
      {/* title */}
      <Text style={styles.title}>{title}</Text>
      {/* right */}
      {rightComponent}
    </View>
  );
};

export default memo(HeaderCustom);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
  },
  title: {
    textTransform: 'capitalize',
    flex: 1,
    textAlign: 'center',
    color: COLORS.blackText,
    ...FONTS.title_medium,
    fontWeight: 'bold',
  },
});
