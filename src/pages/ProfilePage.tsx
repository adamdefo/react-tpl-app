import { useState, useEffect } from 'react';
import { userService } from '../services/userService';
import { useAuth } from './../contexts/AuthContext';
import type { User} from './../types/auth';

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      userService.getCurrentUser()
        .then(setUser)
        .catch((error) => console.error('Ошибка загрузки профиля:', error));
    }
  }, [isAuthenticated]);

  
  if (!user) return <div>Загрузка...</div>;

  return (
    <div>
      <h1>Профиль пользователя</h1>
      <p>Имя: {user.username}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default ProfilePage;
