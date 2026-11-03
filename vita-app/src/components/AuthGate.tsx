import { Redirect } from "expo-router";
import type { ReactNode } from "react";
import { useAuth } from "@/src/hooks/useAuth";

// Controle de acesso às rotas.
// Funciona em qualquer entrada: splash, link direto ou recarregar a página
// no navegador (onde a URL atual é mantida e a splash não roda).

interface AuthGateProps {
  children: ReactNode;
}

// Só renderiza para usuário logado; senão manda para o login.
export function RequireAuth({ children }: AuthGateProps) {
  const { isAuthenticated, isLoading } = useAuth();

  // Ainda lendo a sessão salva: não decide nada para não piscar o login
  if (isLoading) return null;
  if (!isAuthenticated) return <Redirect href="/login" />;

  return children;
}

// Só renderiza para quem NÃO está logado; senão manda para a Home.
export function GuestOnly({ children }: AuthGateProps) {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return null;
  if (isAuthenticated) return <Redirect href="/(tabs)" />;

  return children;
}
