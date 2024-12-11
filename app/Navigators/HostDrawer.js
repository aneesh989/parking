import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/UserScreens/HomeScreen';
import AllBookings from '../screens/UserScreens/AllBookings';
import UserDrawerCustom from '../screens/UserScreens/UserDrawerCustom';

const Drawer = createDrawerNavigator();

const  DrawerNavigator =()=> {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <UserDrawerCustom {...props} />}
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="AllBookings"
        component={AllBookings}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
export default DrawerNavigator;