import { AnimatedIconButton } from "@/src/components/AnimatedIconButton";
import { useAuth } from "@/src/hooks/useAuth";
import { getAnalyses } from "@/src/services/analysisService";
import { styles } from "@/src/styles/home.styles";
import { isBlackSpot } from "@/src/utils/analysis";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const tarefasPendentes = [
  { id: "1", texto: "Aplicar defensivo agrícola", cor: "#E53935" },
  { id: "2", texto: "Aplicar defensivo agrícola", cor: "#F4511E" },
  { id: "3", texto: "Fazer análise por imagem", cor: "#1E7E34" },
  { id: "4", texto: "Fazer análise por imagem", cor: "#1E7E34" },
];

// Primeiro e último instante do mês atual (no fuso do celular)
function getMonthRange() {
  const now = new Date();
  const from = new Date(now.getFullYear(), now.getMonth(), 1);
  const to = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    0,
    23,
    59,
    59,
    999,
  );
  return { from, to };
}

export default function HomeScreen() {
  const { user } = useAuth();
  const userName = user?.name ? user.name.split(" ")[0] : "User";

  // null = ainda carregando (mostra "-")
  const [photosThisMonth, setPhotosThisMonth] = useState<number | null>(null);
  const [blackSpotsThisMonth, setBlackSpotsThisMonth] = useState<
    number | null
  >(null);

  // Recarrega os números sempre que a home volta a ficar em foco
  useFocusEffect(
    useCallback(() => {
      let active = true;

      async function loadStats() {
        try {
          const { from, to } = getMonthRange();
          const response = await getAnalyses(
            from.toISOString(),
            to.toISOString(),
          );
          const list = Array.isArray(response.data) ? response.data : [];

          // O filtro também é feito aqui porque o back-end ainda pode
          // ignorar from/to e devolver análises de outros meses
          const thisMonth = list.filter((item) => {
            const date = new Date(item.createdAt);
            return date >= from && date <= to;
          });

          if (!active) return;

          setPhotosThisMonth(
            thisMonth.reduce((total, item) => total + item.imagesCount, 0),
          );
          setBlackSpotsThisMonth(
            thisMonth.filter(
              (item) =>
                item.status === "finalizada" &&
                item.classificacao !== null &&
                isBlackSpot(item.classificacao.classe),
            ).length,
          );
        } catch {
          // Se falhar, os cartões continuam como estavam
        }
      }

      loadStats();
      return () => {
        active = false;
      };
    }, []),
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.greeting}>Olá, {userName}!</Text>
          <View style={styles.headerIcons}>
            <AnimatedIconButton animation="shake">
              <Image
                source={require("@/assets/images/icons/bell.png")}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </AnimatedIconButton>
            <AnimatedIconButton animation="spin" style={styles.avatar}>
              <Ionicons name="build" size={18} color="#F5A623" />
            </AnimatedIconButton>
          </View>
        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.searchInput}
              placeholder="O que precisa para hoje?"
              placeholderTextColor="#64748B"
            />
          </View>
          <TouchableOpacity style={styles.searchIconCircle}>
            <Image
              source={require("@/assets/images/icons/search-button.png")}
              style={{ width: 36, height: 36 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.statCardLight]}>
            <Text style={styles.statNumber}>{photosThisMonth ?? "-"}</Text>
            <Text style={styles.statLabel}>Fotos enviadas este mês</Text>
          </View>
          <View style={[styles.statCard, styles.statCardDark]}>
            <Text style={styles.statNumber}>{blackSpotsThisMonth ?? "-"}</Text>
            <Text style={styles.statLabel}>Pintas pretas detectadas este mês</Text>
          </View>
        </View>

        <Text style={styles.metricsLink}>Ver mais métricas</Text>

        <Text style={styles.sectionTitle}>Tarefas pendentes</Text>
        {tarefasPendentes.map((tarefa) => (
          <TouchableOpacity
            key={tarefa.id}
            style={styles.taskRow}
            activeOpacity={0.7}
          >
            <View style={[styles.taskDot, { backgroundColor: tarefa.cor }]} />
            <Text style={styles.taskText}>{tarefa.texto}</Text>
            <View style={styles.taskArrow}>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </View>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonPrimary]}
          onPress={() => router.navigate("/historico")}
        >
          <Text style={styles.actionButtonText}>Histórico de análises</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, styles.actionButtonSecondary]}
        >
          <Text style={styles.actionButtonText}>Mapa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}