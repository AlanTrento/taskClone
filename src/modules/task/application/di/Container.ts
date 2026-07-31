import { RepositoryFactory } from '../../infrastructure/factories/RepositoryFactory';
import { GetTasksUseCase } from '../usecases/GetTasksUseCase';
import { CreateTaskUseCase } from '../usecases/CreateTaskUseCase';
import { UpdateTaskUseCase } from '../usecases/UpdateTaskUseCase';
import { DeleteTaskUseCase } from '../usecases/DeleteTaskUseCase';
import { DeleteCompletedTasksUseCase } from '../usecases/DeleteCompletedTasksUseCase';
import { MarkOldTasksAsCompletedUseCase } from '../usecases/MarkOldTasksAsCompletedUseCase';
import { GetTaskListsUseCase } from '../usecases/GetTaskListsUseCase';
import { CreateTaskListUseCase } from '../usecases/CreateTaskListUseCase';
import { UpdateTaskListUseCase } from '../usecases/UpdateTaskListUseCase';
import { DeleteTaskListUseCase } from '../usecases/DeleteTaskListUseCase';

export class Container {
  private static getTasksUseCase: GetTasksUseCase | null = null;
  private static createTaskUseCase: CreateTaskUseCase | null = null;
  private static updateTaskUseCase: UpdateTaskUseCase | null = null;
  private static deleteTaskUseCase: DeleteTaskUseCase | null = null;
  private static deleteCompletedTasksUseCase: DeleteCompletedTasksUseCase | null = null;
  private static markOldTasksAsCompletedUseCase: MarkOldTasksAsCompletedUseCase | null = null;
  private static getTaskListsUseCase: GetTaskListsUseCase | null = null;
  private static createTaskListUseCase: CreateTaskListUseCase | null = null;
  private static updateTaskListUseCase: UpdateTaskListUseCase | null = null;
  private static deleteTaskListUseCase: DeleteTaskListUseCase | null = null;

  static getGetTasksUseCase(): GetTasksUseCase {
    if (!Container.getTasksUseCase) {
      const repository = RepositoryFactory.getTaskRepository();
      Container.getTasksUseCase = new GetTasksUseCase(repository);
    }
    return Container.getTasksUseCase;
  }

  static getCreateTaskUseCase(): CreateTaskUseCase {
    if (!Container.createTaskUseCase) {
      const repository = RepositoryFactory.getTaskRepository();
      Container.createTaskUseCase = new CreateTaskUseCase(repository);
    }
    return Container.createTaskUseCase;
  }

  static getUpdateTaskUseCase(): UpdateTaskUseCase {
    if (!Container.updateTaskUseCase) {
      const repository = RepositoryFactory.getTaskRepository();
      Container.updateTaskUseCase = new UpdateTaskUseCase(repository);
    }
    return Container.updateTaskUseCase;
  }

  static getDeleteTaskUseCase(): DeleteTaskUseCase {
    if (!Container.deleteTaskUseCase) {
      const repository = RepositoryFactory.getTaskRepository();
      Container.deleteTaskUseCase = new DeleteTaskUseCase(repository);
    }
    return Container.deleteTaskUseCase;
  }

  static getDeleteCompletedTasksUseCase(): DeleteCompletedTasksUseCase {
    if (!Container.deleteCompletedTasksUseCase) {
      const repository = RepositoryFactory.getTaskRepository();
      Container.deleteCompletedTasksUseCase = new DeleteCompletedTasksUseCase(repository);
    }
    return Container.deleteCompletedTasksUseCase;
  }

  static getMarkOldTasksAsCompletedUseCase(): MarkOldTasksAsCompletedUseCase {
    if (!Container.markOldTasksAsCompletedUseCase) {
      const repository = RepositoryFactory.getTaskRepository();
      Container.markOldTasksAsCompletedUseCase = new MarkOldTasksAsCompletedUseCase(repository);
    }
    return Container.markOldTasksAsCompletedUseCase;
  }

  static getGetTaskListsUseCase(): GetTaskListsUseCase {
    if (!Container.getTaskListsUseCase) {
      const repository = RepositoryFactory.getTaskListRepository();
      Container.getTaskListsUseCase = new GetTaskListsUseCase(repository);
    }
    return Container.getTaskListsUseCase;
  }

  static getCreateTaskListUseCase(): CreateTaskListUseCase {
    if (!Container.createTaskListUseCase) {
      const repository = RepositoryFactory.getTaskListRepository();
      Container.createTaskListUseCase = new CreateTaskListUseCase(repository);
    }
    return Container.createTaskListUseCase;
  }

  static getUpdateTaskListUseCase(): UpdateTaskListUseCase {
    if (!Container.updateTaskListUseCase) {
      const repository = RepositoryFactory.getTaskListRepository();
      Container.updateTaskListUseCase = new UpdateTaskListUseCase(repository);
    }
    return Container.updateTaskListUseCase;
  }

  static getDeleteTaskListUseCase(): DeleteTaskListUseCase {
    if (!Container.deleteTaskListUseCase) {
      const repository = RepositoryFactory.getTaskListRepository();
      Container.deleteTaskListUseCase = new DeleteTaskListUseCase(repository);
    }
    return Container.deleteTaskListUseCase;
  }

  static reset(): void {
    Container.getTasksUseCase = null;
    Container.createTaskUseCase = null;
    Container.updateTaskUseCase = null;
    Container.deleteTaskUseCase = null;
    Container.deleteCompletedTasksUseCase = null;
    Container.markOldTasksAsCompletedUseCase = null;
    Container.getTaskListsUseCase = null;
    Container.createTaskListUseCase = null;
    Container.updateTaskListUseCase = null;
    Container.deleteTaskListUseCase = null;
    RepositoryFactory.reset();
  }
}
