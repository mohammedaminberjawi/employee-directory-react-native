import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';

import AllEmployees from './src/screens/AllEmployees';

export type RootParamList = {
  AllEmployees: {};
};

const Stack = createNativeStackNavigator<RootParamList>();

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={'AllEmployees'}>
          <Stack.Screen
            name="AllEmployees"
            component={AllEmployees}
            options={() => ({
              headerTitle: 'All Employees',
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
