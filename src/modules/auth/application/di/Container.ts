import { RepositoryFactory } from '../../infrastructure/factories/RepositoryFactory';
import { LoginUseCase } from '../usecases/LoginUseCase';
import { RegisterUseCase } from '../usecases/RegisterUseCase';
import { LogoutUseCase } from '../usecases/LogoutUseCase';
import { GetCurrentUserUseCase } from '../usecases/GetCurrentUserUseCase';
import { UpdateProfileUseCase } from '../usecases/UpdateProfileUseCase';
import { ChangePasswordUseCase } from '../usecases/ChangePasswordUseCase';

export class AuthContainer {
  private static loginUseCase: LoginUseCase | null = null;
  private static registerUseCase: RegisterUseCase | null = null;
  private static logoutUseCase: LogoutUseCase | null = null;
  private static getCurrentUserUseCase: GetCurrentUserUseCase | null = null;
  private static updateProfileUseCase: UpdateProfileUseCase | null = null;
  private static changePasswordUseCase: ChangePasswordUseCase | null = null;

  static getLoginUseCase(): LoginUseCase {
    if (!AuthContainer.loginUseCase) {
      const repository = RepositoryFactory.getUserRepository();
      AuthContainer.loginUseCase = new LoginUseCase(repository);
    }
    return AuthContainer.loginUseCase;
  }

  static getRegisterUseCase(): RegisterUseCase {
    if (!AuthContainer.registerUseCase) {
      const repository = RepositoryFactory.getUserRepository();
      AuthContainer.registerUseCase = new RegisterUseCase(repository);
    }
    return AuthContainer.registerUseCase;
  }

  static getLogoutUseCase(): LogoutUseCase {
    if (!AuthContainer.logoutUseCase) {
      const repository = RepositoryFactory.getUserRepository();
      AuthContainer.logoutUseCase = new LogoutUseCase(repository);
    }
    return AuthContainer.logoutUseCase;
  }

  static getGetCurrentUserUseCase(): GetCurrentUserUseCase {
    if (!AuthContainer.getCurrentUserUseCase) {
      const repository = RepositoryFactory.getUserRepository();
      AuthContainer.getCurrentUserUseCase = new GetCurrentUserUseCase(repository);
    }
    return AuthContainer.getCurrentUserUseCase;
  }

  static getUpdateProfileUseCase(): UpdateProfileUseCase {
    if (!AuthContainer.updateProfileUseCase) {
      const repository = RepositoryFactory.getUserRepository();
      AuthContainer.updateProfileUseCase = new UpdateProfileUseCase(repository);
    }
    return AuthContainer.updateProfileUseCase;
  }

  static getChangePasswordUseCase(): ChangePasswordUseCase {
    if (!AuthContainer.changePasswordUseCase) {
      const repository = RepositoryFactory.getUserRepository();
      AuthContainer.changePasswordUseCase = new ChangePasswordUseCase(repository);
    }
    return AuthContainer.changePasswordUseCase;
  }

  static reset(): void {
    AuthContainer.loginUseCase = null;
    AuthContainer.registerUseCase = null;
    AuthContainer.logoutUseCase = null;
    AuthContainer.getCurrentUserUseCase = null;
    AuthContainer.updateProfileUseCase = null;
    AuthContainer.changePasswordUseCase = null;
    RepositoryFactory.reset();
  }
}
