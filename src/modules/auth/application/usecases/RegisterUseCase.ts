import type { IUserRepository, AuthResponse } from '../../domain/repositories/IUserRepository';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(request: RegisterRequest): Promise<AuthResponse> {
    if (!request.name || !request.email || !request.password) {
      throw new Error('Nome, email e senha são obrigatórios');
    }

    if (!PASSWORD_REGEX.test(request.password)) {
      throw new Error('A senha deve ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial');
    }

    return this.userRepository.register(request);
  }
}
