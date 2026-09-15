import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useAuth } from "@/src/hooks/useAuth";

export default function PerfilScreen() {
  const { user, signOut } = useAuth();

  async function handleSignOut() {
    await signOut();
    router.replace("/login");
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <Text style={{ fontSize: 16, marginBottom: 8 }}>
        Perfil (em construção)
      </Text>
      <Text style={{ fontSize: 14, color: "#666", marginBottom: 24 }}>
        {user?.name} · {user?.email}
      </Text>

      <TouchableOpacity
        onPress={handleSignOut}
        style={{
          backgroundColor: "#F5A623",
          paddingVertical: 12,
          paddingHorizontal: 32,
          borderRadius: 24,
        }}
      >
        <Text style={{ color: "#FFFFFF", fontWeight: "600" }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}
