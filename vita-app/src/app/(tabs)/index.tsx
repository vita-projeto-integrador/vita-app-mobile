import { AnimatedIconButton } from "@/src/components/AnimatedIconButton";
import { useAuth } from "@/src/hooks/useAuth";
import { styles } from "@/src/styles/home.styles";
import { showAlert } from "@/src/utils/alert";
import { Ionicons } from "@expo/vector-icons";
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

function showComingSoon(feature: string) {
  showAlert("Em breve", `${feature} ainda está em desenvolvimento.`);
}

export default function HomeScreen() {
  const { user } = useAuth();
  const userName = user?.name ? user.name.split(" ")[0] : "User";

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
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
            <Text style={styles.statNumber}>121</Text>
            <Text style={styles.statLabel}>Fotos enviadas este mês</Text>
          </View>
          <View style={[styles.statCard, styles.statCardDark]}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>
              Nova confirmação de contaminação
            </Text>
          </View>
        </View>

        <Text
          style={styles.metricsLink}
          onPress={() => showComingSoon("As métricas detalhadas")}
        >
          Ver mais métricas
        </Text>

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