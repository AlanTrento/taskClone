import { Routes, Route, Navigate } from 'react-router-dom';
import { LoginPage } from '../../modules/auth/presentation/components/LoginPage';
import { RegisterPage } from '../../modules/auth/presentation/components/RegisterPage';
import { ProfilePage } from '../../modules/auth/presentation/components/ProfilePage';
import { AuthGuard } from '../../modules/auth/presentation/components/AuthGuard';
import App from '../../App';

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<AuthGuard><ProfilePage /></AuthGuard>} />
      <Route path="/" element={<AuthGuard><App /></AuthGuard>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
