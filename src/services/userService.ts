import { request } from './http';
import type { User } from './../types/auth'; // Предполагаем, что User определён в auth.ts


export const userService = {
  // Получение текущего пользователя
  getCurrentUser: async (): Promise<User> => {
    const response = await request.get<User>('users/me');
    return response.data;
  },

  // Обновление профиля
  updateProfile: async (data: Partial<User>): Promise<User> => {
    const response = await request.put<User>('users/me', data);
    return response.data;
  },

  // Получение списка пользователей (для админов)
  getUsers: async (): Promise<User[]> => {
    const response = await request.get<User[]>('users');
    return response.data;
  },
};
