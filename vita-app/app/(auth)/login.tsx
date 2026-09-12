import { loginUser } from "@/src/services/authService";
import { saveToken, saveUser } from "@/src/storage/tokenStorage";
import { Link, router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./login.styles";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !senha) {
      Alert.alert("Atenção", "Preencha email e senha.");
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser({ email, password: senha });
      await saveToken(response.data.token);
      await saveUser(response.data.user);
      router.replace("/(tabs)");
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Não foi possível fazer login.";
      Alert.alert("Erro", message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={require("@/assets/images/logo-vita-orange.png")}
            style={{ width: 160, height: 60 }}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Entrando..." : "Acessar conta"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Ainda não possui uma conta?{" "}
          <Link href="/(auth)/register" style={styles.footerLink}>
            Crie agora
          </Link>
        </Text>
      </View>
    </View>
  );
}
