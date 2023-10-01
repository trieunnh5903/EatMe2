import {useNavigation} from '@react-navigation/native';
import {LoginNavigationProps} from '../types/navigation.type';
import {useState} from 'react';
import validate from '../utils/validate';

const useLoginController = () => {
  const navigation = useNavigation<LoginNavigationProps['navigation']>();
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

  const onChangeTextPhoneNumber = (value: string) => {
    validate.validatePhoneNumber(value, setPhoneNumberError);
    setPhoneNumber(value);
  };
  const onChangeTextPassword = (value: string) => {
    validate.validatePassword(value, setPasswordError);
    setPassword(value);
  };

  const onShowPasswordPress = () => setShowPassword(!showPassword);
  const onClearPhoneNumberPress = () => {
    setPhoneNumber('');
    setPhoneNumberError('');
  };

  const onClearPasswordPress = () => {
    setPassword('');
    setPasswordError('');
  };

  const onLoginPress = () => navigation.navigate('ConfirmOtp');
  const onRegisterPress = () => navigation.navigate('Register');
  const onForgotPasswordPress = () => navigation.navigate('ForgotPassword');
  return {
    onRegisterPress,
    onLoginPress,
    onChangeTextPassword,
    onForgotPasswordPress,
    onShowPasswordPress,
    onClearPhoneNumberPress,
    onClearPasswordPress,
    onChangeTextPhoneNumber,
    phoneNumber,
    phoneNumberError,
    password,
    passwordError,
    showPassword,
    isEnableSignIn,
  };
};

export default useLoginController;
