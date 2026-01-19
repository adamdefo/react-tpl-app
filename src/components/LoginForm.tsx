import './../styles/login-form.css';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { type LoginCredentials } from '../types/auth';
import { AuthService } from '../services/auth';
// import { toast } from 'react-toastify';

const LoginForm = () => {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    document.title = 'Вход в систему';
  }, []);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!credentials.username) newErrors.username = 'Введите логин';
    if (!credentials.password) newErrors.password = 'Введите пароль';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return
    setIsLoading(true);

    try {
      await AuthService.login(credentials);
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
      // toast.success('Успешный вход!');
    } catch (err) {
      // toast.error(err.message || 'Ошибка входа');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="login-form__header">
        <h2>Вход в систему</h2>
        <div>Введите ваши учетные данные для доступа</div> 
      </div>

      {/* Поля ввода */}
      <div className="input-group">
        <label>
          Логин
          {errors.username && <span className="error">{errors.username}</span>}
        </label>
        <input
          type="text"
          value={credentials.username}
          onChange={(e) => setCredentials(prev => ({
            ...prev,
            username: e.target.value
          }))}
          autoComplete="username"
        />
      </div>

      <div className="input-group">
        <label>
          Пароль
          {errors.password && <span className="error">{errors.password}</span>}
        </label>
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials(prev => ({
            ...prev,
            password: e.target.value
          }))}
          autoComplete="current-password"
        />
      </div>

      {/* Кнопка */}
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Вход...' : 'Войти'}
      </button>

      {/* Ссылки */}
      <div className="links">
        <a href="/reset-password">Забыли пароль?</a>
        <br />
        <a href="/registration">Зарегистрироваться</a>
      </div>
    </form>
  );
};

export default LoginForm;
