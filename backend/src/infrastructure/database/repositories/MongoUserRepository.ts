import type { IUserRepository, RegisterRequest } from '../../../application/interfaces/IUserRepository.js';
import type { User } from '../../../domain/entities/User.js';
import { UserModel, type IUserDocument } from '../mongoose/schemas/UserSchema.js';

function toDomain(doc: IUserDocument): User {
  return {
    id: doc._id.toString(),
    name: doc.name,
    email: doc.email,
    photo: doc.photo,
    birthdate: doc.birthdate,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

export class MongoUserRepository implements IUserRepository {
  async findByEmail(email: string): Promise<(User & { password: string }) | null> {
    const doc = await UserModel.findOne({ email: email.toLowerCase() }).select('+password');
    if (!doc) return null;
    return { ...toDomain(doc), password: doc.password };
  }

  async findById(id: string): Promise<User | null> {
    const doc = await UserModel.findById(id);
    if (!doc) return null;
    return toDomain(doc);
  }

  async create(data: RegisterRequest): Promise<User> {
    const doc = await UserModel.create({
      name: data.name,
      email: data.email.toLowerCase(),
      password: data.password, // Will be hashed by the use case
    });
    return toDomain(doc);
  }

  async updateProfile(userId: string, updates: Partial<Pick<User, 'name' | 'photo' | 'birthdate'>>): Promise<User> {
    const doc = await UserModel.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true },
    );
    if (!doc) throw new Error('Usuário não encontrado');
    return toDomain(doc);
  }

  async updatePassword(userId: string, hashedPassword: string): Promise<void> {
    await UserModel.findByIdAndUpdate(userId, { $set: { password: hashedPassword } });
  }
}
