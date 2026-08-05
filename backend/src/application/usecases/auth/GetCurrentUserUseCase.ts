import type { IUserRepository } from '../../interfaces/IUserRepository.js';
import { NotFoundError, UnauthorizedError } from '../../../shared/errors/AppError.js';

export class GetCurrentUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string) {
    if (!userId) {
      throw new UnauthorizedError('Usuário não autenticado');
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado');
    }

    return user;
  }
}
