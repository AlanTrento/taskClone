import mongoose, { Schema, type Document, type Types } from 'mongoose';

export interface ITaskDocument extends Document {
  title: string;
  description?: string;
  completed: boolean;
  starred: boolean;
  listId: Types.ObjectId;
  userId: Types.ObjectId;
  dueDate?: Date;
  dueTime?: string;
  starredAt?: Date;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITaskDocument>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    completed: { type: Boolean, default: false },
    starred: { type: Boolean, default: false },
    listId: { type: Schema.Types.ObjectId, ref: 'TaskList', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    dueDate: { type: Date },
    dueTime: { type: String, match: /^\d{2}:\d{2}$/ },
    starredAt: { type: Date },
    order: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  },
);

TaskSchema.index({ userId: 1 });
TaskSchema.index({ userId: 1, listId: 1 });
TaskSchema.index({ userId: 1, completed: 1 });
TaskSchema.index({ listId: 1 });

export const TaskModel = mongoose.model<ITaskDocument>('Task', TaskSchema);
