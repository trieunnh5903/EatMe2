import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {CodeField, Cursor} from 'react-native-confirmation-code-field';
import {COLORS, SIZES, FONTS, images} from '../../config';
import {AuthLayout, ButtonText} from '../../components';
import useConfirmOtpController from '../../view-controllers/useConfirmOtpController';

const ConfirmOtpScreen = () => {
  const {
    CELL_COUNT,
    onChangeTextOtp,
    value,
    onResendPress,
    interval,
    isEnableButton,
    onNextPress,
    props,
    getCellOnLayoutHandler,
    ref,
    timer,
  } = useConfirmOtpController();

  useEffect(() => {
    let countDown = interval();
    return () => clearInterval(countDown);
  }, [interval]);
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
        <Text style={styles.headline}>Xác thực OTP</Text>
        <Text
          style={{
            color: COLORS.blackText,
            ...FONTS.body_large,
          }}>
          Mã xác thực đã được gửi tới trieu@gmail.com
        </Text>
        {/* otp */}
        <CodeField
          ref={ref}
          {...props}
          caretHidden={false}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={text => onChangeTextOtp(text)}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({index, symbol, isFocused}) => (
            <View
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}>
              <Text style={styles.textCell}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            </View>
          )}
        />

        {/* resend otp */}
        <View style={styles.text}>
          <Text style={{color: COLORS.darkGray, ...FONTS.body_large}}>
            Không nhận được mã?{' '}
          </Text>
          <ButtonText
            label={`Gửi lại (${timer}s)`}
            disabled={timer === 0 ? false : true}
            labelStyle={{
              color: COLORS.primary,
              ...FONTS.label_large,
            }}
            onPress={onResendPress}
          />
        </View>
        {/* Footer */}
        <View>
          <ButtonText
            disabled={!isEnableButton()}
            labelStyle={{
              color: COLORS.white,
            }}
            label={'Tiếp tục'}
            containerStyle={[
              styles.btnContinue,
              !isEnableButton() && {opacity: 0.5},
            ]}
            onPress={onNextPress}
          />
          <View style={styles.policyWrapper}>
            <Text
              style={{
                color: COLORS.darkGray,
                ...FONTS.body_medium,
              }}>
              Bằng cách đăng ký, bạn đồng ý với chúng tôi
            </Text>
            <ButtonText
              label={'Điều khoản và Điều kiện'}
              labelStyle={{
                color: COLORS.primary,
                ...FONTS.title_small,
              }}
              onPress={() => console.log('Terms and Conditions')}
            />
          </View>
        </View>
      </AuthLayout>
    </SafeAreaView>
  );
};

export default ConfirmOtpScreen;

const styles = StyleSheet.create({
  logoWrapper: {alignItems: 'center', alignSelf: 'center'},
  headline: {
    marginTop: 30,
    color: COLORS.blackText,
    ...FONTS.headline_medium,
  },
  text: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.padding,
  },
  btnContinue: {
    height: 50,
    marginTop: SIZES.spacing,
    alignItems: 'center',
    borderRadius: SIZES.padding,
    backgroundColor: COLORS.primary,
  },
  policyWrapper: {
    marginVertical: SIZES.padding,
    alignItems: 'center',
  },
  logo: {
    height: 70,
    width: 70,
  },
  codeFieldRoot: {marginTop: SIZES.padding},
  cell: {
    width: 65,
    height: 65,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.lightGray2,
    borderWidth: 1,
    borderColor: COLORS.gray3,
    justifyContent: 'center',
    alignContent: 'center',
  },
  focusCell: {
    borderColor: COLORS.black,
  },
  textCell: {
    color: COLORS.blackText,
    textAlign: 'center',
    ...FONTS.headline_small,
  },
});
