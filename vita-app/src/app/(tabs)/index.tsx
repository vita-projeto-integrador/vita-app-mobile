import { AnimatedIconButton } from "@/src/components/AnimatedIconButton";
import { RecentAnalyses } from "@/src/components/RecentAnalyses";
import { useAuth } from "@/src/hooks/useAuth";
import {
  getAnalyses,
  getRecentAnalyses,
} from "@/src/services/analysisService";
import { styles } from "@/src/styles/home.styles";
import type { AnalysisListItem } from "@/src/types/api";
import { showAlert } from "@/src/utils/alert";
import {
  FAILED_NOTICE,
  IN_PROGRESS_NOTICE,
  isBlackSpot,
} from "@/src/utils/analysis";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  Image,
  RefreshControl,
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

const RECENT_LIMIT = 6; // cartões na seção "Últimas análises"

function showComingSoon(feature: string) {
  showAlert("Em breve", `${feature} ainda está em desenvolvimento.`);
}

// Primeiro e último instante do mês atual (no fuso do aparelho)
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
  const navigation = useNavigation();
  const userName = user?.nome ? user.nome.split(" ")[0] : "User";

  // null = ainda carregando (mostra "-")
  const [photosThisMonth, setPhotosThisMonth] = useState<number | null>(null);
  const [blackSpotsThisMonth, setBlackSpotsThisMonth] = useState<number | null>(
    null,
  );
  // null = ainda carregando (mostra cartões cinza)
  const [recent, setRecent] = useState<AnalysisListItem[] | null>(null);
  const [recentError, setRecentError] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadStats = useCallback(async () => {
    try {
      const { from, to } = getMonthRange();
      // A API já filtra pelo período. Limite de 100 por página: acima disso
      // os cartões contam só as 100 mais recentes (até existir a rota de estatísticas)
      const response = await getAnalyses(from.toISOString(), to.toISOString());
      const thisMonth = response.data.items;

      setPhotosThisMonth(
        thisMonth.reduce((total, item) => total + item.total_imagens, 0),
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
  }, []);

  const loadRecent = useCallback(async () => {
    try {
      const response = await getRecentAnalyses(RECENT_LIMIT);
      setRecent(response.data.items);
      setRecentError(false);
    } catch {
      // Mantém os cartões que já estavam na tela; sem nenhum, mostra o aviso
      setRecentError(true);
    }
  }, []);

  // As duas buscas são independentes: uma falhar não impede a outra
  const loadHome = useCallback(async () => {
    await Promise.all([loadStats(), loadRecent()]);
  }, [loadStats, loadRecent]);

  // Recarrega sempre que a home volta a ficar em foco
  // (também renova as URLs assinadas das fotos)
  useFocusEffect(
    useCallback(() => {
      loadHome();
    }, [loadHome]),
  );

  // Tocar na aba Home quando já está nela também atualiza
  useEffect(() => {
    const unsubscribe = (navigation as any).addListener("tabPress", () => {
      loadHome();
    });
    return unsubscribe;
  }, [navigation, loadHome]);

  async function handleRefresh() {
    setRefreshing(true);
    await loadHome();
    setRefreshing(false);
  }

  // Mesmo comportamento do histórico: só a finalizada abre os detalhes
  function handlePressRecent(item: AnalysisListItem) {
    if (item.status === "finalizada") {
      router.push(`/analise/${item.id}`);
      return;
    }
    const notice =
      item.status === "falhou" ? FAILED_NOTICE : IN_PROGRESS_NOTICE;
    showAlert(notice.title, notice.message);
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={handleRefresh}
          colors={["#F5A623"]}
          tintColor="#F5A623"
        />
      }
    >
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.greeting}>Olá, {userName}!</Text>
          <View style={styles.headerIcons}>
            <AnimatedIconButton
              animation="shake"
              onPress={() => showComingSoon("As notificações")}
            >
              <Image
                source={require("@/assets/images/icons/bell.png")}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </AnimatedIconButton>
            <AnimatedIconButton
              animation="spin"
              style={styles.avatar}
              onPress={() => showComingSoon("As ferramentas")}
            >
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
            <Text style={styles.statLabel}>
              Pintas pretas detectadas este mês
            </Text>
          </View>
        </View>

        <Text
          style={styles.metricsLink}
          onPress={() => showComingSoon("As métricas detalhadas")}
        >
          Ver mais métricas
        </Text>

        <RecentAnalyses
          items={recent}
          error={recentError}
          onPressItem={handlePressRecent}
          onSeeAll={() => router.navigate("/historico")}
        />

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
          onPress={() => showComingSoon("O mapa")}
        >
          <Text style={styles.actionButtonText}>Mapa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
