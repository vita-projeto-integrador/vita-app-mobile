import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Link, router } from 'expo-router';
import { styles } from './login.styles';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin() {
    // TODO: validar credenciais / chamar API de autenticação
    router.replace('/(tabs)');
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>VITA</Text>
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

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Acessar conta</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Ainda não possui uma conta?{' '}
          <Link href="/(auth)/register" style={styles.footerLink}>
            Crie agora
          </Link>
        </Text>
      </View>
    </View>
  );
}