import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {ReactNode} from 'react';
import {SIZES} from '../theme';

type AuthLayoutProps = {
  children: ReactNode;
};
const AuthLayout: React.FC<AuthLayoutProps> = ({children}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container]}>
      <TouchableWithoutFeedback
        touchSoundDisabled={true}
        onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          {/* children */}
          {children}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default AuthLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },

  inner: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: SIZES.padding,
  },
});
