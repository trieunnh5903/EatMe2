import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainNavigator from './src/navigation/MainNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import setUpMirage from './miragejs/mirage.server';

if (__DEV__) {
  setUpMirage('development');
}

const queryClient = new QueryClient({
  defaultOptions: {queries: {staleTime: 60 * 1000}},
});
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <GestureHandlerRootView style={{flex: 1}}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </GestureHandlerRootView>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
