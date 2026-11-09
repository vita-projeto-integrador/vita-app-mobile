import type { AnalysisListItem } from "@/src/types/api";
import { BADGE_COLORS, getAnalysisBadge } from "@/src/utils/analysis";
import { formatDate, formatTime } from "@/src/utils/date";
import { Ionicons } from "@expo/vector-icons";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const PLACEHOLDERS = 3; // cartões cinza enquanto carrega

interface RecentAnalysesProps {
  items: AnalysisListItem[] | null; // null = carregando
  error: boolean;
  onPressItem: (item: AnalysisListItem) => void;
  onSeeAll: () => void;
}

// Seção "Últimas análises" da home: só exibe, quem busca os dados é a tela
export function RecentAnalyses({
  items,
  error,
  onPressItem,
  onSeeAll,
}: RecentAnalysesProps) {
  return (
    <View style={styles.section}>
      <View style={styles.header}>
        <Text style={styles.title}>Últimas análises</Text>
        {!!items?.length && (
          <Text style={styles.seeAll} onPress={onSeeAll}>
            Ver todas
          </Text>
        )}
      </View>

      {error && !items ? (
        <View style={styles.emptyCard}>
          <Ionicons name="cloud-offline-outline" size={28} color="#94A3B8" />
          <Text style={styles.emptyText}>
            Não foi possível carregar. Puxe a tela para tentar de novo.
          </Text>
        </View>
      ) : items && items.length === 0 ? (
        <View style={styles.emptyCard}>
          <Ionicons name="leaf-outline" size={28} color="#94A3B8" />
          <Text style={styles.emptyText}>
            Nenhuma análise ainda. Toque na câmera para enviar as primeiras
            fotos.
          </Text>
        </View>
      ) : (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.list}
        >
          {items
            ? items.map((item) => (
                <RecentCard
                  key={item.id}
                  item={item}
                  onPress={() => onPressItem(item)}
                />
              ))
            : Array.from({ length: PLACEHOLDERS }, (_, index) => (
                <View key={index} style={[styles.card, styles.placeholder]} />
              ))}
        </ScrollView>
      )}
    </View>
  );
}

function RecentCard({
  item,
  onPress,
}: {
  item: AnalysisListItem;
  onPress: () => void;
}) {
  const badge = getAnalysisBadge(item);
  const colors = BADGE_COLORS[badge.variant];

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      {/* miniatura = URL assinada da primeira foto da análise */}
      {item.miniatura ? (
        <Image source={{ uri: item.miniatura }} style={styles.photo} />
      ) : (
        <View style={[styles.photo, styles.photoEmpty]}>
          <Ionicons name="image-outline" size={28} color="#94A3B8" />
        </View>
      )}

      <View style={[styles.badge, colors.container]}>
        <Text style={[styles.badgeText, colors.text]}>{badge.label}</Text>
      </View>

      {item.total_imagens > 1 && (
        <View style={styles.counter}>
          <Ionicons name="images" size={11} color="#FFFFFF" />
          <Text style={styles.counterText}>{item.total_imagens}</Text>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.date}>{formatDate(item.criado_em).slice(0, 5)}</Text>
        <Text style={styles.time}>{formatTime(item.criado_em)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const CARD_WIDTH = 132;

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    color: "#334155",
  },
  seeAll: {
    color: "#DB7608",
    fontSize: 14,
  },
  // padding vertical para a sombra não ser cortada pelo ScrollView
  list: {
    gap: 12,
    paddingVertical: 4,
    paddingRight: 4,
  },
  card: {
    width: CARD_WIDTH,
    height: 168,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    overflow: "hidden",
    elevation: 3,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  placeholder: {
    backgroundColor: "#E2E8F0",
    elevation: 0,
    shadowOpacity: 0,
  },
  photo: {
    width: CARD_WIDTH,
    height: 124,
  },
  photoEmpty: {
    backgroundColor: "#F1F5F9",
    alignItems: "center",
    justifyContent: "center",
  },
  badge: {
    position: "absolute",
    top: 8,
    left: 8,
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  counter: {
    position: "absolute",
    top: 8,
    right: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  counterText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "600",
  },
  footer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  date: {
    fontSize: 13,
    fontWeight: "600",
    color: "#1E293B",
  },
  time: {
    fontSize: 12,
    color: "#64748B",
  },
  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    gap: 8,
  },
  emptyText: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
  },
});