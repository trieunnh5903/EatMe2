import {
  StyleSheet,
  GestureResponderEvent,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES, icons} from '../config';

interface SearchInputProps {
  placeholder?: string;
  keyword?: string;
  onChangeText?: (text: string) => void;
  onDeletePress?: (event: GestureResponderEvent) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder,
  keyword,
  onChangeText,
  onDeletePress,
  containerStyle,
}) => {
  return (
    <View style={[styles.searchContainer, containerStyle]}>
      {/* icon */}
      <Image source={icons.search} style={styles.icon} />
      {/* text input */}
      <TextInput
        value={keyword}
        placeholderTextColor={COLORS.gray}
        onChangeText={onChangeText}
        cursorColor={COLORS.black}
        placeholder={placeholder}
        style={styles.searchInput}
      />
      {/* filter */}
      {keyword && (
        <TouchableOpacity onPress={onDeletePress}>
          <Image source={icons.close} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchInput;

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    height: 46,
    backgroundColor: COLORS.lightGray2,
    paddingHorizontal: 12,
    borderRadius: SIZES.padding,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: COLORS.gray,
  },
  searchInput: {
    ...FONTS.body_medium,
    marginHorizontal: SIZES.spacing,
    flex: 1,
    color: COLORS.blackText,
  },
});
