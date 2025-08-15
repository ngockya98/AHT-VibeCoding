import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookScreen from './BookScreen';
import TrackROScreen from './TrackROScreen';
import InvoicesScreen from './InvoicesScreen';

const Stack = createNativeStackNavigator();

export default function CustomerStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Book" component={BookScreen} />
      <Stack.Screen name="TrackRO" component={TrackROScreen} />
      <Stack.Screen name="Invoices" component={InvoicesScreen} />
    </Stack.Navigator>
  );
}
