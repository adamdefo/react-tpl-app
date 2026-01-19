import { Link } from 'react-router-dom';
import { AuthService } from '../services/auth';

const Dashboard = () => (
  <div>
    <h1>Добро пожаловать в панель управления!</h1>
    <p>Вы авторизованы.</p>
    <button
      onClick={() => {
        AuthService.logout();
        window.location.href = '/login'; // Перезагрузка для сброса состояния
      }}
    >
      Выйти
    </button>
    <Link to="/">На главную</Link>
  </div>
);

export default Dashboard;
