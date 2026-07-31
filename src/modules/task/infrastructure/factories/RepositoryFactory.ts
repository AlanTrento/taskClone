import type { ITaskRepository } from '../../domain/repositories/ITaskRepository';
import type { ITaskListRepository } from '../../domain/repositories/ITaskListRepository';
import { MockTaskRepository } from '../repositories/MockTaskRepository';
import { MockTaskListRepository } from '../repositories/MockTaskListRepository';
import { ApiTaskRepository } from '../repositories/ApiTaskRepository';
import { ApiTaskListRepository } from '../repositories/ApiTaskListRepository';

export type DataSource = 'mock' | 'api';

const config: { dataSource: DataSource } = {
  dataSource: 'mock',
};

export class RepositoryFactory {
  private static taskRepository: ITaskRepository | null = null;
  private static taskListRepository: ITaskListRepository | null = null;

  static configure(dataSource: DataSource): void {
    config.dataSource = dataSource;
    RepositoryFactory.reset();
  }

  static getDataSource(): DataSource {
    return config.dataSource;
  }

  static getTaskRepository(): ITaskRepository {
    if (!RepositoryFactory.taskRepository) {
      RepositoryFactory.taskRepository = config.dataSource === 'api'
        ? new ApiTaskRepository()
        : new MockTaskRepository();
    }
    return RepositoryFactory.taskRepository;
  }

  static getTaskListRepository(): ITaskListRepository {
    if (!RepositoryFactory.taskListRepository) {
      RepositoryFactory.taskListRepository = config.dataSource === 'api'
        ? new ApiTaskListRepository()
        : new MockTaskListRepository();
    }
    return RepositoryFactory.taskListRepository;
  }

  static reset(): void {
    RepositoryFactory.taskRepository = null;
    RepositoryFactory.taskListRepository = null;
  }
}
