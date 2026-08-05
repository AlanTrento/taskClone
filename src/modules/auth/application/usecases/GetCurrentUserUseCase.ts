import type { IUserRepository, AuthResponse } from '../../domain/repositories/IUserRepository';

export class GetCurrentUserUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(): Promise<AuthResponse> {
    const user = await this.userRepository.getCurrentUser();
    const token = localStorage.getItem('auth_token') || '';
    return { user, token };
  }
}
