import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ViewStyle,
  KeyboardTypeOptions,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES} from '../config';

interface TextInputCustomProps {
  value?: string;
  containerStyle?: ViewStyle;
  placeholder?: string;
  inputStyle?: ViewStyle;
  leftComponent?: JSX.Element;
  rightComponent?: JSX.Element;
  onChangeText?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: String;
  errorMsg?: string;
}

const TextInputCustom: React.FC<TextInputCustomProps> = ({
  value,
  containerStyle,
  placeholder,
  inputStyle,
  leftComponent,
  rightComponent,
  onChangeText,
  secureTextEntry,
  keyboardType = 'default',
  errorMsg,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <View style={containerStyle}>
      {/* text input */}
      <View
        style={[
          styles.inputWrapper,
          inputStyle,
          isFocused ? styles.focusedTextInput : styles.defaultTextInput,
        ]}>
        {leftComponent}
        <TextInput
          value={value}
          onFocus={handleFocus}
          onBlur={handleBlur}
          cursorColor={COLORS.primary}
          style={[styles.input]}
          placeholder={placeholder}
          placeholderTextColor={COLORS.gray}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={'none'}
          onChangeText={onChangeText}
        />
        {rightComponent}
      </View>
      {/*  error msg */}
      {errorMsg && errorMsg.length > 0 ? (
        <Text style={styles.errorMsg}>{errorMsg}</Text>
      ) : null}
    </View>
  );
};

export default TextInputCustom;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    color: COLORS.blackText,
    ...FONTS.title_medium,
  },
  focusedTextInput: {
    borderColor: COLORS.transparentBlack7,
  },

  defaultTextInput: {
    borderColor: COLORS.lightGray1,
  },

  inputWrapper: {
    flexDirection: 'row',
    height: 55,
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.base,
    borderRadius: SIZES.radius,
    borderWidth: 1,
    borderColor: COLORS.lightGray1,
    alignItems: 'center',
  },

  errorMsg: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base,
    color: COLORS.red,
    ...FONTS.title_small,
  },
});
