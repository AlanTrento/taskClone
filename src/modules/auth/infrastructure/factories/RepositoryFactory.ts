import type { IUserRepository } from '../../domain/repositories/IUserRepository';
import { MockUserRepository } from '../repositories/MockUserRepository';
import { ApiUserRepository } from '../repositories/ApiUserRepository';

export type DataSource = 'mock' | 'api';

const config: { dataSource: DataSource } = { dataSource: 'mock' };

export class RepositoryFactory {
  private static userRepository: IUserRepository | null = null;

  static configure(dataSource: DataSource): void {
    config.dataSource = dataSource;
    RepositoryFactory.reset();
  }

  static getDataSource(): DataSource {
    return config.dataSource;
  }

  static getUserRepository(): IUserRepository {
    if (!RepositoryFactory.userRepository) {
      RepositoryFactory.userRepository = config.dataSource === 'api'
        ? new ApiUserRepository()
        : new MockUserRepository();
    }
    return RepositoryFactory.userRepository;
  }

  static reset(): void {
    RepositoryFactory.userRepository = null;
  }
}
