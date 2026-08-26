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
        router.push("/(auth)/register2");
    }

    return (
        <SafeAreaView style={styles.container} edges={[bottom]}>
            <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Começar gratuitamente</Text>
                        <Text></Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}