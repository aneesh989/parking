import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import navigators/screens
import OnBoarding from '../screens/OnBoarding';
import Login from '../screens/commonScreens/Login';
import DrawerNavigator from '../Navigators/DrawerNavigator';
import HostDrawer from '../Navigators/HostDrawer';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="OnBoarding">
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="DrawerNavigator"
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="HostDrawer"
          component={HostDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
