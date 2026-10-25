import { CameraView, useCameraPermissions } from "expo-camera";
import { useRef } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "@/src/styles/camera.styles";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  // Ainda carregando o estado da permissão
  if (!permission) return <View style={styles.container} />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          Precisamos da câmera para fotografar os frutos.
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          // Se o usuário negou e o Android não pergunta mais, abre as configurações
          onPress={
            permission.canAskAgain ? requestPermission : Linking.openSettings
          }
        >
          <Text style={styles.permissionButtonText}>
            {permission.canAskAgain ? "Permitir câmera" : "Abrir configurações"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        facing="back"
      />
    </View>
  );
}
