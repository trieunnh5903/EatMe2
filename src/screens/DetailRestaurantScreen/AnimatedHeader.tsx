import {
  ColorValue,
  FlatList,
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {memo} from 'react';
import Animated, {StyleProps} from 'react-native-reanimated';
import {Shadow} from 'react-native-shadow-2';
import {icons, COLORS, SIZES, FONTS} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {DetailRestaurantNavigationProps} from '../../types/navigation.type';
import {MenuFood, Restaurant} from '../../types/types';

interface ButtonMenuProp {
  buttonRef: React.LegacyRef<TouchableOpacity> | undefined;
  textRef: React.LegacyRef<Text>;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  backgroundColor: ColorValue | undefined;
  color?: ColorValue | undefined;
  label: string;
}

interface AnimatedHeaderProps {
  flatlistButtonGroupRef?: React.LegacyRef<FlatList<any>> | undefined;
  animatedStyle: StyleProps;
  restaurant: Restaurant;
  menuFoods: MenuFood[];
  buttonMenuRefs: React.RefObject<TouchableOpacity>[];
  textMenuRefs: React.RefObject<Text>[];
  onMenuListPress: (index: number) => void;
}

export const HEADER_HEIGHT = SIZES.height * 0.15;
const AnimatedHeader: React.FC<AnimatedHeaderProps> = ({
  animatedStyle,
  flatlistButtonGroupRef,
  restaurant,
  menuFoods,
  buttonMenuRefs,
  textMenuRefs,
  onMenuListPress,
}) => {
  const navigation =
    useNavigation<DetailRestaurantNavigationProps['navigation']>();
  return (
    <Animated.View style={[styles.headerWrapper, animatedStyle]}>
      <Shadow distance={5}>
        {/* tim kiem */}
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.buttonBackWrapper}
            onPress={() => navigation.goBack()}>
            <Image source={icons.arrow_back} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchContainer}>
            <Image source={icons.search} style={styles.iconSearch} />
            <TextInput
              style={{width: '85%', color: COLORS.blackText}}
              placeholderTextColor={COLORS.gray}
              cursorColor={COLORS.gray}
              numberOfLines={1}
              placeholder={`Tìm món tại ${restaurant.name}`}
            />
          </TouchableOpacity>
          {/* btn yeu thich */}
          <TouchableOpacity
            style={[styles.buttonFavoriteWrapper, {alignItems: 'center'}]}>
            <Image
              source={icons.favourite}
              style={[styles.icon, {tintColor: COLORS.black}]}
            />
          </TouchableOpacity>
        </View>
        {/*button group */}
        <FlatList
          style={{height: '50%'}}
          ref={flatlistButtonGroupRef}
          horizontal
          contentContainerStyle={styles.menuListContentContainer}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.label}
          data={menuFoods}
          renderItem={({item, index}) => {
            const backgroundColor = index === 0 ? COLORS.primary : COLORS.white;
            const color = index === 0 ? COLORS.white : COLORS.black;
            return (
              <ButtonMenu
                backgroundColor={backgroundColor}
                buttonRef={buttonMenuRefs[index]}
                label={item.label}
                onPress={() => {
                  onMenuListPress(index);
                }}
                textRef={textMenuRefs[index]}
                color={color}
              />
            );
          }}
        />
      </Shadow>
    </Animated.View>
  );
};

const ButtonMenu: React.FC<ButtonMenuProp> = memo(
  ({backgroundColor, buttonRef, label, textRef, onPress, color}) => {
    return (
      <TouchableOpacity
        ref={buttonRef}
        onPress={onPress}
        style={[styles.menuItem, {backgroundColor}]}>
        <Text ref={textRef} style={[{color}, FONTS.label_large]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  },
);

export default AnimatedHeader;

const styles = StyleSheet.create({
  headerWrapper: {
    backgroundColor: COLORS.white,
    height: HEADER_HEIGHT,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },

  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    height: 46,
    backgroundColor: COLORS.lightGray2,
    paddingHorizontal: 12,
    borderRadius: SIZES.padding,
    alignItems: 'center',
  },
  menuItem: {
    borderRadius: 20,
    padding: 8,
  },
  buttonFavoriteWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  buttonBackWrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    tintColor: COLORS.black,
  },

  iconSearch: {
    width: 24,
    height: 24,
    marginRight: SIZES.spacing,
    resizeMode: 'contain',
    tintColor: COLORS.gray2,
  },
  menuListContentContainer: {
    paddingLeft: SIZES.spacing,
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.white,
  },

  headerContainer: {
    height: '50%',
    width: SIZES.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});
