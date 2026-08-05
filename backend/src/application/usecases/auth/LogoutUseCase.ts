export class LogoutUseCase {
  async execute(): Promise<void> {
    // Server-side logout is a no-op for JWT.
    // The client removes the token from localStorage.
    // For refresh token invalidation, implement a token blocklist.
  }
}
