import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SIZES, FONTS, COLORS, icons, images} from '../config';
import validate from '../utils/validate';
import {
  AuthLayout,
  ButtonIcon,
  ButtonText,
  TextInputCustom,
} from '../components';
import {LoginNavigationProps} from '../navigation/types';

const LoginScreen = ({navigation}: LoginNavigationProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const isEnableSignIn = () => {
    return (
      phoneNumber !== '' &&
      password !== '' &&
      passwordError === '' &&
      phoneNumberError === ''
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <AuthLayout>
        {/* logo */}
        <View style={styles.logoWrapper}>
          <Image
            source={images.logo_03}
            resizeMode="contain"
            style={styles.logo}
          />
        </View>
        <View style={styles.contentWrapper}>
          <Text
            style={{
              color: COLORS.blackText,
              ...FONTS.headline_medium,
            }}>
            Đăng nhập
          </Text>
          {/* form group */}
          <TextInputCustom
            value={phoneNumber}
            placeholder={'Số điện thoại di động'}
            rightComponent={
              <View>
                {phoneNumber !== '' &&
                  (phoneNumberError === '' ? (
                    <Image
                      style={[
                        styles.iconCheck,
                        {
                          tintColor: COLORS.green,
                        },
                      ]}
                      source={icons.check_circle}
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={() => {
                        setPhoneNumber('');
                        setPhoneNumberError('');
                      }}>
                      <Image
                        style={[
                          styles.iconCheck,
                          {
                            tintColor: COLORS.red,
                          },
                        ]}
                        source={icons.cancel_circle}
                      />
                    </TouchableOpacity>
                  ))}
              </View>
            }
            onChangeText={value => {
              validate.validatePhoneNumber(value, setPhoneNumberError);
              setPhoneNumber(value);
            }}
            errorMsg={phoneNumberError}
          />
          <TextInputCustom
            containerStyle={{marginTop: phoneNumberError ? 0 : SIZES.radius}}
            placeholder={'Mật khẩu'}
            secureTextEntry={!showPassword}
            rightComponent={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image
                  style={[styles.iconCheck, {tintColor: COLORS.gray}]}
                  source={showPassword ? icons.eye : icons.eye_off}
                />
              </TouchableOpacity>
            }
            onChangeText={value => {
              validate.validatePassword(value, setPasswordError);
              setPassword(value);
            }}
            errorMsg={passwordError}
          />

          <TouchableOpacity
            style={{alignSelf: 'flex-start'}}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text
              style={[
                {
                  color: COLORS.blackText,
                  marginTop: SIZES.base,
                },
                FONTS.title_small,
              ]}>
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>

          {/* button group */}
          <ButtonText
            disabled={!isEnableSignIn()}
            onPress={() => navigation.navigate('ConfirmOtp')}
            label={'Đăng nhập'}
            labelStyle={{
              color: COLORS.white,
              ...FONTS.title_medium,
            }}
            containerStyle={[
              styles.btnLogin,
              !isEnableSignIn() && {opacity: 0.5},
            ]}
          />

          <View style={{alignItems: 'center'}}>
            <Text
              style={[
                {
                  color: COLORS.blackText,
                  marginTop: SIZES.padding,
                  ...FONTS.title_small,
                },
              ]}>
              Hoặc đăng nhập bằng
            </Text>
            <View style={styles.socialGroup}>
              {/* btn google */}
              <ButtonIcon
                containerStyle={styles.btnGoogle}
                iconStyle={styles.iconSocial}
                icon={icons.google}
              />
              {/* btn facebook */}
              <ButtonIcon
                containerStyle={styles.btnFacebook}
                iconStyle={styles.iconSocial}
                icon={icons.facebook}
              />
            </View>
          </View>
        </View>

        <ButtonText
          label={'Tạo tài khoản mới'}
          labelStyle={{
            color: COLORS.primary,
            ...FONTS.title_medium,
          }}
          onPress={() => navigation.navigate('Register')}
        />
      </AuthLayout>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  btnGoogle: {
    padding: SIZES.base,
    backgroundColor: COLORS.lightGray2,
    borderRadius: 100,
  },
  socialGroup: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: SIZES.padding,
  },
  logoWrapper: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconSocial: {
    width: 32,
    height: 32,
  },

  btnFacebook: {
    padding: SIZES.base,
    backgroundColor: COLORS.lightGray2,
    borderRadius: 100,
  },
  btnLogin: {
    marginTop: SIZES.spacing * 2,
    height: 50,
    borderRadius: SIZES.padding,
    backgroundColor: COLORS.primary,
  },
  iconCheck: {
    width: 20,
    height: 20,
  },
  contentWrapper: {
    marginTop: SIZES.padding * 2,
  },
  logo: {
    height: 70,
    width: 70,
  },
});
