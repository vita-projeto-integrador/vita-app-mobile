import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import type { ClassificationClass } from "@/src/types/api";
import {
  CLASSE_OPTIONS,
  PERIOD_OPTIONS,
  STATUS_OPTIONS,
} from "@/src/utils/map";
import type { Period } from "@/src/utils/map";

interface ChipRowProps<T extends string> {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

// Uma linha de botões em que só um fica ativo
function ChipRow<T extends string>({
  options,
  value,
  onChange,
}: ChipRowProps<T>) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}
    >
      {options.map((option) => {
        const active = option.value === value;
        return (
          <TouchableOpacity
            key={option.label}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onChange(option.value)}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

interface MapFiltersProps {
  period: Period;
  status: string;
  classe: ClassificationClass | "";
  onChangePeriod: (value: Period) => void;
  onChangeStatus: (value: string) => void;
  onChangeClasse: (value: ClassificationClass | "") => void;
}

export function MapFilters(props: MapFiltersProps) {
  return (
    <>
      <ChipRow
        options={PERIOD_OPTIONS}
        value={props.period}
        onChange={props.onChangePeriod}
      />
      <ChipRow
        options={STATUS_OPTIONS}
        value={props.status}
        onChange={props.onChangeStatus}
      />
      <ChipRow
        options={CLASSE_OPTIONS}
        value={props.classe}
        onChange={props.onChangeClasse}
      />
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  chipActive: {
    backgroundColor: "#F5A623",
    borderColor: "#F5A623",
  },
  chipText: {
    fontSize: 13,
    color: "#475569",
  },
  chipTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
