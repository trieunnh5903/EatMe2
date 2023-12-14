import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {SIZES, FONTS, COLORS, icons, images} from '../../config';
import {
  AuthLayout,
  ButtonIcon,
  ButtonText,
  TextInputCustom,
} from '../../components';
import useLoginController from '../../view-controllers/useLoginController';

const LoginScreen = () => {
  const {
    onChangeTextPassword,
    onForgotPasswordPress,
    onLoginPress,
    onRegisterPress,
    onShowPasswordPress,
    password,
    onChangeTextPhoneNumber,
    isEnableSignIn,
    onClearPasswordPress,
    passwordError,
    phoneNumber,
    phoneNumberError,
    showPassword,
    onClearPhoneNumberPress,
  } = useLoginController();
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
                {phoneNumber !== '' && phoneNumberError !== '' && (
                  <TouchableOpacity onPress={onClearPhoneNumberPress}>
                    <Image style={[styles.iconCheck]} source={icons.close} />
                  </TouchableOpacity>
                )}
              </View>
            }
            onChangeText={text => onChangeTextPhoneNumber(text)}
            errorMsg={phoneNumberError}
          />
          <TextInputCustom
            value={password}
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

          <TouchableOpacity
            style={{alignSelf: 'flex-start'}}
            onPress={onForgotPasswordPress}>
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
            onPress={onLoginPress}
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
          onPress={onRegisterPress}
        />
      </AuthLayout>
    </SafeAreaView>
  );
};

export default LoginScreen;

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
    tintColor: COLORS.black,
  },
  contentWrapper: {
    marginTop: SIZES.padding * 2,
  },
  logo: {
    height: 70,
    width: 70,
  },
});
