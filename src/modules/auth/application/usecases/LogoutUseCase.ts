import type { IUserRepository } from '../../domain/repositories/IUserRepository';

export class LogoutUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<void> {
    return this.userRepository.logout();
  }
}
