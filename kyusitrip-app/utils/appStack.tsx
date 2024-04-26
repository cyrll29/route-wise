import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartingPage from '../components/pages/StartingPage';
import LoginPage from '../components/pages/LoginPage';
import SignupPage from '../components/pages/SignupPage';
import RouteFinder from '../components/pages/RouteFinder';
import ForgetPassword from '../components/pages/ForgetPassword';
import PlaceSearch from '../components/pages/PlaceSearch'

export default function AppStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='StartingPage' component={StartingPage} />
            <Stack.Screen name='LoginPage' component={LoginPage} />
            <Stack.Screen name='SignupPage' component={SignupPage} />
            <Stack.Screen name='RouteFinder' component={RouteFinder} />
            <Stack.Screen name='ForgetPassword' component={ForgetPassword} />
            <Stack.Screen name='PlaceSearch' component={PlaceSearch} />
        </Stack.Navigator>
    )
}