import type { IUserRepository, AuthResponse } from '../../domain/repositories/IUserRepository';

interface LoginRequest {
  email: string;
  password: string;
}

export class LoginUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(request: LoginRequest): Promise<AuthResponse> {
    if (!request.email || !request.password) {
      throw new Error('Email e senha são obrigatórios');
    }

    return this.userRepository.login(request);
  }
}
