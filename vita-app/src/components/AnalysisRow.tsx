import type { AnalysisListItem } from "@/src/types/api";
import { BADGE_COLORS, getAnalysisBadge } from "@/src/utils/analysis";
import { formatTime } from "@/src/utils/date";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AnalysisRowProps {
  item: AnalysisListItem;
  onPress: () => void;
}

export function AnalysisRow({ item, onPress }: AnalysisRowProps) {
  const badge = getAnalysisBadge(item);

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.idColumn}>
        <View style={styles.idChip}>
          <Text style={styles.idText}>{item.id.slice(0, 4)}</Text>
        </View>
      </View>

      <View style={styles.timeColumn}>
        <Text style={styles.timeText}>Enviado às</Text>
        <Text style={styles.timeText}>{formatTime(item.criado_em)}</Text>
      </View>

            <View style={styles.resultColumn}>
        <View style={[styles.badge, BADGE_COLORS[badge.variant].container]}>
          <Text style={[styles.badgeText, BADGE_COLORS[badge.variant].text]}>
            {badge.label}
          </Text>
        </View>
      </View>

      <View style={styles.imageColumn}>
        {/* miniatura já vem como URL assinada (vale por tempo limitado) */}
        {item.miniatura ? (
          <Image source={{ uri: item.miniatura }} style={styles.thumbnail} />
        ) : (
          <View style={[styles.thumbnail, styles.thumbnailEmpty]}>
            <Ionicons name="images-outline" size={22} color="#94A3B8" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  idColumn: {
    width: 56,
    alignItems: "center",
  },
  idChip: {
    backgroundColor: "#E2E8F0",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  idText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
  },
  timeColumn: {
    flex: 1,
    alignItems: "center",
  },
  timeText: {
    fontSize: 12,
    color: "#64748B",
  },
  resultColumn: {
    width: 104,
    alignItems: "center",
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  imageColumn: {
    width: 64,
    alignItems: "flex-end",
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
  thumbnailEmpty: {
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
});
