import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  Register: undefined;
  ConfirmOtp: undefined;
  ForgotPassword: undefined;
  DetailFood: {
    foodId: string;
    foodReduxId?: string;
    restaurantId: string;
  };
  DetailRestaurant: {
    restaurantId: string;
  };
  EnterAddressScreen: {
    enableGoogleMap: boolean;
  };
  CartScreen: {
    restaurantId: string;
  };
  HomeScreen: undefined;
  SearchScreen: undefined;
  ListInvoices: undefined;
  CheckoutScreen: {
    restaurantId: string;
  };
};

export type CheckoutScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'CheckoutScreen'
>;

export type HomeScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'HomeScreen'
>;
export type ListInvoicesScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'ListInvoices'
>;

export type SearchScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'SearchScreen'
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

export type DetailRestaurantNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'DetailRestaurant'
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
