import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LoadingOverlay } from "@/src/components/LoadingOverlay";
import { PhotoSlots } from "@/src/components/PhotoSlots";
import { createAnalysis } from "@/src/services/analysisService";
import type { Photo } from "@/src/services/analysisService";
import { styles } from "@/src/styles/camera.styles";
import { showAlert } from "@/src/utils/alert";
import { prepareImage } from "@/src/utils/image";
import { toPhotoLocation } from "@/src/utils/location";

const MAX_PHOTOS = 4;

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const insets = useSafeAreaInsets();

  // Fotos já preparadas (JPEG reduzido) com horário e localização
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Última leitura do GPS. É uma ref porque muda várias vezes por segundo
  // e não precisa redesenhar a tela.
  const lastReading = useRef<Location.LocationObject | null>(null);

  const isFull = photos.length >= MAX_PHOTOS;

  // Liga o GPS enquanto a câmera está aberta: quando o usuário dispara,
  // a leitura já "esquentou" e o disparo não espera o GPS
  useEffect(() => {
    if (!permission?.granted) return;

    let subscription: Location.LocationSubscription | null = null;
    let closed = false;

    async function startGps() {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      if (!granted) {
        showAlert(
          "Localização desligada",
          "As fotos serão enviadas, mas esta análise não vai aparecer no mapa.",
        );
        return;
      }
      const sub = await Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000 },
        (reading) => {
          lastReading.current = reading;
        },
      );
      // Se a tela fechou enquanto esperava, desliga na hora
      if (closed) sub.remove();
      else subscription = sub;
    }

    startGps();

    // Ao sair da câmera, desliga o GPS
    return () => {
      closed = true;
      subscription?.remove();
    };
  }, [permission?.granted]);

  async function handleCapture() {
    if (isCapturing || isFull) return;
    setIsCapturing(true);
    try {
      const picture = await cameraRef.current?.takePictureAsync({
        quality: 0.8,
      });
      if (picture) {
        // Guarda horário e GPS do disparo antes de preparar a imagem
        const capturadaEm = new Date().toISOString();
        const localizacao = toPhotoLocation(lastReading.current);
        const uri = await prepareImage(picture.uri);
        setPhotos((prev) =>
          [...prev, { uri, capturadaEm, localizacao }].slice(0, MAX_PHOTOS),
        );
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

      // Fotos da galeria vão sem horário e sem localização
      const galleryPhotos: Photo[] = prepared.map((uri) => ({
        uri,
        capturadaEm: null,
        localizacao: null,
      }));
      setPhotos((prev) => [...prev, ...galleryPhotos].slice(0, MAX_PHOTOS));
    } catch {
      showAlert("Erro", "Não foi possível carregar as fotos.");
    }
  }

  function handleRemove(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit() {
    if (!isFull || isSubmitting) return;
    setIsSubmitting(true);
    try {
      // A splash fica pelo menos 1,5 s, mesmo que o envio seja rápido
      const [response] = await Promise.all([
        createAnalysis(photos),
        wait(1500),
      ]);

      // Fecha a câmera e volta para as abas já abertas
      router.dismissTo({
        pathname: "/historico",
        params: { aba: "andamento", enviadoEm: String(Date.now()) },
      });
      showAlert("Análise enviada", response.message);
    } catch (error: any) {
      // Em erro, as fotos continuam na tela para tentar de novo
      showAlert(
        "Erro",
        error?.response?.data?.message || "Não foi possível enviar as fotos.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
          <PhotoSlots
            photos={photos.map((photo) => photo.uri)}
            onRemove={handleRemove}
          />
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
            onPress={handleSubmit}
            disabled={!isFull || isSubmitting}
          >
            <Ionicons name="checkmark" size={26} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <LoadingOverlay visible={isSubmitting} />
    </View>
  );
}
