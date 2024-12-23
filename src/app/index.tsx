import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import OnBoarding from './commonScreens/OnBoarding'; 
import Login from './commonScreens/Login';
import SignUp from './User/SignUp';
import SignUpOptions from './commonScreens/SignUpOptions';
import GuestSignUp from './Host/HostSignUp';
import Settings from './commonScreens/Settings';
import FindParking from './User/FindParking';
import Garage from './User/Garage';
import SplashScreen from './commonScreens/SplashScreen';
import ForgetPassword from './commonScreens/ForgetPassword';
import Home from './User/Home';
import HostHome from './Host/HostHome';
import { Provider } from 'react-redux'; // Import Provider
import store from '../../Redux/Store'; // Import the Redux store

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OnBoarding"
        component={OnBoarding}
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HostHome"
        component={HostHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="FindParking"
        component={FindParking}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Garage"
        component={ Garage}
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
        name="HostSignUp"
        component={GuestSignUp}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpOptions"
        component={SignUpOptions}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={{ headerShown: false }}
      />
      
    </Stack.Navigator>
     </Provider>
  );
}

export default App;
