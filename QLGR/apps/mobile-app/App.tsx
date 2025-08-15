import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MMKV } from 'react-native-mmkv';
import { useTranslation } from 'react-i18next';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import StaffStack from './src/screens/StaffStack';
import CustomerStack from './src/screens/CustomerStack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
export const storage = new MMKV();

export default function App() {
  const { t } = useTranslation();

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name={t('Staff')} component={StaffStack} />
          <Tab.Screen name={t('Customer')} component={CustomerStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
