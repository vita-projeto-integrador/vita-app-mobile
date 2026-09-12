import { registerUser } from "@/src/services/authService";
import { useAuth } from "@/src/hooks/useAuth";
import {
  isValidEmail,
  isValidDate,
  isValidCNPJ,
  isValidPhone,
  formatPhone,
  formatCNPJ,
  formatDate,
  toISODate,
} from "@/src/validation/authSchemas";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./register.styles";

type AccessType = "produtor" | "estudante";

const TOTAL_STEPS = 3;

export default function RegisterScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const [senha, setSenha] = useState("");
  const [accessType, setAccessType] = useState<AccessType | null>(null);

  const [telefone, setTelefone] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [escola, setEscola] = useState("");
  const [curso, setCurso] = useState("");

  function handleAvancar() {
    if (step === 1) {
      if (!nome || !email) {
        Alert.alert("Atencao", "Preencha nome e email.");
        return;
      }
      if (!isValidEmail(email)) {
        Alert.alert("Atencao", "Digite um email valido.");
        return;
      }
    }
    if (step === 2) {
      if (!senha || !accessType) {
        Alert.alert("Atencao", "Preencha a senha e escolha o tipo de acesso.");
        return;
      }
      if (senha.length < 6) {
        Alert.alert("Atencao", "A senha deve ter pelo menos 6 caracteres.");
        return;
      }
    }
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  }

  function handleVoltar() {
    setStep((prev) => Math.max(prev - 1, 1));
  }

  function validateStep3() {
    if (telefone && !isValidPhone(telefone)) {
      Alert.alert("Atencao", "Telefone invalido. Digite DDD + numero.");
      return false;
    }
    if (dataNascimento && !isValidDate(dataNascimento)) {
      Alert.alert("Atencao", "Data de nascimento invalida.");
      return false;
    }
    if (accessType === "produtor" && cnpj && !isValidCNPJ(cnpj)) {
      Alert.alert("Atencao", "CNPJ invalido. Digite os 14 numeros.");
      return false;
    }
    return true;
  }

  async function handleFinalizar() {
    if (!validateStep3()) return;

    setLoading(true);
    try {
      const response = await registerUser({
        name: nome,
        email,
        password: senha,
        phone: telefone ? telefone.replace(/\D/g, "") : undefined,
        birthDate: dataNascimento ? toISODate(dataNascimento) : undefined,
        accessType: accessType!,
        address: endereco || undefined,
        cnpj:
          accessType === "produtor" && cnpj
            ? cnpj.replace(/\D/g, "")
            : undefined,
        highSchool:
          accessType === "estudante" ? escola || undefined : undefined,
        course: accessType === "estudante" ? curso || undefined : undefined,
      });

      await signIn(response.data.token, response.data.user);
      router.replace("/(tabs)");
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Nao foi possivel concluir o cadastro.";
      Alert.alert("Erro", message);
    } finally {
      setLoading(false);
    }
  }

  const progress = step / TOTAL_STEPS;

  return (
    <SafeAreaView style={styles.container} edges={["bottom"]}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Comecar gratuitamente</Text>
            <Text style={styles.subtitle}>
              Crie uma conta <Text style={styles.brand}>Vita</Text>
            </Text>
          </View>

          <View style={styles.form}>
            {step === 1 && (
              <>
                <Text style={styles.label}>Nome completo</Text>
                <TextInput
                  style={styles.input}
                  value={nome}
                  onChangeText={setNome}
                  autoCapitalize="words"
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </>
            )}

            {step === 2 && (
              <>
                <Text style={styles.label}>Senha</Text>
                <TextInput
                  style={styles.input}
                  value={senha}
                  onChangeText={setSenha}
                  secureTextEntry
                  autoCapitalize="none"
                />

                <Text style={styles.label}>Tipo de acesso</Text>
                <View style={styles.optionsRow}>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      accessType === "produtor" && styles.optionButtonSelected,
                    ]}
                    onPress={() => setAccessType("produtor")}
                  >
                    <Text
                      style={[
                        styles.optionButtonText,
                        accessType === "produtor" &&
                          styles.optionButtonTextSelected,
                      ]}
                    >
                      Produtor
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      accessType === "estudante" && styles.optionButtonSelected,
                    ]}
                    onPress={() => setAccessType("estudante")}
                  >
                    <Text
                      style={[
                        styles.optionButtonText,
                        accessType === "estudante" &&
                          styles.optionButtonTextSelected,
                      ]}
                    >
                      Estudante
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}

            {step === 3 && (
              <>
                <Text style={styles.label}>Telefone</Text>
                <TextInput
                  style={styles.input}
                  value={telefone}
                  onChangeText={(text) => setTelefone(formatPhone(text))}
                  keyboardType="phone-pad"
                  placeholder="(11) 99999-0000"
                  maxLength={15}
                />

                <Text style={styles.label}>Data de nascimento</Text>
                <TextInput
                  style={styles.input}
                  value={dataNascimento}
                  onChangeText={(text) => setDataNascimento(formatDate(text))}
                  keyboardType="numeric"
                  placeholder="04/05/2004"
                  maxLength={10}
                />

                <Text style={styles.label}>Endereco</Text>
                <TextInput
                  style={styles.input}
                  value={endereco}
                  onChangeText={setEndereco}
                />

                {accessType === "produtor" && (
                  <>
                    <Text style={styles.label}>CNPJ</Text>
                    <TextInput
                      style={styles.input}
                      value={cnpj}
                      onChangeText={(text) => setCnpj(formatCNPJ(text))}
                      keyboardType="numeric"
                      placeholder="00.000.000/0000-00"
                      maxLength={18}
                    />
                  </>
                )}

                {accessType === "estudante" && (
                  <>
                    <Text style={styles.label}>Escola</Text>
                    <TextInput
                      style={styles.input}
                      value={escola}
                      onChangeText={setEscola}
                    />

                    <Text style={styles.label}>Curso</Text>
                    <TextInput
                      style={styles.input}
                      value={curso}
                      onChangeText={setCurso}
                    />
                  </>
                )}
              </>
            )}

            <View style={styles.buttonRow}>
              {step > 1 ? (
                <TouchableOpacity onPress={handleVoltar}>
                  <Text style={styles.backButtonText}>Voltar</Text>
                </TouchableOpacity>
              ) : (
                <View />
              )}

              {step < TOTAL_STEPS ? (
                <TouchableOpacity style={styles.button} onPress={handleAvancar}>
                  <Text style={styles.buttonText}>Avancar</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleFinalizar}
                  disabled={loading}
                >
                  <Text style={styles.buttonText}>
                    {loading ? "Enviando..." : "Finalizar cadastro"}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>

          <View style={styles.progressTrack}>
            <View
              style={[styles.progressFill, { width: `${progress * 100}%` }]}
            />
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Ja possui uma conta?{" "}
            <Text
              style={styles.footerLink}
              onPress={() => router.push("/(auth)/login")}
            >
              Acessar agora.
            </Text>
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
