import { showAlert } from "@/src/utils/alert";
import { getErrorMessage } from "@/src/utils/apiError";
import { loginUser } from "@/src/services/authService";
import { useAuth } from "@/src/hooks/useAuth";
import { loginSchema } from "@/src/validation/schemas";
import { Link, router } from "expo-router";
import { useState } from "react";
import { FormInput } from "@/src/components/FormInput";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "@/src/styles/login.styles";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    const result = loginSchema.safeParse({ email, password: senha });
    if (!result.success) {
      showAlert("Atenção", result.error.issues[0].message);
      return;
    }

    setLoading(true);
    try {
      const response = await loginUser(result.data);
      await signIn(response.data.token, response.data.usuario);
      router.replace("/(tabs)");
    } catch (error) {
      // 401 da API = e-mail ou senha inválidos (a mensagem vem pronta)
      showAlert(
        "Erro",
        getErrorMessage(error, "Não foi possível fazer login."),
      );
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
        <FormInput
          label="Email"
          labelStyle={styles.label}
          inputStyle={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <FormInput
          label="Senha"
          labelStyle={styles.label}
          inputStyle={styles.input}
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
