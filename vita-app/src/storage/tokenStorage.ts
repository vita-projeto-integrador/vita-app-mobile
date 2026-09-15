import AsyncStorage from "@react-native-async-storage/async-storage";

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

const USER_KEY = "@vita:user";

interface StoredUser {
  id: string;
  name: string;
  email: string;
}

export async function saveUser(user: StoredUser) {
  await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
}

export async function getUser(): Promise<StoredUser | null> {
  const data = await AsyncStorage.getItem(USER_KEY);
  return data ? JSON.parse(data) : null;
}

export async function removeUser() {
  await AsyncStorage.removeItem(USER_KEY);
}
