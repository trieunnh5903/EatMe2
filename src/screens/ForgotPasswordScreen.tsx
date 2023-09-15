import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, FONTS, SIZES, icons} from '../config';
import {
  AuthLayout,
  ButtonText,
  HeaderCustom,
  TextInputCustom,
} from '../components';
import validate from '../utils/validate';
import {ForgotPasswordNavigationProps} from '../navigation/types';

const ForgotPasswordScreen = ({navigation}: ForgotPasswordNavigationProps) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const isEnableButton = () => {
    return phoneNumber !== '' && phoneNumberError === '';
  };
  const onSendPassword = () => {
    navigation.goBack();
  };
  const onClearPhoneNumberPress = () => {
    setPhoneNumber('');
    setPhoneNumberError('');
  };
  return (
    <SafeAreaView style={styles.container}>
      <AuthLayout>
        {/* navigation bar */}
        <HeaderCustom
          leftComponent={
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.btnBack}>
              <Image source={icons.arrow_back} style={styles.icon} />
            </TouchableOpacity>
          }
          title={'Khôi phục mật khẩu'}
        />
        {/* content */}
        <Text
          style={{
            marginTop: SIZES.radius,
            color: COLORS.blackText,
            ...FONTS.body_large,
          }}>
          Vui lòng nhập số điện thoại của bạn để lấy lại mật khẩu
        </Text>
        {/* input */}
        <View style={{flex: 1}}>
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
                            phoneNumberError === '' ? COLORS.green : COLORS.red,
                        },
                      ]}
                      source={
                        phoneNumberError === ''
                          ? icons.check_circle
                          : icons.cancel_circle
                      }
                    />
                  </TouchableOpacity>
                )}
              </View>
            }
            onChangeText={value => {
              validate.validatePhoneNumber(value, setPhoneNumberError);
              setPhoneNumber(value);
            }}
            errorMsg={phoneNumberError}
          />
          {/* button send email */}
          <View style={{flex: 1}}></View>
          <ButtonText
            disabled={isEnableButton() ? false : true}
            containerStyle={[
              styles.btnSendEmail,
              {
                backgroundColor: isEnableButton()
                  ? COLORS.primary
                  : COLORS.lightOrange2,
              },
            ]}
            onPress={onSendPassword}
            label={'Khôi phục'}
            labelStyle={{
              color: COLORS.white,
              ...FONTS.title_medium,
            }}
          />
        </View>
      </AuthLayout>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  btnSendEmail: {
    height: 55,
    marginVertical: SIZES.padding,
    borderRadius: SIZES.radius,
  },
  btnBack: {
    paddingHorizontal: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    width: 24,
    height: 24,
    tintColor: COLORS.black,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  iconCheck: {
    width: 20,
    height: 20,
  },
});
