import type { ApiResponse, Perfil, ProfilePhoto } from '@/src/types/api';
import { Platform } from 'react-native';
import api from './api';

// A API identifica o usuário pelo token enviado
export async function getProfile() {
  const response = await api.get<ApiResponse<Perfil>>('/user/me');
  return response.data;
}

// Troca a foto de perfil (uma imagem, campo "photo", até 5 MB)
export async function updateProfilePhoto(uri: string) {
  const formData = new FormData();
  const name = 'foto-perfil.jpg';

  if (Platform.OS === 'web') {
    // No navegador o anexo precisa ser um arquivo (Blob) de verdade
    const blob = await (await fetch(uri)).blob();
    formData.append('photo', blob, name);
  } else {
    // No React Native o arquivo entra como { uri, name, type }
    formData.append('photo', { uri, name, type: 'image/jpeg' } as any);
  }

  const response = await api.put<ApiResponse<ProfilePhoto>>('/user/me/photo', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    timeout: 30000,
  });
  return response.data;
}