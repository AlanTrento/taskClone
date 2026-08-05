import type { IUserRepository } from '../../interfaces/IUserRepository.js';
import type { User } from '../../../domain/entities/User.js';
import { ValidationError } from '../../../shared/errors/AppError.js';

export class UpdateProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(userId: string, updates: Partial<Pick<User, 'name' | 'photo' | 'birthdate'>>): Promise<User> {
    if (!userId) {
      throw new ValidationError('ID do usuário é obrigatório');
    }

    const allowedUpdates: Partial<Pick<User, 'name' | 'photo' | 'birthdate'>> = {};
    if (updates.name !== undefined) allowedUpdates.name = updates.name;
    if (updates.photo !== undefined) allowedUpdates.photo = updates.photo;
    if (updates.birthdate !== undefined) allowedUpdates.birthdate = updates.birthdate;

    return this.userRepository.updateProfile(userId, allowedUpdates);
  }
}
