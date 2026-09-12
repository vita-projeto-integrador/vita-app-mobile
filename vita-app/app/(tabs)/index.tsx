import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { getUser } from "@/src/storage/tokenStorage";
import { styles } from "./index.styles";

const tarefasPendentes = [
  { id: "1", texto: "Aplicar defensivo agrícola", cor: "#E53935" },
  { id: "2", texto: "Aplicar defensivo agrícola", cor: "#F5A623" },
  { id: "3", texto: "Fazer análise por imagem", cor: "#43A047" },
  { id: "4", texto: "Fazer análise por imagem", cor: "#43A047" },
];

export default function HomeScreen() {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    async function loadUser() {
      const user = await getUser();
      if (user?.name) {
        const primeiroNome = user.name.split(" ")[0];
        setUserName(primeiroNome);
      }
    }
    loadUser();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.greeting}>Olá, {userName}!</Text>
          <View style={styles.headerIcons}>
            <Image
              source={require("@/assets/images/icons/bell.png")}
              style={{ width: 24, height: 24 }}
              resizeMode="contain"
            />
            <View style={styles.avatar}>
              <Image
                source={require("@/assets/images/icons/tab-perfil.png")}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="O que precisa hoje?"
            placeholderTextColor="#999999"
          />
          <TouchableOpacity style={styles.searchIconCircle}>
            <Image
              source={require("@/assets/images/icons/search-button.png")}
              style={{ width: 14, height: 14 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.statsRow}>
          <View style={[styles.statCard, styles.statCardLight]}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Fotos analisadas hoje</Text>
          </View>
          <View style={[styles.statCard, styles.statCardDark]}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>
              Nova confirmação de contaminação
            </Text>
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
              <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
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
        >
          <Text style={styles.actionButtonText}>Mapa</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
