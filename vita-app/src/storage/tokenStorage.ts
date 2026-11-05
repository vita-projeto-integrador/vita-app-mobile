import AsyncStorage from "@react-native-async-storage/async-storage";
import type { Usuario } from "@/src/types/api";

const TOKEN_KEY = "@vita:token";

export async function saveToken(token: string) {
  await AsyncStorage.setItem(TOKEN_KEY, token);
}

export async function getToken() {
  return await AsyncStorage.getItem(TOKEN_KEY);
}

export async function removeToken() {
  await AsyncStorage.removeItem(TOKEN_KEY);
}

// v2: o usuário passou a ser { id, nome, email, perfil } (contrato da API TS).
// Quem tinha o formato antigo ({ name }) não encontra esta chave e entra de novo.
const USER_KEY = "@vita:user:v2";
const LEGACY_USER_KEY = "@vita:user";

export type StoredUser = Usuario;

export async function saveUser(user: StoredUser) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getUser(): Promise<StoredUser | null> {
  const data = await AsyncStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export async function removeUser() {
  await AsyncStorage.multiRemove([USER_KEY, LEGACY_USER_KEY]);
}
