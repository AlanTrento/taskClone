import type { User } from '../../domain/entities/User.js';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface IUserRepository {
  findByEmail(email: string): Promise<(User & { password: string }) | null>;
  findById(id: string): Promise<User | null>;
  create(data: RegisterRequest): Promise<User>;
  updateProfile(userId: string, updates: Partial<Pick<User, 'name' | 'photo' | 'birthdate'>>): Promise<User>;
  updatePassword(userId: string, hashedPassword: string): Promise<void>;
}
