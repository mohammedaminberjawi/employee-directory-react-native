import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';

import EmployeesContextProvider from './src/store/employees-context';
import AllEmployees from './src/screens/AllEmployees';
import IconButton from './src/components/UI/IconButton';

export type RootParamList = {
  AllEmployees: {};
};

const Stack = createNativeStackNavigator<RootParamList>();

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <EmployeesContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'AllEmployees'}>
            <Stack.Screen
              name="AllEmployees"
              component={AllEmployees}
              options={({navigation}) => ({
                headerRight: ({tintColor}) => (
                  <IconButton
                    icon="person-add"
                    size={24}
                    color={tintColor}
                    onPress={() => {
                      console.log('GO TO HANDLEEMPLOYEE');
                    }}
                  />
                ),
                headerTitle: 'All Employees',
              })}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </EmployeesContextProvider>
    </>
  );
}
