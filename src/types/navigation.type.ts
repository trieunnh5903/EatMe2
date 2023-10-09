import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Food, Shop} from './types';

export type RootStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  Register: undefined;
  ConfirmOtp: undefined;
  ForgotPassword: undefined;
  DetailFood: {
    foodItem: Food;
    shopInfo: Shop;
  };
  DetailShop: {
    shopInfo: Shop;
  };
  EnterAddressScreen: {
    enableGoogleMap: boolean;
  };
  CartScreen: {
    idInvoices: string;
  };
  HomeScreen: undefined;
  SearchScreen: undefined;
  FavoriteScreen: undefined;
  ProfileScreen: undefined;
  ListCart: undefined;
};

export type HomeScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'HomeScreen'
>;
export type ListCartScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'ListCart'
>;
export type ProfileScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'ProfileScreen'
>;
export type SearchScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'SearchScreen'
>;
export type FavoriteScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'FavoriteScreen'
>;

export type CartScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'CartScreen'
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
