import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const TOTAL_SLOTS = 4;

interface PhotoSlotsProps {
  photos: string[];
  onRemove: (index: number) => void;
}

export function PhotoSlots({ photos, onRemove }: PhotoSlotsProps) {
  const progress = (photos.length / TOTAL_SLOTS) * 100;

  return (
    <View>
      <View style={styles.row}>
        {Array.from({ length: TOTAL_SLOTS }).map((_, index) => {
          const uri = photos[index];

          return (
            <View key={index} style={styles.slot}>
              {uri ? (
                <>
                  <Image source={{ uri }} style={styles.photo} />
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => onRemove(index)}
                    hitSlop={8}
                  >
                    <Ionicons name="close" size={14} color="#FFFFFF" />
                  </TouchableOpacity>
                </>
              ) : (
                <View style={styles.empty}>
                  <Ionicons name="image-outline" size={26} color="#94A3B8" />
                </View>
              )}
            </View>
          );
        })}
      </View>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${progress}%` }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 8,
  },
  slot: {
    flex: 1,
    aspectRatio: 1,
  },
  photo: {
    flex: 1,
    borderRadius: 14,
  },
  empty: {
    flex: 1,
    borderRadius: 14,
    backgroundColor: "#E2E8F0",
    alignItems: "center",
    justifyContent: "center",
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
    backgroundColor: "#64748B",
  },
});
