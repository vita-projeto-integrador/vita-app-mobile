import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import type { AnalysisMapItem } from "@/src/types/api";
import { getPinColor } from "@/src/utils/map";

// Único arquivo do app que conhece a biblioteca de mapa.
// Para trocar de biblioteca no futuro, só este arquivo muda.

interface AnalysesMapProps {
  analyses: AnalysisMapItem[];
  onSelect: (item: AnalysisMapItem) => void;
}

// Região mostrada antes de carregar os pontos (Vale do Ribeira, SP)
const INITIAL_REGION = {
  latitude: -24.49,
  longitude: -47.84,
  latitudeDelta: 0.5,
  longitudeDelta: 0.5,
};

export function AnalysesMap({ analyses, onSelect }: AnalysesMapProps) {
  const mapRef = useRef<MapView>(null);

  // Enquadra todos os pontos sempre que a lista muda
  useEffect(() => {
    if (analyses.length === 0) return;
    mapRef.current?.fitToCoordinates(
      analyses.map((item) => ({
        latitude: item.latitude,
        longitude: item.longitude,
      })),
      {
        // Espaço para os filtros (em cima) e o cartão (embaixo)
        edgePadding: { top: 60, right: 60, bottom: 240, left: 60 },
        animated: true,
      },
    );
  }, [analyses]);

  return (
    <MapView
      ref={mapRef}
      style={StyleSheet.absoluteFill}
      initialRegion={INITIAL_REGION}
      mapType="hybrid" // satélite com nomes de estradas
      showsUserLocation // ponto azul do usuário, se a localização foi liberada
      toolbarEnabled={false}
    >
      {analyses.map((item) => (
        <Marker
          key={item.id}
          coordinate={{ latitude: item.latitude, longitude: item.longitude }}
          pinColor={getPinColor(item)}
          onPress={() => onSelect(item)}
        />
      ))}
    </MapView>
  );
}
