import type { User } from '../../domain/entities/User';
import type { IUserRepository } from '../../domain/repositories/IUserRepository';

interface UpdateProfileRequest {
  name?: string;
  photo?: string;
  birthdate?: Date;
}

export class UpdateProfileUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(request: UpdateProfileRequest): Promise<User> {
    const updates: Partial<Pick<User, 'name' | 'photo' | 'birthdate'>> = {};
    if (request.name !== undefined) updates.name = request.name;
    if (request.photo !== undefined) updates.photo = request.photo;
    if (request.birthdate !== undefined) updates.birthdate = request.birthdate;

    return this.userRepository.updateProfile(updates);
  }
}
