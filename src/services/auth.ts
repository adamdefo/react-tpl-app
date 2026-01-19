import { request } from './http';
import type { User } from './../types/auth';

export class AuthService {
  private static accessTokenKey = 'access_token';
  private static refreshTokenKey = 'refresh_token';

  static getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  static getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  static setTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem(this.accessTokenKey, accessToken);
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  static clearTokens(): void {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  static isAuthenticated(): boolean {
    return !!this.getAccessToken();
  }

  // Вход
  static async login(credentials: { username: string; password: string }): Promise<{ token: string; refreshToken: string; user: User }> {
    const response = await request.post<{ token: string; refreshToken: string; user: User }>(
      'auth/login',
      credentials
    );
    this.setTokens(response.data.token, response.data.refreshToken);
    return response.data;
  }

  // Выход
  static async logout(): Promise<void> {
    try {
      await request.post('auth/logout', {});
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
    this.clearTokens();
    window.dispatchEvent(new Event('authStateChanged'));
  }
}
