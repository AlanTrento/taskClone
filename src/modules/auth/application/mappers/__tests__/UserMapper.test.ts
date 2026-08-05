import { describe, it, expect } from 'vitest';
import { toUserDTO, toUser } from '../UserMapper';
import type { User } from '../../../domain/entities/User';
import type { UserDTO } from '../../dto/UserDTO';

describe('UserMapper', () => {
  const mockUser: User = {
    id: '1',
    name: 'Alan',
    email: 'alan@test.com',
    photo: 'photo.jpg',
    birthdate: new Date('1990-01-15'),
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-06-01'),
  };

  const mockUserDTO: UserDTO = {
    id: '1',
    name: 'Alan',
    email: 'alan@test.com',
    photo: 'photo.jpg',
    birthdate: '1990-01-15T00:00:00.000Z',
    createdAt: '2024-01-01T00:00:00.000Z',
    updatedAt: '2024-06-01T00:00:00.000Z',
  };

  describe('toUserDTO', () => {
    it('should convert User to UserDTO', () => {
      const dto = toUserDTO(mockUser);

      expect(dto.id).toBe('1');
      expect(dto.name).toBe('Alan');
      expect(dto.email).toBe('alan@test.com');
      expect(dto.photo).toBe('photo.jpg');
      expect(typeof dto.birthdate).toBe('string');
      expect(typeof dto.createdAt).toBe('string');
      expect(typeof dto.updatedAt).toBe('string');
    });

    it('should handle undefined optional fields', () => {
      const user: User = {
        id: '2',
        name: 'Test',
        email: 'test@test.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const dto = toUserDTO(user);

      expect(dto.photo).toBeUndefined();
      expect(dto.birthdate).toBeUndefined();
    });
  });

  describe('toUser', () => {
    it('should convert UserDTO to User', () => {
      const user = toUser(mockUserDTO);

      expect(user.id).toBe('1');
      expect(user.name).toBe('Alan');
      expect(user.email).toBe('alan@test.com');
      expect(user.photo).toBe('photo.jpg');
      expect(user.birthdate).toBeInstanceOf(Date);
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });

    it('should handle undefined optional fields', () => {
      const dto: UserDTO = {
        id: '2',
        name: 'Test',
        email: 'test@test.com',
        createdAt: '2024-01-01T00:00:00.000Z',
        updatedAt: '2024-01-01T00:00:00.000Z',
      };

      const user = toUser(dto);

      expect(user.photo).toBeUndefined();
      expect(user.birthdate).toBeUndefined();
    });
  });

  describe('roundtrip', () => {
    it('should convert User -> UserDTO -> User preserving data', () => {
      const dto = toUserDTO(mockUser);
      const user = toUser(dto);

      expect(user.id).toBe(mockUser.id);
      expect(user.name).toBe(mockUser.name);
      expect(user.email).toBe(mockUser.email);
      expect(user.photo).toBe(mockUser.photo);
      expect(user.birthdate?.toISOString()).toBe(mockUser.birthdate?.toISOString());
    });
  });
});
