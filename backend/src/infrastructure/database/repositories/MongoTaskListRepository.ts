import type { ITaskListRepository } from '../../../application/interfaces/ITaskListRepository.js';
import type { TaskList } from '../../../domain/entities/TaskList.js';
import { TaskListModel, type ITaskListDocument } from '../mongoose/schemas/TaskListSchema.js';

function toDomain(doc: ITaskListDocument): TaskList {
  return {
    id: doc._id.toString(),
    name: doc.name,
    color: doc.color,
    order: doc.order,
    userId: doc.userId.toString(),
  };
}

export class MongoTaskListRepository implements ITaskListRepository {
  async findAll(userId: string): Promise<TaskList[]> {
    const docs = await TaskListModel.find({ userId }).sort({ order: 1 });
    return docs.map(toDomain);
  }

  async findById(id: string, userId: string): Promise<TaskList | null> {
    const doc = await TaskListModel.findOne({ _id: id, userId });
    if (!doc) return null;
    return toDomain(doc);
  }

  async create(data: Omit<TaskList, 'id'>): Promise<TaskList> {
    const doc = await TaskListModel.create({
      name: data.name,
      color: data.color,
      order: data.order,
      userId: data.userId,
    });
    return toDomain(doc);
  }

  async update(
    id: string,
    userId: string,
    updates: Partial<Omit<TaskList, 'id' | 'userId'>>,
  ): Promise<TaskList> {
    const doc = await TaskListModel.findOneAndUpdate(
      { _id: id, userId },
      { $set: updates },
      { new: true },
    );
    if (!doc) throw new Error('Task list not found');
    return toDomain(doc);
  }

  async delete(id: string, userId: string): Promise<void> {
    await TaskListModel.findOneAndDelete({ _id: id, userId });
  }

  async getMaxOrder(userId: string): Promise<number> {
    const result = await TaskListModel.findOne({ userId }).sort({ order: -1 }).select('order');
    return result?.order ?? -1;
  }
}
