import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';


const Header = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <header
      style={{
        backgroundColor: '#007bff',
        color: 'white',
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <div style={{ fontSize: '20px', fontWeight: 'bold' }}>
        DOKA
      </div>
      {isAuthenticated ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span>Привет, {user?.username || 'Пользователь'}!</span>
          <Link
            to="/logout"
            style={{
              color: 'white',
              textDecoration: 'underline',
              cursor: 'pointer'
            }}
          >
            Выход
          </Link>
        </div>
      ) : (
        <Link to="/login" style={{ color: 'white' }}>
          Войти
        </Link>
      )}
    </header>
  );
};

export default Header;
