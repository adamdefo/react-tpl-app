import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      backgroundColor: '#f5f5f5',
      padding: '20px'
    }}>
      <h1 style={{ color: '#333', fontSize: '48px', marginBottom: '10px' }}>
        404
      </h1>
      <p style={{ color: '#666', fontSize: '18px', marginBottom: '20px' }}>
        Страница не найдена
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          backgroundColor: '#007bff',
          color: 'white',
          textDecoration: 'none',
          borderRadius: '4px',
          fontWeight: '500'
        }}
      >
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound;
