import type { User } from '../../domain/entities/User';
import type { LoginUseCase } from '../../application/usecases/LoginUseCase';
import type { RegisterUseCase } from '../../application/usecases/RegisterUseCase';
import type { LogoutUseCase } from '../../application/usecases/LogoutUseCase';
import type { GetCurrentUserUseCase } from '../../application/usecases/GetCurrentUserUseCase';
import type { UpdateProfileUseCase } from '../../application/usecases/UpdateProfileUseCase';
import type { ChangePasswordUseCase } from '../../application/usecases/ChangePasswordUseCase';

const TOKEN_KEY = 'auth_token';

export class AuthViewModel {
  private loginUseCase: LoginUseCase;
  private registerUseCase: RegisterUseCase;
  private logoutUseCase: LogoutUseCase;
  private getCurrentUserUseCase: GetCurrentUserUseCase;
  private updateProfileUseCase: UpdateProfileUseCase;
  private changePasswordUseCase: ChangePasswordUseCase;

  private _user: User | null = null;
  private _isAuthenticated = false;
  private _loading = true;
  private _error: string | null = null;

  private _onUserChanged: ((user: User | null) => void) | null = null;
  private _onAuthChanged: ((isAuthenticated: boolean) => void) | null = null;
  private _onLoadingChanged: ((loading: boolean) => void) | null = null;
  private _onErrorChanged: ((error: string | null) => void) | null = null;

  constructor(
    loginUseCase: LoginUseCase,
    registerUseCase: RegisterUseCase,
    logoutUseCase: LogoutUseCase,
    getCurrentUserUseCase: GetCurrentUserUseCase,
    updateProfileUseCase: UpdateProfileUseCase,
    changePasswordUseCase: ChangePasswordUseCase,
  ) {
    this.loginUseCase = loginUseCase;
    this.registerUseCase = registerUseCase;
    this.logoutUseCase = logoutUseCase;
    this.getCurrentUserUseCase = getCurrentUserUseCase;
    this.updateProfileUseCase = updateProfileUseCase;
    this.changePasswordUseCase = changePasswordUseCase;
  }

  get user(): User | null { return this._user; }
  get isAuthenticated(): boolean { return this._isAuthenticated; }
  get loading(): boolean { return this._loading; }
  get error(): string | null { return this._error; }

  onUserChanged(callback: (user: User | null) => void): void {
    this._onUserChanged = callback;
  }

  onAuthChanged(callback: (isAuthenticated: boolean) => void): void {
    this._onAuthChanged = callback;
  }

  onLoadingChanged(callback: (loading: boolean) => void): void {
    this._onLoadingChanged = callback;
  }

  onErrorChanged(callback: (error: string | null) => void): void {
    this._onErrorChanged = callback;
  }

  async login(email: string, password: string): Promise<void> {
    this.setError(null);
    this.setLoading(true);

    try {
      const response = await this.loginUseCase.execute({ email, password });
      this._user = response.user;
      this._isAuthenticated = true;
      localStorage.setItem(TOKEN_KEY, response.token);
      this._onUserChanged?.(this._user);
      this._onAuthChanged?.(this._isAuthenticated);
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Erro ao fazer login');
    } finally {
      this.setLoading(false);
    }
  }

  async register(name: string, email: string, password: string): Promise<void> {
    this.setError(null);
    this.setLoading(true);

    try {
      const response = await this.registerUseCase.execute({ name, email, password });
      this._user = response.user;
      this._isAuthenticated = true;
      localStorage.setItem(TOKEN_KEY, response.token);
      this._onUserChanged?.(this._user);
      this._onAuthChanged?.(this._isAuthenticated);
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Erro ao criar conta');
    } finally {
      this.setLoading(false);
    }
  }

  async logout(): Promise<void> {
    this.setError(null);

    try {
      await this.logoutUseCase.execute();
    } catch {
      // Logout always clears local state
    } finally {
      this._user = null;
      this._isAuthenticated = false;
      localStorage.removeItem(TOKEN_KEY);
      this._onUserChanged?.(null);
      this._onAuthChanged?.(false);
    }
  }

  async checkAuth(): Promise<void> {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) {
      this._isAuthenticated = false;
      this.setLoading(false);
      this._onAuthChanged?.(this._isAuthenticated);
      return;
    }

    this.setLoading(true);
    try {
      const response = await this.getCurrentUserUseCase.execute();
      this._user = response.user;
      this._isAuthenticated = true;
      this._onUserChanged?.(this._user);
      this._onAuthChanged?.(this._isAuthenticated);
    } catch {
      this._user = null;
      this._isAuthenticated = false;
      localStorage.removeItem(TOKEN_KEY);
      this._onAuthChanged?.(false);
    } finally {
      this.setLoading(false);
    }
  }

  async updateProfile(updates: { name?: string; photo?: string; birthdate?: Date }): Promise<void> {
    if (!this._user) return;

    this.setError(null);
    this.setLoading(true);

    try {
      const updatedUser = await this.updateProfileUseCase.execute(updates);
      this._user = updatedUser;
      this._onUserChanged?.(this._user);
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Erro ao atualizar perfil');
    } finally {
      this.setLoading(false);
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    if (!this._user) return;

    this.setError(null);
    this.setLoading(true);

    try {
      await this.changePasswordUseCase.execute({ currentPassword, newPassword });
    } catch (err) {
      this.setError(err instanceof Error ? err.message : 'Erro ao trocar senha');
    } finally {
      this.setLoading(false);
    }
  }

  clearError(): void {
    this.setError(null);
  }

  private setLoading(loading: boolean): void {
    this._loading = loading;
    this._onLoadingChanged?.(loading);
  }

  private setError(error: string | null): void {
    this._error = error;
    this._onErrorChanged?.(error);
  }
}
