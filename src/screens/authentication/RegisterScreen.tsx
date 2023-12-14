import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import {
  AuthLayout,
  ButtonIcon,
  ButtonText,
  TextInputCustom,
} from '../../components';
import {COLORS, FONTS, SIZES, icons, images} from '../../config';
import useRegisterController from '../../view-controllers/useRegisterController';

const RegisterScreen = () => {
  const {
    fullName,
    password,
    onClearPasswordPress,
    fullNameError,
    isEnableSignIn,
    onChangeTextFullName,
    onChangeTextPassword,
    onChangeTextPhoneNumber,
    onClearPhoneNumberPress,
    onLoginPress,
    onRegisterPress,
    onShowPasswordPress,
    showPassword,
    passwordError,
    phoneNumber,
    phoneNumberError,
  } = useRegisterController();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
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
          <Text style={styles.textHeadline}>Đăng ký</Text>
          {/* phoneNumber */}
          <TextInputCustom
            value={phoneNumber}
            placeholder={'Số điện thoại di động'}
            rightComponent={
              <View>
                {phoneNumber !== '' && (
                  <TouchableOpacity onPress={onClearPhoneNumberPress}>
                    <Image
                      style={[
                        styles.iconCheck,
                        {
                          tintColor:
                            phoneNumberError === ''
                              ? COLORS.green
                              : COLORS.black,
                        },
                      ]}
                      source={
                        phoneNumberError === ''
                          ? icons.check_circle
                          : icons.close
                      }
                    />
                  </TouchableOpacity>
                )}
              </View>
            }
            onChangeText={value => onChangeTextPhoneNumber(value)}
            errorMsg={phoneNumberError}
          />
          {/* password */}
          <TextInputCustom
            containerStyle={{marginTop: phoneNumberError ? 0 : SIZES.radius}}
            placeholder={'Mật khẩu'}
            secureTextEntry={!showPassword}
            rightComponent={
              <View style={styles.rightTxtPassword}>
                {password !== '' && passwordError !== '' && (
                  <TouchableOpacity onPress={onClearPasswordPress}>
                    <Image style={[styles.iconCheck]} source={icons.close} />
                  </TouchableOpacity>
                )}
                <TouchableOpacity onPress={onShowPasswordPress}>
                  <Image
                    style={[styles.iconCheck]}
                    source={showPassword ? icons.eye : icons.eye_off}
                  />
                </TouchableOpacity>
              </View>
            }
            onChangeText={value => onChangeTextPassword(value)}
            errorMsg={passwordError}
          />
          <TextInputCustom
            containerStyle={{marginTop: passwordError ? 0 : SIZES.radius}}
            placeholder={'Tên của bạn'}
            rightComponent={
              <View>
                {fullName !== '' && (
                  <Image
                    style={[
                      styles.iconCheck,
                      {
                        tintColor:
                          fullNameError === '' ? COLORS.green : COLORS.black,
                      },
                    ]}
                    source={
                      fullNameError === '' ? icons.check_circle : icons.close
                    }
                  />
                )}
              </View>
            }
            onChangeText={value => onChangeTextFullName(value)}
            errorMsg={fullNameError}
          />

          <ButtonText
            disabled={!isEnableSignIn()}
            onPress={onRegisterPress}
            label={'Đăng ký'}
            labelStyle={styles.btnRegisterLabel}
            containerStyle={[
              styles.btnRegister,
              !isEnableSignIn() && {opacity: 0.5},
            ]}
          />

          <View style={{alignItems: 'center'}}>
            <Text style={styles.text1}>Hoặc đăng nhập bằng</Text>
            <View style={styles.btnSocialGroup}>
              <ButtonIcon
                containerStyle={styles.btnGoogle}
                iconStyle={styles.iconSocial}
                icon={icons.google}
              />
              <ButtonIcon
                containerStyle={styles.btnFacebook}
                iconStyle={styles.iconSocial}
                icon={icons.facebook}
              />
            </View>
          </View>
        </View>

        <ButtonText
          label={'Đăng nhập'}
          labelStyle={{
            color: COLORS.primary,
            ...FONTS.title_medium,
          }}
          onPress={onLoginPress}
        />
      </AuthLayout>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  rightTxtPassword: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },

  btnGoogle: {
    padding: SIZES.base,
    backgroundColor: COLORS.lightGray2,
    borderRadius: 100,
  },
  btnSocialGroup: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: SIZES.padding,
  },
  btnRegister: {
    marginTop: SIZES.spacing * 2,
    height: 50,
    borderRadius: SIZES.padding,
    backgroundColor: COLORS.primary,
  },
  btnRegisterLabel: {
    color: COLORS.white,
    ...FONTS.title_medium,
  },

  iconSocial: {
    width: 32,
    height: 32,
  },

  logoWrapper: {alignItems: 'center', alignSelf: 'center'},

  btnFacebook: {
    padding: SIZES.base,
    backgroundColor: COLORS.lightGray2,
    borderRadius: 100,
  },

  iconCheck: {
    width: 20,
    height: 20,
    tintColor: COLORS.black,
  },
  contentWrapper: {
    marginTop: SIZES.padding * 2,
  },
  logo: {
    height: 70,
    width: 70,
  },
  text1: {
    color: COLORS.blackText,
    marginTop: SIZES.padding,
    ...FONTS.title_small,
  },

  textHeadline: {
    color: COLORS.blackText,
    ...FONTS.headline_medium,
  },
});
