import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../app/User/Home';
import MyMap from '../screens/Map';
import VisionCamera2 from '../screens/QRCheckout';

const Drawer = createDrawerNavigator();

 function DrawerNavigator({navigation}) {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="MyMap"
        component={MyMap}
        options={{headerShown: false}}
      />
      <Drawer.Screen
        name="Camera2"
        component={VisionCamera2}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}


export default DrawerNavigator;