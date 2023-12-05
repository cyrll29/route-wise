import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './routes/appStack';

export default function App() {
  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
}
