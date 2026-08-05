// Repositories
import { MongoUserRepository } from '../infrastructure/database/repositories/MongoUserRepository.js';
import { MongoTaskRepository } from '../infrastructure/database/repositories/MongoTaskRepository.js';
import { MongoTaskListRepository } from '../infrastructure/database/repositories/MongoTaskListRepository.js';

// Services
import { TokenService } from '../infrastructure/services/TokenService.js';
import { HashService } from '../infrastructure/services/HashService.js';

// Auth Use Cases
import { LoginUseCase } from '../application/usecases/auth/LoginUseCase.js';
import { RegisterUseCase } from '../application/usecases/auth/RegisterUseCase.js';
import { LogoutUseCase } from '../application/usecases/auth/LogoutUseCase.js';
import { GetCurrentUserUseCase } from '../application/usecases/auth/GetCurrentUserUseCase.js';
import { UpdateProfileUseCase } from '../application/usecases/auth/UpdateProfileUseCase.js';
import { ChangePasswordUseCase } from '../application/usecases/auth/ChangePasswordUseCase.js';

// Task Use Cases
import { GetTasksUseCase } from '../application/usecases/task/GetTasksUseCase.js';
import { CreateTaskUseCase } from '../application/usecases/task/CreateTaskUseCase.js';
import { UpdateTaskUseCase } from '../application/usecases/task/UpdateTaskUseCase.js';
import { DeleteTaskUseCase } from '../application/usecases/task/DeleteTaskUseCase.js';
import { DeleteCompletedTasksUseCase } from '../application/usecases/task/DeleteCompletedTasksUseCase.js';
import { MarkOldTasksAsCompletedUseCase } from '../application/usecases/task/MarkOldTasksAsCompletedUseCase.js';
import { GetTaskByIdUseCase } from '../application/usecases/task/GetTaskByIdUseCase.js';

// TaskList Use Cases
import { GetTaskListsUseCase } from '../application/usecases/taskList/GetTaskListsUseCase.js';
import { CreateTaskListUseCase } from '../application/usecases/taskList/CreateTaskListUseCase.js';
import { UpdateTaskListUseCase } from '../application/usecases/taskList/UpdateTaskListUseCase.js';
import { DeleteTaskListUseCase } from '../application/usecases/taskList/DeleteTaskListUseCase.js';
import { GetTaskListByIdUseCase } from '../application/usecases/taskList/GetTaskListByIdUseCase.js';

// Singletons
const userRepository = new MongoUserRepository();
const taskRepository = new MongoTaskRepository();
const taskListRepository = new MongoTaskListRepository();
const tokenService = new TokenService();
const hashService = new HashService();

// Auth Use Cases
export const loginUseCase = new LoginUseCase(userRepository, hashService, tokenService);
export const registerUseCase = new RegisterUseCase(userRepository, hashService, tokenService);
export const logoutUseCase = new LogoutUseCase();
export const getCurrentUserUseCase = new GetCurrentUserUseCase(userRepository);
export const updateProfileUseCase = new UpdateProfileUseCase(userRepository);
export const changePasswordUseCase = new ChangePasswordUseCase(userRepository, hashService);

// Task Use Cases
export const getTasksUseCase = new GetTasksUseCase(taskRepository);
export const createTaskUseCase = new CreateTaskUseCase(taskRepository);
export const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
export const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
export const deleteCompletedTasksUseCase = new DeleteCompletedTasksUseCase(taskRepository);
export const markOldTasksAsCompletedUseCase = new MarkOldTasksAsCompletedUseCase(taskRepository);

// TaskList Use Cases
export const getTaskListsUseCase = new GetTaskListsUseCase(taskListRepository);
export const createTaskListUseCase = new CreateTaskListUseCase(taskListRepository);
export const updateTaskListUseCase = new UpdateTaskListUseCase(taskListRepository);
export const deleteTaskListUseCase = new DeleteTaskListUseCase(taskListRepository, taskRepository);
export const getTaskByIdUseCase = new GetTaskByIdUseCase(taskRepository);
export const getTaskListByIdUseCase = new GetTaskListByIdUseCase(taskListRepository);
