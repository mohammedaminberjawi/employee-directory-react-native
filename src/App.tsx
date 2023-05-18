import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';

import EmployeesContextProvider from './store/employees-context';
import AllEmployees from './screens/AllEmployees';
import HandleEmployee from './screens/HandleEmployee';
import IconButton from './components/UI/IconButton';

export type RootParamList = {
  AllEmployees: {};
  HandleEmployees: {employeeId: string};
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
                      navigation.navigate('HandleEmployees');
                    }}
                  />
                ),
                headerTitle: 'All Employees',
              })}
            />
            <Stack.Screen
              name="HandleEmployees"
              component={HandleEmployee}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </EmployeesContextProvider>
    </>
  );
}
