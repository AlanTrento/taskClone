import type { User } from '../../domain/entities/User';
import type { IUserRepository, LoginRequest, RegisterRequest, AuthResponse } from '../../domain/repositories/IUserRepository';
import { httpClient } from '../../../../shared/services/HttpClient';

interface UserResponse {
  id: string;
  name: string;
  email: string;
  photo?: string;
  birthdate?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthResponseApi {
  user: UserResponse;
  token: string;
}

function toDomain(response: UserResponse): User {
  return {
    id: response.id,
    name: response.name,
    email: response.email,
    photo: response.photo,
    birthdate: response.birthdate ? new Date(response.birthdate) : undefined,
    createdAt: new Date(response.createdAt),
    updatedAt: new Date(response.updatedAt),
  };
}

export class ApiUserRepository implements IUserRepository {
  async login(request: LoginRequest): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponseApi>('/auth/login', {
      email: request.email,
      password: request.password,
    });
    return {
      user: toDomain(response.user),
      token: response.token,
    };
  }

  async register(request: RegisterRequest): Promise<AuthResponse> {
    const response = await httpClient.post<AuthResponseApi>('/auth/register', {
      name: request.name,
      email: request.email,
      password: request.password,
    });
    return {
      user: toDomain(response.user),
      token: response.token,
    };
  }

  async getCurrentUser(): Promise<User> {
    const response = await httpClient.get<UserResponse>('/auth/me');
    return toDomain(response);
  }

  async updateProfile(updates: Partial<Pick<User, 'name' | 'photo' | 'birthdate'>>): Promise<User> {
    const body: Record<string, unknown> = {};
    if (updates.name !== undefined) body.name = updates.name;
    if (updates.photo !== undefined) body.photo = updates.photo;
    if (updates.birthdate !== undefined) body.birthdate = updates.birthdate.toISOString();

    const response = await httpClient.put<UserResponse>('/auth/profile', body);
    return toDomain(response);
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await httpClient.put('/auth/change-password', {
      currentPassword,
      newPassword,
    });
  }

  async logout(): Promise<void> {
    await httpClient.post('/auth/logout');
  }
}
