import { describe, it, expect, beforeEach } from 'vitest';
import { MockUserRepository } from '../../../infrastructure/repositories/MockUserRepository';
import { LoginUseCase } from '../LoginUseCase';
import { RegisterUseCase } from '../RegisterUseCase';
import { UpdateProfileUseCase } from '../UpdateProfileUseCase';
import { ChangePasswordUseCase } from '../ChangePasswordUseCase';

describe('Auth UseCases', () => {
  let repository: MockUserRepository;
  let loginUseCase: LoginUseCase;
  let registerUseCase: RegisterUseCase;
  let updateProfileUseCase: UpdateProfileUseCase;
  let changePasswordUseCase: ChangePasswordUseCase;

  beforeEach(() => {
    repository = new MockUserRepository();
    loginUseCase = new LoginUseCase(repository);
    registerUseCase = new RegisterUseCase(repository);
    updateProfileUseCase = new UpdateProfileUseCase(repository);
    changePasswordUseCase = new ChangePasswordUseCase(repository);
  });

  describe('LoginUseCase', () => {
    it('should login with valid credentials', async () => {
      const result = await loginUseCase.execute({
        email: 'admin@test.com',
        password: 'Admin@123',
      });

      expect(result.user).toBeDefined();
      expect(result.token).toBeDefined();
      expect(result.user.email).toBe('admin@test.com');
    });

    it('should throw on invalid credentials', async () => {
      await expect(
        loginUseCase.execute({ email: 'wrong@test.com', password: 'wrong' })
      ).rejects.toThrow('Email ou senha incorretos');
    });

    it('should throw on missing fields', async () => {
      await expect(
        loginUseCase.execute({ email: '', password: '' })
      ).rejects.toThrow('Email e senha são obrigatórios');
    });
  });

  describe('RegisterUseCase', () => {
    it('should register with valid data', async () => {
      const result = await registerUseCase.execute({
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
      await expect(
        registerUseCase.execute({
          name: 'Duplicate',
          email: 'admin@test.com',
          password: 'Pass@1234',
        })
      ).rejects.toThrow('Email já cadastrado');
    });

    it('should throw on weak password', async () => {
      await expect(
        registerUseCase.execute({
          name: 'User',
          email: 'user@test.com',
          password: 'weak',
        })
      ).rejects.toThrow('A senha deve ter no mínimo 8 caracteres');
    });

    it('should throw on missing uppercase', async () => {
      await expect(
        registerUseCase.execute({
          name: 'User',
          email: 'user@test.com',
          password: 'lowercase@123',
        })
      ).rejects.toThrow('A senha deve ter no mínimo 8 caracteres');
    });

    it('should throw on missing special char', async () => {
      await expect(
        registerUseCase.execute({
          name: 'User',
          email: 'user@test.com',
          password: 'NoSpecial123',
        })
      ).rejects.toThrow('A senha deve ter no mínimo 8 caracteres');
    });
  });

  describe('UpdateProfileUseCase', () => {
    it('should update profile', async () => {
      await loginUseCase.execute({
        email: 'admin@test.com',
        password: 'Admin@123',
      });

      const updated = await updateProfileUseCase.execute({
        name: 'Alan Updated',
      });

      expect(updated.name).toBe('Alan Updated');
    });

    it('should throw when not authenticated', async () => {
      await expect(
        updateProfileUseCase.execute({ name: 'Test' })
      ).rejects.toThrow('Usuário não autenticado');
    });
  });

  describe('ChangePasswordUseCase', () => {
    it('should change password with valid data', async () => {
      await loginUseCase.execute({
        email: 'admin@test.com',
        password: 'Admin@123',
      });

      await expect(
        changePasswordUseCase.execute({
          currentPassword: 'Admin@123',
          newPassword: 'NewPass@123',
        })
      ).resolves.toBeUndefined();
    });

    it('should throw on wrong current password', async () => {
      await loginUseCase.execute({
        email: 'admin@test.com',
        password: 'Admin@123',
      });

      await expect(
        changePasswordUseCase.execute({
          currentPassword: 'WrongPass@1',
          newPassword: 'NewPass@123',
        })
      ).rejects.toThrow('Senha atual incorreta');
    });

    it('should throw on same password', async () => {
      await loginUseCase.execute({
        email: 'admin@test.com',
        password: 'Admin@123',
      });

      await expect(
        changePasswordUseCase.execute({
          currentPassword: 'Admin@123',
          newPassword: 'Admin@123',
        })
      ).rejects.toThrow('A nova senha deve ser diferente da atual');
    });

    it('should throw on weak new password', async () => {
      await loginUseCase.execute({
        email: 'admin@test.com',
        password: 'Admin@123',
      });

      await expect(
        changePasswordUseCase.execute({
          currentPassword: 'Admin@123',
          newPassword: 'weak',
        })
      ).rejects.toThrow('A nova senha deve ter no mínimo 8 caracteres');
    });
  });
});
