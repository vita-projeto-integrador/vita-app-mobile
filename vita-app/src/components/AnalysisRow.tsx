import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getImageUrl } from "@/src/services/analysisService";
import type { AnalysisListItem } from "@/src/services/analysisService";
import {
  STATUS_LABELS,
  getBadgeLabel,
  isBlackSpot,
  isInProgress,
} from "@/src/utils/analysis";
import { formatTime } from "@/src/utils/date";

type BadgeVariant = "red" | "green" | "gray" | "amber";

// Decide o texto e a cor do badge de resultado
function getBadge(item: AnalysisListItem): {
  label: string;
  variant: BadgeVariant;
} {
  if (item.status === "cancelada") {
    return { label: STATUS_LABELS.cancelada, variant: "gray" };
  }
  if (isInProgress(item.status)) {
    return { label: STATUS_LABELS[item.status], variant: "amber" };
  }
  if (item.classificacao) {
    const { classe } = item.classificacao;
    return {
      label: getBadgeLabel(classe),
      variant: isBlackSpot(classe) ? "red" : "green",
    };
  }
  return { label: STATUS_LABELS[item.status], variant: "gray" };
}

interface AnalysisRowProps {
  item: AnalysisListItem;
  onPress: () => void;
}

export function AnalysisRow({ item, onPress }: AnalysisRowProps) {
  const badge = getBadge(item);

  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.idColumn}>
        <View style={styles.idChip}>
          <Text style={styles.idText}>{item.id.slice(0, 4)}</Text>
        </View>
      </View>

      <View style={styles.timeColumn}>
        <Text style={styles.timeText}>Enviado às</Text>
        <Text style={styles.timeText}>{formatTime(item.createdAt)}</Text>
      </View>

      <View style={styles.resultColumn}>
        <View style={[styles.badge, badgeStyles[badge.variant].container]}>
          <Text style={[styles.badgeText, badgeStyles[badge.variant].text]}>
            {badge.label}
          </Text>
        </View>
      </View>

      <View style={styles.imageColumn}>
        {item.thumbnail ? (
          <Image
            source={{ uri: getImageUrl(item.thumbnail) }}
            style={styles.thumbnail}
          />
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

// Cores de cada tipo de badge
const badgeStyles = {
  red: {
    container: { backgroundColor: "#FEE2E2" },
    text: { color: "#DC2626" },
  },
  green: {
    container: { backgroundColor: "#DCFCE7" },
    text: { color: "#16A34A" },
  },
  gray: {
    container: { backgroundColor: "#E2E8F0" },
    text: { color: "#475569" },
  },
  amber: {
    container: { backgroundColor: "#FEF3C7" },
    text: { color: "#B45309" },
  },
};
