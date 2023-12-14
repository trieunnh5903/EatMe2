import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CartScreen,
  CheckoutScreen,
  ConfirmOtpScreen,
  DetailFoodScreen,
  DetailRestaurantScreen,
  EnterAddressScreen,
  FavoriteScreen,
  ForgotPasswordScreen,
  HomeScreen,
  ListInvoices,
  LoginScreen,
  OnBoardingScreen,
  ProfileScreen,
  RegisterScreen,
  SearchScreen,
} from '../screens';
import {RootStackParamList} from '../types/navigation.type';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const MainNavigator = () => {
  const logged = true;
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {logged ? (
        <Stack.Group>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="DetailFood" component={DetailFoodScreen} />
          <Stack.Screen
            name="DetailRestaurant"
            component={DetailRestaurantScreen}
          />
          <Stack.Screen
            name="EnterAddressScreen"
            component={EnterAddressScreen}
          />
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} />
          <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
          <Stack.Screen
            name="ListInvoices"
            options={{presentation: 'fullScreenModal'}}
            component={ListInvoices}
          />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ConfirmOtp" component={ConfirmOtpScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default MainNavigator;
