import * as React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CoursesScreen from './CoursesScreen';
import DictionaryScreen from './Dictionary';
import LeaguesScreen from './Leagues';
import CommunityScreen from './Community';
import ProfileScreen from './Profile';

export type MainTabParamList = {
  Courses: undefined;
  Dictionary: undefined;
  Leagues: undefined;
  Community: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const Stack = createNativeStackNavigator();

function CommunityStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommunityHome" component={CommunityScreen} />
    </Stack.Navigator>
  );
}

const ICONS: Record<keyof MainTabParamList, string> = {
  Courses: 'school-outline',
  Dictionary: 'book-outline',
  Leagues: 'trophy-outline',
  Community: 'account-group-outline',
  Profile: 'account-outline',
};

const ACTIVE = '#2F5D82';
const INACTIVE = '#2F5D82';
const PILL = '#DCE8FF';

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.bar}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const onPress = () => {
          const e = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
          if (!focused && !e.defaultPrevented) navigation.navigate(route.name);
        };
        return (
          <TouchableOpacity key={route.key} onPress={onPress} style={styles.itemWrap} activeOpacity={0.8}>
            <View style={[styles.pill, focused && { backgroundColor: PILL }]}>
              <MaterialCommunityIcons
                name={ICONS[route.name as keyof MainTabParamList]}
                size={22}
                color={focused ? ACTIVE : INACTIVE}
              />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <MyTabBar {...props} />}
      initialRouteName="Courses"
    >
      <Tab.Screen name="Courses" component={CoursesScreen} />
      <Tab.Screen name="Dictionary" component={DictionaryScreen} />
      <Tab.Screen name="Leagues" component={LeaguesScreen} />
      <Tab.Screen name="Community" component={CommunityStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 14,
    backgroundColor: '#EEF0F6',
  },
  itemWrap: { paddingHorizontal: 6 },
  pill: { borderRadius: 16, paddingVertical: 8, paddingHorizontal: 10 },
});
