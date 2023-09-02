import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ConfirmOtpScreen,
  DetailFoodScreen,
  ForgotPasswordScreen,
  HomeScreen,
  LoginScreen,
  OnBoardingScreen,
  RegisterScreen,
} from '../screens';
import {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ConfirmOtp" component={ConfirmOtpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="DetailFood" component={DetailFoodScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;