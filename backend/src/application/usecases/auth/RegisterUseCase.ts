import type { IUserRepository, RegisterRequest, AuthResponse } from '../../interfaces/IUserRepository.js';
import type { HashService } from '../../../infrastructure/services/HashService.js';
import type { TokenService } from '../../../infrastructure/services/TokenService.js';
import { ConflictError, ValidationError } from '../../../shared/errors/AppError.js';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export class RegisterUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashService: HashService,
    private tokenService: TokenService,
  ) {}

  async execute(request: RegisterRequest): Promise<AuthResponse> {
    if (!request.name || !request.email || !request.password) {
      throw new ValidationError('Nome, email e senha são obrigatórios');
    }

    if (!PASSWORD_REGEX.test(request.password)) {
      throw new ValidationError(
        'A senha deve ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial',
      );
    }

    const existing = await this.userRepository.findByEmail(request.email);
    if (existing) {
      throw new ConflictError('Email já cadastrado');
    }

    const hashedPassword = await this.hashService.hash(request.password);
    const user = await this.userRepository.create({
      name: request.name,
      email: request.email,
      password: hashedPassword,
    });

    const token = this.tokenService.generateToken(user.id);

    return { user, token };
  }
}
