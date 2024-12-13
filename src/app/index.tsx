import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import OnBoarding from '../screens/OnBoarding'; 
import DrawerNavigator from '../Navigators/DrawerNavigator';
import HostDrawer from '../Navigators/HostDrawer';
import Home from '../screens/UserScreens/HomeScreen';
import Login from '../screens/commonScreens/Login';
import SignUp from '../screens/HostScreens/SignUp';
import MyMap from '../screens/Map';
import SignUpOptions from '../screens/commonScreens/SignUpOptions';
import GuestSignUp from '../screens/UserScreens/GuestSignUp';
import VisionCamera from '../screens/QRScanning';
import VisionCamera2 from '../screens/QRCheckout';
import AddRemoveInputField from '../screens/dynamic';
import Imge from '../screens/HostScreens/ParkingRegistration';
import AllBookings from '../screens/UserScreens/AllBookings';
import CardDetails from '../screens/UserScreens/CardDetails';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <Stack.Navigator initialRouteName="OnBoarding">
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HostDrawer"
        component={HostDrawer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HomeeScreen"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Map"
        component={MyMap}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GuestSignUp"
        component={GuestSignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpOptions"
        component={SignUpOptions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Camera"
        component={VisionCamera}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Camera2"
        component={VisionCamera2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddRemoveInputField"
        component={AddRemoveInputField}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Imge"
        component={Imge}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AllBookings"
        component={AllBookings}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CardDetails"
        component={CardDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default App;
