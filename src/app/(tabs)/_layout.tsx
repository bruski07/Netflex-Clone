import { Tabs } from 'expo-router';
import { MaterialCommunityIcons, MaterialIcons, Foundation } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Foundation name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='newsAndHot'
        options={{
          title: 'New & Hot',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="play-box-multiple-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name='myNetflix'
        options={{
          title: 'My Netflix',
          tabBarIcon: ({ color }) => <MaterialIcons name="portrait" size={24} color={color} />,
        }}
      />
    </Tabs>
  )
}