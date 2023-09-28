import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ConfirmOtpScreen,
  DetailFoodScreen,
  DetailShopScreen,
  EnterAddressScreen,
  ForgotPasswordScreen,
  LoginScreen,
  OnBoardingScreen,
  RegisterScreen,
} from '../screens';
import {RootStackParamList} from './types';
import TabNavigator from './TabNavigator';

const Stack = createNativeStackNavigator<RootStackParamList>();
const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="OnBoarding"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ConfirmOtp" component={ConfirmOtpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="DetailShop" component={DetailShopScreen} />
      <Stack.Screen name="DetailFood" component={DetailFoodScreen} />
      <Stack.Screen name="EnterAddressScreen" component={EnterAddressScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
