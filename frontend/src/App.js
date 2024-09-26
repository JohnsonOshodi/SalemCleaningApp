import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import PaymentScreen from './screens/PaymentScreen';

const Stack = createStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="ServiceDetail" component={ServiceDetailScreen} />
                <Stack.Screen name="Payment" component={PaymentScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
