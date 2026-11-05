import { useEffect, useRef } from "react";
import { Animated, Modal, StyleSheet, Text, View } from "react-native";

const logo = require("@/assets/images/logo-vita-white.png");

interface LoadingOverlayProps {
  visible: boolean;
}

export function LoadingOverlay({ visible }: LoadingOverlayProps) {
  const scale = useRef(new Animated.Value(1)).current;

  // Pulso da logo enquanto a splash estiver visível
  useEffect(() => {
    if (!visible) return;
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.15,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [visible, scale]);

  return (
    <Modal
      visible={visible}
      animationType="fade"
      statusBarTranslucent
      // Impede que o botão voltar feche a splash no meio do envio
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <Animated.Image
          source={logo}
          style={[styles.logo, { transform: [{ scale }] }]}
          resizeMode="contain"
        />
        <Text style={styles.text}>Enviando imagens...</Text>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5A623",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  logo: {
    width: 180,
    height: 70,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
