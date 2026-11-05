import type { LocationObject } from "expo-location";

// Localização de uma foto, no formato do contrato da API
export interface PhotoLocation {
  latitude: number;
  longitude: number;
  precisao: number; // raio de erro em metros
}

// Leitura mais velha que isso não vale para a foto (o usuário pode ter andado)
const MAX_AGE_MS = 30_000;

// Converte a última leitura do GPS; devolve null se ela não servir
export function toPhotoLocation(
  reading: LocationObject | null,
): PhotoLocation | null {
  if (!reading || reading.coords.accuracy == null) return null;
  if (Date.now() - reading.timestamp > MAX_AGE_MS) return null;

  return {
    latitude: reading.coords.latitude,
    longitude: reading.coords.longitude,
    precisao: reading.coords.accuracy,
  };
}
