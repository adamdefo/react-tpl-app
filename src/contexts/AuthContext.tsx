import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { AuthService } from '../services/auth';
import type { User } from '../types/auth';

// Тип для контекста авторизации
interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: { username: string; password: string }) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

// Создание контекста (начальное значение — undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Хук для использования контекста
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};

// Поставщик контекста
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Инициализация при загрузке
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = AuthService.getAccessToken();
        if (token) {
          // Здесь можно загрузить данные пользователя по токену
          // Например: const userData = await userService.getCurrentUser();
          setIsAuthenticated(true);
          // setUser(userData);
        }
      } catch (error) {
        console.error('Ошибка инициализации авторизации:', error);
      }
      setLoading(false);
    };

    initAuth();

    // Подписка на изменения состояния авторизации (например, при logout извне)
    const handleAuthChange = () => {
      setIsAuthenticated(AuthService.isAuthenticated());
      if (!AuthService.isAuthenticated()) setUser(null);
    };
    window.addEventListener('authStateChanged', handleAuthChange);

    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange);
    };
  }, []);

  // Метод входа
  const login = async (credentials: { username: string; password: string }) => {
    try {
      const data = await AuthService.login(credentials);
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      throw error; // Передаём ошибку в компонент для отображения
    }
  };

  // Метод выхода
  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
