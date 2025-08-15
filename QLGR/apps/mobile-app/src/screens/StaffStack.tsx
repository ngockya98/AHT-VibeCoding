import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TasksScreen from './TasksScreen';
import ScanQRScreen from './ScanQRScreen';
import WorkLogsScreen from './WorkLogsScreen';

const Stack = createNativeStackNavigator();

export default function StaffStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Tasks" component={TasksScreen} />
      <Stack.Screen name="ScanQR" component={ScanQRScreen} />
      <Stack.Screen name="WorkLogs" component={WorkLogsScreen} />
    </Stack.Navigator>
  );
}
