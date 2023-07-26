import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//Screens
import {Homepage,UserDetails} from '../screens'

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
      <NavigationContainer>
         <Stack.Navigator>
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
      </Stack.Navigator>
      </NavigationContainer>
    );
  }