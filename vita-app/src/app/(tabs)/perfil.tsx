import { InfoRow } from "@/src/components/InfoRow";
import { useAuth } from "@/src/hooks/useAuth";
import { getProfile, updateProfilePhoto } from "@/src/services/userService";
import { styles } from "@/src/styles/perfil.styles";
import type { Perfil, UserProfile } from "@/src/types/api";
import { showAlert } from "@/src/utils/alert";
import { getErrorMessage } from "@/src/utils/apiError";
import { prepareImage } from "@/src/utils/image";
import {
  formatCNPJ,
  formatPhone,
  fromISODate,
} from "@/src/validation/authSchemas";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// Rótulo do perfil ("outro" vem, por exemplo, de contas antigas criadas pelo Web)
const PROFILE_LABELS: Record<UserProfile, string> = {
  produtor: "Produtor",
  estudante: "Estudante",
  outro: "Outro",
};

// Foto de perfil aparece pequena: 512 px já sobra
const PROFILE_PHOTO_WIDTH = 512;

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function PerfilScreen() {
  const { signOut } = useAuth();
  const [profile, setProfile] = useState<Perfil | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (err) {
        setError(getErrorMessage(err, "Não foi possível carregar seus dados."));
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

    async function handleChangePhoto() {
    if (uploadingPhoto) return;
    try {
      // Seletor de fotos do sistema: não pede permissão de galeria
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true, // recorte quadrado antes de confirmar
        aspect: [1, 1],
      });
      if (result.canceled) return;

      setUploadingPhoto(true);
      const uri = await prepareImage(result.assets[0].uri, PROFILE_PHOTO_WIDTH);
      const response = await updateProfilePhoto(uri);

      // A API devolve a URL assinada da foto nova: troca só esse campo
      setProfile((prev) =>
        prev ? { ...prev, foto_perfil: response.data.foto_perfil } : prev,
      );
    } catch (err) {
      showAlert(
        "Erro",
        getErrorMessage(err, "Não foi possível atualizar a foto de perfil."),
      );
    } finally {
      setUploadingPhoto(false);
    }
  }

  async function handleSignOut() {
    await signOut();
    router.replace("/login");
  }

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#F5A623" />
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  const isProdutor = profile.perfil === "produtor";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
                <TouchableOpacity
          style={styles.avatarButton}
          onPress={handleChangePhoto}
          disabled={uploadingPhoto}
          activeOpacity={0.8}
          accessibilityLabel="Alterar foto de perfil"
        >
          <View style={styles.avatar}>
            {profile.foto_perfil ? (
              <Image
                source={{ uri: profile.foto_perfil }}
                style={styles.avatarImage}
              />
            ) : (
              <Text style={styles.avatarText}>{getInitials(profile.nome)}</Text>
            )}

            {uploadingPhoto && (
              <View style={styles.avatarLoading}>
                <ActivityIndicator color="#FFFFFF" />
              </View>
            )}
          </View>

          <View style={styles.avatarEdit}>
            <Ionicons name="camera" size={14} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
        <Text style={styles.name}>{profile.nome}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{PROFILE_LABELS[profile.perfil]}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Informações pessoais</Text>
        <View style={styles.card}>
          <InfoRow icon="mail-outline" label="Email" value={profile.email} />
          <InfoRow
            icon="call-outline"
            label="Telefone"
            value={profile.telefone && formatPhone(profile.telefone)}
          />
          <InfoRow
            icon="calendar-outline"
            label="Data de nascimento"
            value={
              profile.data_nascimento && fromISODate(profile.data_nascimento)
            }
          />
          <InfoRow
            icon="location-outline"
            label="Endereço"
            value={profile.endereco}
          />
        </View>

        <Text style={styles.sectionTitle}>
          {isProdutor ? "Dados do produtor" : "Dados acadêmicos"}
        </Text>
        <View style={styles.card}>
          {isProdutor ? (
            <InfoRow
              icon="business-outline"
              label="CNPJ"
              value={profile.cnpj && formatCNPJ(profile.cnpj)}
            />
          ) : (
            <>
              <InfoRow
                icon="school-outline"
                label="Faculdade"
                value={profile.faculdade}
              />
              <InfoRow
                icon="book-outline"
                label="Curso"
                value={profile.curso}
              />
            </>
          )}
          <InfoRow
            icon="time-outline"
            label="Membro desde"
            value={fromISODate(profile.criado_em)}
          />
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
