import { describe, it, expect } from 'vitest';
import { createUser, updateUser } from '../User';
import type { User } from '../User';

describe('User Entity', () => {
  const baseUser: Omit<User, 'createdAt' | 'updatedAt'> = {
    id: '1',
    name: 'Alan',
    email: 'alan@test.com',
  };

  describe('createUser', () => {
    it('should create a user with dates', () => {
      const user = createUser(baseUser);

      expect(user.id).toBe('1');
      expect(user.name).toBe('Alan');
      expect(user.email).toBe('alan@test.com');
      expect(user.createdAt).toBeInstanceOf(Date);
      expect(user.updatedAt).toBeInstanceOf(Date);
    });

    it('should create user with optional fields', () => {
      const user = createUser({
        ...baseUser,
        photo: 'photo.jpg',
        birthdate: new Date('1990-01-01'),
      });

      expect(user.photo).toBe('photo.jpg');
      expect(user.birthdate).toEqual(new Date('1990-01-01'));
    });

    it('should create user without optional fields', () => {
      const user = createUser(baseUser);

      expect(user.photo).toBeUndefined();
      expect(user.birthdate).toBeUndefined();
    });
  });

  describe('updateUser', () => {
    it('should update user fields', () => {
      const user = createUser(baseUser);
      const updated = updateUser(user, { name: 'Alan Updated' });

      expect(updated.name).toBe('Alan Updated');
      expect(updated.email).toBe('alan@test.com');
      expect(updated.updatedAt).toBeInstanceOf(Date);
    });

    it('should not change id or createdAt', () => {
      const user = createUser(baseUser);
      const originalCreatedAt = user.createdAt;
      const updated = updateUser(user, { name: 'Updated' });

      expect(updated.id).toBe(user.id);
      expect(updated.createdAt).toEqual(originalCreatedAt);
    });

    it('should update photo', () => {
      const user = createUser(baseUser);
      const updated = updateUser(user, { photo: 'new-photo.jpg' });

      expect(updated.photo).toBe('new-photo.jpg');
    });

    it('should update birthdate', () => {
      const user = createUser(baseUser);
      const newDate = new Date('1995-06-15');
      const updated = updateUser(user, { birthdate: newDate });

      expect(updated.birthdate).toEqual(newDate);
    });
  });
});
