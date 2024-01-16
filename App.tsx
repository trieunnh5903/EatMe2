import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import MainNavigator from './src/navigation/MainNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import setUpMirage from './miragejs/mirage.server';
import {enableLatestRenderer} from 'react-native-maps';
import notifee, {EventType} from '@notifee/react-native';

if (__DEV__) {
  setUpMirage('development');
}

const queryClient = new QueryClient({
  defaultOptions: {queries: {staleTime: 60 * 1000}},
});

enableLatestRenderer();
const App: React.FC = () => {
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);
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
