import mongoose, { Schema, type Document, type Types } from 'mongoose';

export interface ITaskListDocument extends Document {
  name: string;
  color: string;
  order: number;
  userId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const TaskListSchema = new Schema<ITaskListDocument>(
  {
    name: { type: String, required: true, trim: true },
    color: { type: String, required: true },
    order: { type: Number, default: 0 },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  },
);

TaskListSchema.index({ userId: 1 });
TaskListSchema.index({ userId: 1, order: 1 });

export const TaskListModel = mongoose.model<ITaskListDocument>('TaskList', TaskListSchema);
