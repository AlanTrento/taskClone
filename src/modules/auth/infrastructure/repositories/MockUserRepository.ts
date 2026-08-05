import type { User } from '../../domain/entities/User';
import type { IUserRepository, LoginRequest, RegisterRequest, AuthResponse } from '../../domain/repositories/IUserRepository';
import { createUser, updateUser } from '../../domain/entities/User';

interface StoredUser extends User {
  password: string;
}

const mockUsers: StoredUser[] = [
  {
    id: '1',
    name: 'Alan',
    email: 'admin@test.com',
    password: 'Admin@123',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

const TOKEN_PREFIX = 'mock-token-';

export class MockUserRepository implements IUserRepository {
  private users: StoredUser[] = [...mockUsers];
  private currentToken: string | null = null;
  private tokenUserMap = new Map<string, string>();

  private delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, 300));
  }

  private generateToken(): string {
    return TOKEN_PREFIX + crypto.randomUUID();
  }

  private getCurrentUserId(): string | null {
    if (!this.currentToken) return null;
    return this.tokenUserMap.get(this.currentToken) || null;
  }

  async login(request: LoginRequest): Promise<AuthResponse> {
    await this.delay();

    const user = this.users.find(
      (u) => u.email === request.email && u.password === request.password
    );

    if (!user) {
      throw new Error('Email ou senha incorretos');
    }

    const token = this.generateToken();
    this.currentToken = token;
    this.tokenUserMap.set(token, user.id);

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async register(request: RegisterRequest): Promise<AuthResponse> {
    await this.delay();

    const exists = this.users.find((u) => u.email === request.email);
    if (exists) {
      throw new Error('Email já cadastrado');
    }

    const newUser = createUser({
      id: crypto.randomUUID(),
      name: request.name,
      email: request.email,
    });

    const storedUser: StoredUser = {
      ...newUser,
      password: request.password,
    };

    this.users.push(storedUser);
    const token = this.generateToken();
    this.currentToken = token;
    this.tokenUserMap.set(token, newUser.id);

    return { user: newUser, token };
  }

  async getCurrentUser(): Promise<User> {
    await this.delay();

    const userId = this.getCurrentUserId();
    if (!userId) {
      throw new Error('Usuário não autenticado');
    }

    const user = this.users.find((u) => u.id === userId);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async updateProfile(updates: Partial<Pick<User, 'name' | 'photo' | 'birthdate'>>): Promise<User> {
    await this.delay();

    const userId = this.getCurrentUserId();
    if (!userId) {
      throw new Error('Usuário não autenticado');
    }

    const index = this.users.findIndex((u) => u.id === userId);
    if (index === -1) {
      throw new Error('Usuário não encontrado');
    }

    this.users[index] = updateUser(this.users[index], updates) as StoredUser;
    const { password: _, ...userWithoutPassword } = this.users[index];
    return userWithoutPassword;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.delay();

    const userId = this.getCurrentUserId();
    if (!userId) {
      throw new Error('Usuário não autenticado');
    }

    const index = this.users.findIndex((u) => u.id === userId);
    if (index === -1) {
      throw new Error('Usuário não encontrado');
    }

    if (this.users[index].password !== currentPassword) {
      throw new Error('Senha atual incorreta');
    }

    this.users[index] = {
      ...this.users[index],
      password: newPassword,
      updatedAt: new Date(),
    };
  }

  async logout(): Promise<void> {
    await this.delay();
    if (this.currentToken) {
      this.tokenUserMap.delete(this.currentToken);
    }
    this.currentToken = null;
  }
}
