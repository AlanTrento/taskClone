import type { IUserRepository, LoginRequest, AuthResponse } from '../../interfaces/IUserRepository.js';
import type { HashService } from '../../../infrastructure/services/HashService.js';
import type { TokenService } from '../../../infrastructure/services/TokenService.js';
import { UnauthorizedError, ValidationError } from '../../../shared/errors/AppError.js';

export class LoginUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashService: HashService,
    private tokenService: TokenService,
  ) {}

  async execute(request: LoginRequest): Promise<AuthResponse> {
    if (!request.email || !request.password) {
      throw new ValidationError('Email e senha são obrigatórios');
    }

    const user = await this.userRepository.findByEmail(request.email);
    if (!user) {
      throw new UnauthorizedError('Email ou senha incorretos');
    }

    const passwordValid = await this.hashService.compare(request.password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedError('Email ou senha incorretos');
    }

    const token = this.tokenService.generateToken(user.id);

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }
}
