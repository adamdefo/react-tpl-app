import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/Main';
import RegistrationPage from '../pages/RegistrationPage';
import LoginForm from '../components/LoginForm';
import Dashboard from '../pages/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import NotFound from '../pages/NotFound';
import Layout from '../components/Layout';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginForm />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Route>
    <Route path="/" element={<MainPage />} />
    <Route path="/registration" element={<RegistrationPage />} />

    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;
