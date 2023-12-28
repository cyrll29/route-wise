import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StartingPage from '../components/pages/StartingPage';
import LoginPage from '../components/pages/LoginPage';
import SignupPage from '../components/pages/SignupPage';
import Home from '../components/pages/Home';
import RouteFinder from '../components/pages/RouteFinder';
import Notification from '../components/pages/Notification';
import RouteList from '../components/pages/RouteList';
import RoadCondition from '../components/pages/RoadCondition';
import Hindrances from '../components/pages/Hindrances'
//<Stack.Screen name='' component={} />

export default function AppStack() {
    const Stack = createNativeStackNavigator();
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='StartingPage' component={StartingPage} />
            <Stack.Screen name='Home' component={Home} />
            <Stack.Screen name='LoginPage' component={LoginPage} />
            <Stack.Screen name='SignupPage' component={SignupPage} />
            <Stack.Screen name='RouteFinder' component={RouteFinder} />
            <Stack.Screen name='Notification' component={Notification} />
            <Stack.Screen name='RouteList' component={RouteList} />
            <Stack.Screen name='RoadCondition' component={RoadCondition} />
            <Stack.Screen name='Hindrances' component={Hindrances} />
        </Stack.Navigator>
    )
}