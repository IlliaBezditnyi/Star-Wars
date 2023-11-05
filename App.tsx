import React from 'react';
import Navigation from './src/navigation';
// import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/store';
import {PaperProvider} from 'react-native-paper';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import MainScreen from './src/screens/MainScreen';
// import InfoScreen from './src/screens/InfoScreen';

// const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Navigation />
      </PaperProvider>
    </Provider>
  );
};

export default App;
