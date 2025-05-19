import mongoose, { Schema, Document } from 'mongoose';

export interface IReport extends Document {
  reporter: mongoose.Types.ObjectId; // User who reported
  targetType: 'post' | 'thread' | 'user'; // What is being reported
  targetId: mongoose.Types.ObjectId; // ID of the post/thread/user
  reason: string;
  status: 'Pending' | 'Reviewed' | 'Resolved' | 'Rejected';
  priority: 'Low' | 'Medium' | 'High';
  createdAt: Date;
  updatedAt: Date;
}

const ReportSchema: Schema = new Schema(
  {
    reporter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    targetType: { type: String, enum: ['post', 'thread', 'user'], required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Reviewed', 'Resolved', 'Rejected'], default: 'Pending' },
    priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
  },
  { timestamps: true }
);

export default mongoose.models.Report || mongoose.model<IReport>('Report', ReportSchema);