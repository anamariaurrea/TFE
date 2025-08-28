import * as React from 'react';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import LoginScreen from './LoginScreen';
import OnboardingWizard from './Onboarding';
import MainTabs from './MainTabs';
import RegisterEmailScreen from './Register';

const theme = { ...MD3LightTheme };
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme} settings={{ icon: (props) => <MaterialCommunityIcons {...props} /> }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Login"     // 👈 antes estaba MainTabs
        >
          {/* Fuera del shell */}
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="RegisterEmail" component={RegisterEmailScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingWizard} />
        
          {/* Shell con tabs */}
          
          <Stack.Screen name="MainTabs" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
