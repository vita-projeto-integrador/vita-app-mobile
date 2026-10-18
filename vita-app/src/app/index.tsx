import { router } from "expo-router";
import { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { useAuth } from "@/src/hooks/useAuth";

export default function SplashScreen() {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      if (isAuthenticated) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isLoading, isAuthenticated]);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo-vita-white.png")}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5A623",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 180,
    height: 70,
  },
});
