import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "@/src/hooks/useAuth";
import { InfoRow } from "@/src/components/InfoRow";
import { getProfile, UserProfile } from "@/src/services/userService";
import {
  formatCNPJ,
  formatPhone,
  fromISODate,
} from "@/src/validation/authSchemas";
import { styles } from "@/src/styles/perfil.styles";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function PerfilScreen() {
  const { signOut } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (err: any) {
        setError(
          err?.response?.data?.message ||
            "Não foi possível carregar seus dados.",
        );
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

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

  const isProdutor = profile.tipo_acesso === "produtor";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{getInitials(profile.nome)}</Text>
        </View>
        <Text style={styles.name}>{profile.nome}</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {isProdutor ? "Produtor" : "Estudante"}
          </Text>
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
              <InfoRow icon="book-outline" label="Curso" value={profile.curso} />
            </>
          )}
          <InfoRow
            icon="time-outline"
            label="Membro desde"
            value={fromISODate(profile.createdAt)}
          />
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Text style={styles.signOutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
