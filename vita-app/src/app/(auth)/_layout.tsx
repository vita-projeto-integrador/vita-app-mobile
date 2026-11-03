import { Stack } from 'expo-router';
import { GuestOnly } from '@/src/components/AuthGate';

export default function AuthLayout() {
  return (
    <GuestOnly>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </GuestOnly>
  );
}
