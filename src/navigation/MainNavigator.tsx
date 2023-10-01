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
import {RootStackParamList} from '../types/navigation.type';
import TabNavigator from './TabNavigator';
import SplashScreen from 'react-native-splash-screen';
import useUserViewModel from '../view-models/useUserViewModel';

const Stack = createNativeStackNavigator<RootStackParamList>();
const MainNavigator = () => {
  const {logged} = useUserViewModel().userState;
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Stack.Navigator
      initialRouteName="ConfirmOtp"
      screenOptions={{headerShown: false}}>
      {logged ? (
        <>
          <Stack.Screen name="Main" component={TabNavigator} />
          <Stack.Screen name="DetailShop" component={DetailShopScreen} />
          <Stack.Screen name="DetailFood" component={DetailFoodScreen} />
          <Stack.Screen
            name="EnterAddressScreen"
            component={EnterAddressScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ConfirmOtp" component={ConfirmOtpScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
