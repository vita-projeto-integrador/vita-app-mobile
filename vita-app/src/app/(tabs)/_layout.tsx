import { Tabs } from 'expo-router';
import { Image, View } from 'react-native';
import { CameraButton } from '@/src/components/CameraButton';

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            height: 64,
            paddingTop: 10,
            paddingBottom: 10,
            borderTopWidth: 0,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.08,
            shadowRadius: 8,
            elevation: 8,
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('@/assets/images/icons/tab-home.png')}
                style={{ width: 26, height: 26, opacity: focused ? 1 : 0.4 }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="historico"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('@/assets/images/icons/tab-historico.png')}
                style={{ width: 26, height: 26, opacity: focused ? 1 : 0.4 }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="mapa"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('@/assets/images/icons/tab-mapa.png')}
                style={{ width: 26, height: 26, opacity: focused ? 1 : 0.4 }}
                resizeMode="contain"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="perfil"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image
                source={require('@/assets/images/icons/tab-perfil.png')}
                style={{ width: 26, height: 26, opacity: focused ? 1 : 0.4 }}
                resizeMode="contain"
              />
            ),
          }}
        />
      </Tabs>
      <CameraButton />
    </View>
  );
}