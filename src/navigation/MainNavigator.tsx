import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  CartScreen,
  CheckoutScreen,
  DetailFoodScreen,
  DetailRestaurantScreen,
  EnterAddressScreen,
  HomeScreen,
  ListInvoices,
  NotificationScreen,
} from '../screens';
import {RootStackParamList} from '../types/navigation.type';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const MainNavigator = () => {
  React.useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailFood" component={DetailFoodScreen} />
      <Stack.Screen
        name="DetailRestaurant"
        component={DetailRestaurantScreen}
      />
      <Stack.Screen name="EnterAddressScreen" component={EnterAddressScreen} />
      <Stack.Screen name="CartScreen" component={CartScreen} />
      <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      <Stack.Screen
        name="ListInvoices"
        options={{presentation: 'fullScreenModal'}}
        component={ListInvoices}
      />
      <Stack.Screen name="Notification" component={NotificationScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
