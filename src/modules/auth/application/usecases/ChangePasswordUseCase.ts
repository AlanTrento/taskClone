import type { IUserRepository } from '../../domain/repositories/IUserRepository';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export class ChangePasswordUseCase {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async execute(request: ChangePasswordRequest): Promise<void> {
    if (!request.currentPassword || !request.newPassword) {
      throw new Error('Todos os campos são obrigatórios');
    }

    if (request.currentPassword === request.newPassword) {
      throw new Error('A nova senha deve ser diferente da atual');
    }

    if (!PASSWORD_REGEX.test(request.newPassword)) {
      throw new Error('A nova senha deve ter no mínimo 8 caracteres, com letra maiúscula, minúscula, número e caractere especial');
    }

    return this.userRepository.changePassword(request.currentPassword, request.newPassword);
  }
}
