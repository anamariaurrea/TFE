// App.tsx
import * as React from 'react';
import {
  Provider as PaperProvider,
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import { NavigationContainer, DefaultTheme as NavDefaultTheme, DarkTheme as NavDarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useColorScheme } from 'react-native';

import LoginScreen from './LoginScreen';
import OnboardingWizard from './Onboarding';
import MainTabs from './MainTabs';
import RegisterEmailScreen from './Register';

// 1) Temas base (puedes ajustar tokens a tu paleta)
const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#425E91',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    onSurface: '#111111',
    onSurfaceVariant: '#666666',
    outline: '#E0E0E0',
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#9FC1FF',
    background: '#0B0F14',
    surface: '#0F141A',
    onSurface: '#EDEFF3',
    onSurfaceVariant: '#A9B3BE',
    outline: '#27313B',
  },
};

// 2) Alinear NavigationContainer con Paper
const { LightTheme: PaperNavLight, DarkTheme: PaperNavDark } = adaptNavigationTheme({
  reactNavigationLight: NavDefaultTheme,
  reactNavigationDark: NavDarkTheme,
});

// Opcional: mezcla de colores para navigation basados en paper
const navLight = {
  ...PaperNavLight,
  colors: {
    ...PaperNavLight.colors,
    background: lightTheme.colors.background,
    card: lightTheme.colors.surface,
    text: lightTheme.colors.onSurface,
    primary: lightTheme.colors.primary,
    border: lightTheme.colors.outline,
  },
};

const navDark = {
  ...PaperNavDark,
  colors: {
    ...PaperNavDark.colors,
    background: darkTheme.colors.background,
    card: darkTheme.colors.surface,
    text: darkTheme.colors.onSurface,
    primary: darkTheme.colors.primary,
    border: darkTheme.colors.outline,
  },
};

// 3) Contexto para el toggle
type ThemeCtx = { isDark: boolean; toggle: () => void };
export const ThemeContext = React.createContext<ThemeCtx>({ isDark: false, toggle: () => {} });

const Stack = createNativeStackNavigator();

export default function App() {
  const systemPrefersDark = useColorScheme() === 'dark';
  const [isDark, setIsDark] = React.useState(systemPrefersDark);
  const toggle = React.useCallback(() => setIsDark(v => !v), []);

  const paperTheme = isDark ? darkTheme : lightTheme;
  const navigationTheme = isDark ? navDark : navLight;

  return (
    <ThemeContext.Provider value={{ isDark, toggle }}>
      <PaperProvider
        theme={paperTheme}
        settings={{ icon: (props) => <MaterialCommunityIcons {...props} /> }}
      >
        <NavigationContainer theme={navigationTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
            {/* Fuera del shell */}
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="RegisterEmail" component={RegisterEmailScreen} />
            <Stack.Screen name="Onboarding" component={OnboardingWizard} />

            {/* Shell con tabs */}
            <Stack.Screen name="MainTabs" component={MainTabs} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}
