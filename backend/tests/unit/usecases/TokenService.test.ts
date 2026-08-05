import { describe, it, expect } from 'vitest';
import { TokenService } from '../../../src/infrastructure/services/TokenService.js';

describe('TokenService', () => {
  const service = new TokenService();

  it('should generate and verify a token', () => {
    const userId = 'test-user-id';
    const token = service.generateToken(userId);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');

    const payload = service.verifyToken(token);
    expect(payload.userId).toBe(userId);
  });

  it('should generate and verify a refresh token', () => {
    const userId = 'test-user-id';
    const token = service.generateRefreshToken(userId);
    expect(token).toBeDefined();

    const payload = service.verifyRefreshToken(token);
    expect(payload.userId).toBe(userId);
  });

  it('should throw on invalid token', () => {
    expect(() => service.verifyToken('invalid-token')).toThrow();
  });

  it('should throw on invalid refresh token', () => {
    expect(() => service.verifyRefreshToken('invalid-token')).toThrow();
  });
});
