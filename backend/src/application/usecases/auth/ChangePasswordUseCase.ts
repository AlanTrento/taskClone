import type { IUserRepository } from '../../interfaces/IUserRepository.js';
import type { HashService } from '../../../infrastructure/services/HashService.js';
import { UnauthorizedError, ValidationError } from '../../../shared/errors/AppError.js';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

export class ChangePasswordUseCase {
  constructor(
    private userRepository: IUserRepository,
    private hashService: HashService,
  ) {}

  async execute(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    if (!userId || !currentPassword || !newPassword) {
      throw new ValidationError('Todos os campos são obrigatórios');
    }

    if (currentPassword === newPassword) {
      throw new ValidationError('A nova senha deve ser diferente da atual');
    }

    if (!PASSWORD_REGEX.test(newPassword)) {
      throw new ValidationError(
        'A nova senha deve ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial',
      );
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedError('Usuário não encontrado');
    }

    const userWithEmail = await this.userRepository.findByEmail(user.email);
    if (!userWithEmail) {
      throw new UnauthorizedError('Usuário não encontrado');
    }

    const passwordValid = await this.hashService.compare(currentPassword, userWithEmail.password);
    if (!passwordValid) {
      throw new UnauthorizedError('Senha atual incorreta');
    }

    const hashedPassword = await this.hashService.hash(newPassword);
    await this.userRepository.updatePassword(userId, hashedPassword);
  }
}
