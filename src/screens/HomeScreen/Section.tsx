import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {ReactNode, memo} from 'react';
import {Image} from 'react-native';
import {SIZES, FONTS, COLORS, icons} from '../../theme';
import {GestureResponderEvent} from 'react-native';
import {ViewStyle} from 'react-native';

interface SectionProps {
  title: string;
  subtitle: string;
  onPress: (event: GestureResponderEvent) => void;
  children: ReactNode;
  style?: ViewStyle;
}
const Section: React.FC<SectionProps> = memo(
  ({title, subtitle, onPress, children, style}) => {
    return (
      <Pressable onPress={onPress}>
        <View style={[styles.section, style]}>
          <View style={{flex: 1}}>
            <Text style={styles.sectionHeadline}>{title}</Text>
            <Text style={styles.sectionSubtitle}>{subtitle}</Text>
          </View>
          <Image
            source={icons.chevron_right}
            style={[styles.icon, {marginLeft: SIZES.spacing}]}
          />
        </View>
        {children}
      </Pressable>
    );
  },
);

export default Section;

const styles = StyleSheet.create({
  section: {
    flex: 1,
    flexDirection: 'row',
    marginHorizontal: SIZES.padding,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sectionHeadline: {
    ...FONTS.title_large,
    fontWeight: 'bold',
    color: COLORS.blackText,
  },

  icon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },

  sectionSubtitle: {
    ...FONTS.body_medium,
    color: COLORS.gray,
  },
});
