import { Alert, Platform } from "react-native";

// No react-native-web, Alert.alert é uma função vazia (não exibe nada).
// Na web usamos window.alert para que as mensagens apareçam.
export function showAlert(title: string, message?: string) {
  if (Platform.OS === "web") {
    window.alert(message ? `${title}\n\n${message}` : title);
    return;
  }
  Alert.alert(title, message);
}
