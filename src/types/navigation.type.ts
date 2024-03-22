import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  EnterPassword: undefined;
  EnterPhoneNumber: undefined;
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
  Notification: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;
