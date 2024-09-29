import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Platform } from 'react-native';

// Import platform-specific login screen files
import LoginScreenAndroid from './src/screens/LoginScreen.android';
import LoginScreenIOS from './src/screens/LoginScreen.ios';
import SignupScreen from './screens/login';

// Import other screens
import HomeScreen from './src/screens/HomeScreen';
import ServiceDetailScreen from './src/screens/ServiceDetailScreen';
import PaymentScreen from './src/screens/PaymentScreen';


const Stack = createStackNavigator();

const App = () => {
    // Select platform-specific login screen
    const LoginScreen = Platform.OS === 'android' ? LoginScreenAndroid : LoginScreenIOS;
  
    return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
          {Platform.OS === 'android' ? (
          <Stack.Screen name="Login" component={LoginScreenAndroid} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreenIOS} />
        )}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
            <Stack.Screen name="Payment" component={PaymentScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    };
    
  





export default App;
