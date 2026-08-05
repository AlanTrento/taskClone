import type { ITaskRepository } from '../../../application/interfaces/ITaskRepository.js';
import type { Task } from '../../../domain/entities/Task.js';
import { TaskModel, type ITaskDocument } from '../mongoose/schemas/TaskSchema.js';

function toDomain(doc: ITaskDocument): Task {
  return {
    id: doc._id.toString(),
    title: doc.title,
    description: doc.description,
    completed: doc.completed,
    starred: doc.starred,
    listId: doc.listId.toString(),
    userId: doc.userId.toString(),
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
    dueDate: doc.dueDate,
    dueTime: doc.dueTime,
    starredAt: doc.starredAt,
    order: doc.order,
  };
}

export class MongoTaskRepository implements ITaskRepository {
  async findAll(
    userId: string,
    filters?: { listId?: string; completed?: boolean; starred?: boolean },
  ): Promise<Task[]> {
    const query: Record<string, unknown> = { userId };
    if (filters?.listId) query.listId = filters.listId;
    if (filters?.completed !== undefined) query.completed = filters.completed;
    if (filters?.starred !== undefined) query.starred = filters.starred;

    const docs = await TaskModel.find(query).sort({ order: 1 });
    return docs.map(toDomain);
  }

  async findById(id: string, userId: string): Promise<Task | null> {
    const doc = await TaskModel.findOne({ _id: id, userId });
    if (!doc) return null;
    return toDomain(doc);
  }

  async create(data: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
    const doc = await TaskModel.create({
      title: data.title,
      description: data.description,
      completed: data.completed,
      starred: data.starred,
      listId: data.listId,
      userId: data.userId,
      dueDate: data.dueDate,
      dueTime: data.dueTime,
      starredAt: data.starredAt,
      order: data.order,
    });
    return toDomain(doc);
  }

  async update(
    id: string,
    userId: string,
    updates: Partial<Omit<Task, 'id' | 'createdAt' | 'userId'>>,
  ): Promise<Task> {
    const doc = await TaskModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: updates },
      { new: true },
    );
    if (!doc) throw new Error('Task not found');
    return toDomain(doc);
  }

  async delete(id: string, userId: string): Promise<void> {
    await TaskModel.findOneAndDelete({ _id: id, userId });
  }

  async deleteByListId(listId: string, userId: string): Promise<void> {
    await TaskModel.deleteMany({ listId, userId });
  }

  async deleteCompletedByListId(listId: string, userId: string): Promise<void> {
    await TaskModel.deleteMany({ listId, userId, completed: true });
  }

  async markOldAsCompleted(listId: string, userId: string, olderThanDays: number): Promise<void> {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - olderThanDays);

    await TaskModel.updateMany(
      { listId, userId, completed: false, createdAt: { $lt: cutoff } },
      { $set: { completed: true } },
    );
  }

  async getMaxOrder(userId: string): Promise<number> {
    const result = await TaskModel.findOne({ userId }).sort({ order: -1 }).select('order');
    return result?.order ?? -1;
  }
}
