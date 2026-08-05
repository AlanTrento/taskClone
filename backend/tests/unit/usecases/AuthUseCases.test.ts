import { describe, it, expect } from 'vitest';
import { LoginUseCase } from '../../../src/application/usecases/auth/LoginUseCase.js';
import { RegisterUseCase } from '../../../src/application/usecases/auth/RegisterUseCase.js';
import { UnauthorizedError, ValidationError, ConflictError } from '../../../src/shared/errors/AppError.js';
import type { IUserRepository, RegisterRequest, AuthResponse } from '../../../src/application/interfaces/IUserRepository.js';
import type { User } from '../../../src/domain/entities/User.js';
import { HashService } from '../../../src/infrastructure/services/HashService.js';
import { TokenService } from '../../../src/infrastructure/services/TokenService.js';

// In-memory mock repository
function createMockUserRepository(): IUserRepository & { users: (User & { password: string })[] } {
  const users: (User & { password: string })[] = [];
  return {
    users,
    async findByEmail(email) {
      return users.find((u) => u.email === email) || null;
    },
    async findById(id) {
      const user = users.find((u) => u.id === id);
      if (!user) return null;
      const { password: _, ...rest } = user;
      return rest;
    },
    async create(data) {
      const user: User & { password: string } = {
        id: String(users.length + 1),
        name: data.name,
        email: data.email,
        password: data.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      users.push(user);
      const { password: _, ...rest } = user;
      return rest;
    },
    async updateProfile(userId, updates) {
      const user = users.find((u) => u.id === userId);
      if (!user) throw new Error('User not found');
      Object.assign(user, updates, { updatedAt: new Date() });
      const { password: _, ...rest } = user;
      return rest;
    },
    async updatePassword(userId, hashedPassword) {
      const user = users.find((u) => u.id === userId);
      if (!user) throw new Error('User not found');
      user.password = hashedPassword;
    },
  };
}

describe('LoginUseCase', () => {
  it('should login with valid credentials', async () => {
    const repo = createMockUserRepository();
    const hashService = new HashService();
    const tokenService = new TokenService();

    // Seed user
    const hashedPassword = await hashService.hash('Admin@123');
    repo.users.push({
      id: '1', name: 'Alan', email: 'admin@test.com', password: hashedPassword,
      createdAt: new Date(), updatedAt: new Date(),
    });

    const useCase = new LoginUseCase(repo, hashService, tokenService);
    const result = await useCase.execute({ email: 'admin@test.com', password: 'Admin@123' });

    expect(result.user).toBeDefined();
    expect(result.token).toBeDefined();
    expect(result.user.email).toBe('admin@test.com');
    expect(result.user).not.toHaveProperty('password');
  });

  it('should throw on invalid credentials', async () => {
    const repo = createMockUserRepository();
    const hashService = new HashService();
    const tokenService = new TokenService();
    const useCase = new LoginUseCase(repo, hashService, tokenService);

    await expect(
      useCase.execute({ email: 'wrong@test.com', password: 'wrong' }),
    ).rejects.toThrow('Email ou senha incorretos');
  });

  it('should throw on missing fields', async () => {
    const repo = createMockUserRepository();
    const hashService = new HashService();
    const tokenService = new TokenService();
    const useCase = new LoginUseCase(repo, hashService, tokenService);

    await expect(
      useCase.execute({ email: '', password: '' }),
    ).rejects.toThrow('Email e senha são obrigatórios');
  });
});

describe('RegisterUseCase', () => {
  it('should register with valid data', async () => {
    const repo = createMockUserRepository();
    const hashService = new HashService();
    const tokenService = new TokenService();
    const useCase = new RegisterUseCase(repo, hashService, tokenService);

    const result = await useCase.execute({
      name: 'New User',
      email: 'new@test.com',
      password: 'NewPass@123',
    });

    expect(result.user).toBeDefined();
    expect(result.token).toBeDefined();
    expect(result.user.name).toBe('New User');
    expect(result.user.email).toBe('new@test.com');
  });

  it('should throw on existing email', async () => {
    const repo = createMockUserRepository();
    const hashService = new HashService();
    const tokenService = new TokenService();

    const hashedPassword = await hashService.hash('Admin@123');
    repo.users.push({
      id: '1', name: 'Alan', email: 'admin@test.com', password: hashedPassword,
      createdAt: new Date(), updatedAt: new Date(),
    });

    const useCase = new RegisterUseCase(repo, hashService, tokenService);

    await expect(
      useCase.execute({ name: 'Dup', email: 'admin@test.com', password: 'Pass@1234' }),
    ).rejects.toThrow('Email já cadastrado');
  });

  it('should throw on weak password', async () => {
    const repo = createMockUserRepository();
    const hashService = new HashService();
    const tokenService = new TokenService();
    const useCase = new RegisterUseCase(repo, hashService, tokenService);

    await expect(
      useCase.execute({ name: 'User', email: 'user@test.com', password: 'weak' }),
    ).rejects.toThrow('A senha deve ter no mínimo 8 caracteres');
  });
});
