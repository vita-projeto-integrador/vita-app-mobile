import { Alert } from "react-native";

export type AlertData = {
  title: string;
  message?: string;
};

type Listener = (data: AlertData) => void;

let listener: Listener | null = null;

// Chamado pelo AlertHost ao montar (e com null ao desmontar)
export function registerAlertListener(fn: Listener | null) {
  listener = fn;
}

export function showAlert(title: string, message?: string) {
  if (listener) {
    listener({ title, message });
    return;
  }
  // Plano B: se a caixa ainda não estiver montada
  Alert.alert(title, message);
}
