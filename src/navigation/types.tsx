import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {FoodObject} from '../screens/types';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  Register: undefined;
  ConfirmOtp: undefined;
  Main: NavigatorScreenParams<BottomTabNavigatorParamList>;
  ForgotPassword: undefined;
  DetailFood: {
    foodItem: FoodObject;
  };
  DetailShop: {
    foodItem: FoodObject;
  };
  EnterAddressScreen: undefined;
};

export type BottomTabNavigatorParamList = {
  Home: undefined;
  Search: undefined;
  Cart: undefined;
  Favorite: undefined;
  Profile: undefined;
};

export type HomeScreenProp = CompositeScreenProps<
  BottomTabScreenProps<BottomTabNavigatorParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabNavigatorParamList, 'Home'>,
  NativeStackNavigationProp<RootStackParamList>
>;

export type CartScreenProp = BottomTabScreenProps<
  BottomTabNavigatorParamList,
  'Cart'
>;

export type SreachScreenProp = CompositeScreenProps<
  BottomTabScreenProps<BottomTabNavigatorParamList, 'Search'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type FavoriteScreenProp = CompositeScreenProps<
  BottomTabScreenProps<BottomTabNavigatorParamList, 'Favorite'>,
  NativeStackScreenProps<RootStackParamList>
>;

export type OnBoardingNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'OnBoarding'
>;

export type EnterAddressScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'EnterAddressScreen'
>;

export type DetailFoodNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'DetailFood'
>;

export type DetailShopNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'DetailShop'
>;

export type LoginNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Login'
>;

export type RegisterNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;

export type ConfirmOtpNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'ConfirmOtp'
>;

export type ForgotPasswordNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPassword'
>;
