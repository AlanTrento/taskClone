import type { User } from '../../domain/entities/User';
import type { UserDTO } from '../dto/UserDTO';

export function toUserDTO(user: User): UserDTO {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    photo: user.photo,
    birthdate: user.birthdate?.toISOString(),
    createdAt: user.createdAt.toISOString(),
    updatedAt: user.updatedAt.toISOString(),
  };
}

export function toUser(dto: UserDTO): User {
  return {
    id: dto.id,
    name: dto.name,
    email: dto.email,
    photo: dto.photo,
    birthdate: dto.birthdate ? new Date(dto.birthdate) : undefined,
    createdAt: new Date(dto.createdAt),
    updatedAt: new Date(dto.updatedAt),
  };
}
