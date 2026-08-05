import { describe, it, expect } from 'vitest';
import { HashService } from '../../../src/infrastructure/services/HashService.js';

describe('HashService', () => {
  const service = new HashService();

  it('should hash a password', async () => {
    const password = 'Admin@123';
    const hash = await service.hash(password);
    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);
    expect(hash.length).toBeGreaterThan(0);
  });

  it('should compare password with hash', async () => {
    const password = 'Admin@123';
    const hash = await service.hash(password);

    const valid = await service.compare(password, hash);
    expect(valid).toBe(true);
  });

  it('should reject wrong password', async () => {
    const password = 'Admin@123';
    const hash = await service.hash(password);

    const valid = await service.compare('WrongPassword@1', hash);
    expect(valid).toBe(false);
  });
});
