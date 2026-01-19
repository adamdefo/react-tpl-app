export interface LoginCredentials {
  username: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
  expiresIn?: number; // Время жизни токена в секундах
  refreshToken?: any;
}
