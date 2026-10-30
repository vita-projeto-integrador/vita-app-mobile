import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MONTHS, WEEKDAYS, getDaysOfMonth } from "@/src/utils/date";

const DAY_WIDTH = 48;
const DAY_GAP = 8;

interface DayPickerProps {
  selectedDate: Date;
  onChange: (date: Date) => void;
}

export function DayPicker({ selectedDate, onChange }: DayPickerProps) {
  const scrollRef = useRef<ScrollView>(null);

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();
  const days = getDaysOfMonth(year, month);

  // As setas trocam o mês e selecionam o dia 1
  function changeMonth(offset: number) {
    onChange(new Date(year, month + offset, 1));
  }

  // Rola a faixa até o dia selecionado
  useEffect(() => {
    const x = (selectedDate.getDate() - 1) * (DAY_WIDTH + DAY_GAP);
    scrollRef.current?.scrollTo({ x: Math.max(0, x - 80), animated: true });
  }, [selectedDate]);

  return (
    <View>
      <View style={styles.monthRow}>
        <TouchableOpacity onPress={() => changeMonth(-1)} hitSlop={12}>
          <Ionicons name="chevron-back" size={20} color="#1E293B" />
        </TouchableOpacity>
        <Text style={styles.monthText}>
          {MONTHS[month]} de {year}
        </Text>
        <TouchableOpacity onPress={() => changeMonth(1)} hitSlop={12}>
          <Ionicons name="chevron-forward" size={20} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.daysContent}
      >
        {days.map((day) => {
          const selected = day.getDate() === selectedDate.getDate();

          return (
            <TouchableOpacity
              key={day.getDate()}
              style={[styles.day, selected && styles.daySelected]}
              onPress={() => onChange(day)}
              activeOpacity={0.7}
            >
              <Text style={styles.weekday}>{WEEKDAYS[day.getDay()]}</Text>
              <Text
                style={[styles.dayNumber, selected && styles.dayNumberSelected]}
              >
                {day.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  monthRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  monthText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  daysContent: {
    paddingHorizontal: 16,
    gap: DAY_GAP,
  },
  day: {
    width: DAY_WIDTH,
    alignItems: "center",
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: "transparent",
  },
  daySelected: {
    borderColor: "#F5A623",
  },
  weekday: {
    fontSize: 12,
    color: "#64748B",
  },
  dayNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
  },
  dayNumberSelected: {
    color: "#D9720C",
  },
});
