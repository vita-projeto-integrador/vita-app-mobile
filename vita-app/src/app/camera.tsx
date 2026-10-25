import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { useRef, useState } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PhotoSlots } from "@/src/components/PhotoSlots";
import { styles } from "@/src/styles/camera.styles";
import { showAlert } from "@/src/utils/alert";
import { prepareImage } from "@/src/utils/image";

const MAX_PHOTOS = 4;

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const insets = useSafeAreaInsets();

  // URIs das fotos já preparadas (JPEG reduzido)
  const [photos, setPhotos] = useState<string[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);

  const isFull = photos.length >= MAX_PHOTOS;

  async function handleCapture() {
    if (isCapturing || isFull) return;
    setIsCapturing(true);
    try {
      const picture = await cameraRef.current?.takePictureAsync({
        quality: 0.8,
      });
      if (picture) {
        const uri = await prepareImage(picture.uri);
        setPhotos((prev) => [...prev, uri].slice(0, MAX_PHOTOS));
      }
    } catch {
      showAlert("Erro", "Não foi possível tirar a foto.");
    } finally {
      setIsCapturing(false);
    }
  }

  async function handlePickFromGallery() {
    if (isFull) return;
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsMultipleSelection: true,
        selectionLimit: MAX_PHOTOS - photos.length,
      });
      if (result.canceled) return;

      // Alguns Androids ignoram o selectionLimit, então cortamos aqui também
      const selected = result.assets.slice(0, MAX_PHOTOS - photos.length);
      const prepared = await Promise.all(
        selected.map((asset) => prepareImage(asset.uri)),
      );
      setPhotos((prev) => [...prev, ...prepared].slice(0, MAX_PHOTOS));
    } catch {
      showAlert("Erro", "Não foi possível carregar as fotos.");
    }
  }

  function handleRemove(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

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

      <View style={styles.bottom}>
        <View style={styles.slotsWrapper}>
          <PhotoSlots photos={photos} onRemove={handleRemove} />
        </View>

        <View style={[styles.controls, { paddingBottom: 20 + insets.bottom }]}>
          <TouchableOpacity
            style={[styles.sideButton, isFull && styles.disabled]}
            onPress={handlePickFromGallery}
            disabled={isFull}
          >
            <Ionicons name="image-outline" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.shutterOuter,
              (isFull || isCapturing) && styles.disabled,
            ]}
            onPress={handleCapture}
            disabled={isFull || isCapturing}
          >
            <View style={styles.shutterInner} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sideButton,
              isFull ? styles.confirmEnabled : styles.confirmDisabled,
            ]}
            disabled={!isFull}
            // O envio é o Passo 3
          >
            <Ionicons name="checkmark" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
