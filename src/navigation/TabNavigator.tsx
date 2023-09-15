import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomTabNavigatorParamList} from './types';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  CartScreen,
  FavoriteScreen,
  HomeScreen,
  ProfileScreen,
  SearchScreen,
} from '../screens';
import {FONTS} from '../config';
import {useAppSelector} from '../utils/hooks';
import {RouteProp} from '@react-navigation/native';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const tabBarIcon = ({
  focused,
  color,
  size,
  route,
}: {
  focused: boolean;
  color: string;
  size: number;
  route: RouteProp<
    BottomTabNavigatorParamList,
    keyof BottomTabNavigatorParamList
  >;
}) => {
  let iconName: string = 'question';

  if (route.name === 'Home') {
    iconName = focused ? 'home' : 'home-outline';
  } else if (route.name === 'Search') {
    iconName = focused ? 'search' : 'search-outline';
  } else if (route.name === 'Cart') {
    iconName = focused ? 'cart' : 'cart-outline';
  } else if (route.name === 'Favorite') {
    iconName = focused ? 'heart' : 'heart-outline';
  } else if (route.name === 'Profile') {
    iconName = focused ? 'person' : 'person';
  }
  return <Ionicons name={iconName} size={size} color={color} />;
};

const TabNavigator = () => {
  let badge = useAppSelector(state => state.cart.totalProductQuantity);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarStyle: {height: 56},
        tabBarIconStyle: {marginTop: 4},
        tabBarLabelStyle: {marginBottom: 4, ...FONTS.label_small},
        tabBarIcon: ({focused, color, size}) =>
          tabBarIcon({focused, color, size, route}),
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{tabBarLabel: 'Trang chủ'}}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{tabBarLabel: 'Tìm kiếm'}}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Giỏ hàng',
          tabBarStyle: {display: 'none'},
          tabBarBadge: badge === 0 ? undefined : badge,
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{tabBarLabel: 'Yêu thích'}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{tabBarLabel: 'Cá nhân'}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
