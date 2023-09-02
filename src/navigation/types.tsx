import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FoodObjectProps} from '../screens/types';

export type RootStackParamList = {
  OnBoarding: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  ConfirmOtp: undefined;
  ForgotPassword: undefined;
  DetailFood: {
    foodItem: FoodObjectProps;
  };
};

export type OnBoardingNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'OnBoarding'
>;

export type DetailFoodNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'DetailFood'
>;

// export type DetailFoodRouteProp = RouteProp<RootStackParamList, 'DetailFood'>;

export type HomeNavigationProps = NativeStackScreenProps<
  RootStackParamList,
  'Home'
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
