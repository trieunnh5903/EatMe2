import {useNavigation} from '@react-navigation/native';
import {RegisterNavigationProps} from '../types/navigation.type';
import {useState} from 'react';
import validate from '../utils/validate';

const useRegisterController = () => {
  const navigation = useNavigation<RegisterNavigationProps['navigation']>();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState('');
  const [fullNameError, setFullNameError] = useState('');
  const isEnableSignIn = () => {
    return (
      phoneNumber !== '' &&
      password !== '' &&
      passwordError === '' &&
      phoneNumberError === '' &&
      fullName !== ''
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

  const onChangeTextFullName = (value: string) => {
    validate.validateFullName(value, setFullNameError);
    setFullName(value);
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

  const onClearFullnamePress = () => {
    setPassword('');
    setPasswordError('');
  };

  const onRegisterPress = () => navigation.navigate('ConfirmOtp');

  const onLoginPress = () => navigation.goBack();

  return {
    phoneNumber,
    phoneNumberError,
    password,
    passwordError,
    fullName,
    showPassword,
    fullNameError,
    isEnableSignIn,
    onClearFullnamePress,
    onClearPasswordPress,
    onLoginPress,
    onRegisterPress,
    onClearPhoneNumberPress,
    onShowPasswordPress,
    onChangeTextFullName,
    onChangeTextPassword,
    onChangeTextPhoneNumber,
  };
};

export default useRegisterController;
