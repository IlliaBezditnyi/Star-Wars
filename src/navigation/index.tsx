import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from '../screens/MainScreen';
import InfoScreen from '../screens/InfoScreen';

const Stack = createNativeStackNavigator();

const Navigation: FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            title: 'Fans',
            headerStyle: {
              backgroundColor: '#624aa1',
            },
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: 'bold',
              color: '#fff',
            },
          }}
        />
        <Stack.Screen
          name="InfoScreen"
          component={InfoScreen}
          options={{
            title: 'Info',
            headerStyle: {
              backgroundColor: '#624aa1',
            },
            headerTitleStyle: {fontSize: 20, fontWeight: '500', color: '#fff'},
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
