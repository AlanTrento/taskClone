import { useState, useEffect, useCallback, useRef } from 'react';
import type { User } from '../../domain/entities/User';
import { AuthViewModel } from '../viewmodels/AuthViewModel';
import { AuthContainer } from '../../application/di/Container';
import { RepositoryFactory } from '../../infrastructure/factories/RepositoryFactory';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const viewModelRef = useRef<AuthViewModel | null>(null);

  if (!viewModelRef.current) {
    viewModelRef.current = new AuthViewModel(
      AuthContainer.getLoginUseCase(),
      AuthContainer.getRegisterUseCase(),
      AuthContainer.getLogoutUseCase(),
      AuthContainer.getGetCurrentUserUseCase(),
      AuthContainer.getUpdateProfileUseCase(),
      AuthContainer.getChangePasswordUseCase(),
    );
  }

  useEffect(() => {
    const viewModel = viewModelRef.current!;

    viewModel.onUserChanged(setUser);
    viewModel.onAuthChanged(setIsAuthenticated);
    viewModel.onLoadingChanged(setLoading);
    viewModel.onErrorChanged(setError);

    viewModel.checkAuth();
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    await viewModelRef.current?.login(email, password);
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    await viewModelRef.current?.register(name, email, password);
  }, []);

  const logout = useCallback(async () => {
    await viewModelRef.current?.logout();
  }, []);

  const updateProfile = useCallback(async (updates: { name?: string; photo?: string; birthdate?: Date }) => {
    await viewModelRef.current?.updateProfile(updates);
  }, []);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    await viewModelRef.current?.changePassword(currentPassword, newPassword);
  }, []);

  const clearError = useCallback(() => {
    viewModelRef.current?.clearError();
  }, []);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    changePassword,
    clearError,
  };
}
