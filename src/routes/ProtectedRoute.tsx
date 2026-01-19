import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div>Проверка авторизации...</div>;

  if (!isAuthenticated) {
    // Перенаправляем на /login, сохраняя текущий URL для возврата
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; // Рендерит дочерние маршруты (например, Dashboard)
};

export default ProtectedRoute;
