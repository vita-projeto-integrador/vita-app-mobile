import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { styles } from "./register.styles";

export default function RegisterScreen() {
    const router = useRouter();
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");

    function handleAvancar(){
        router.push("/(auth)/register");
    }

    return (
        <SafeAreaView style={styles.container} edges={["bottom"]}>
            <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Começar gratuitamente</Text>
                        <Text style={styles.subtitle}>
                            Crie uma conta <Text style={styles.brand}>Vita</Text>
                        </Text>
                    </View>

                    <View style={styles.form}>
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
                        <TouchableOpacity style={styles.button} onPress={handleAvancar}>
                            <Text style={styles.buttonText}>Avançar</Text>
                        </TouchableOpacity>

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

