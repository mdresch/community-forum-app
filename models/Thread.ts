import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { ICategory } from './Category';

export interface IThread extends Document {
  title: string;
  slug: string;
  content: string;
  author: mongoose.Types.ObjectId | IUser;
  category: mongoose.Types.ObjectId | ICategory;
  isSticky: boolean;
  isLocked: boolean;
  viewCount: number;
  likes: mongoose.Types.ObjectId[]; // Array of user IDs who liked/upvoted
  lastActivity: Date;
  tags: string[];
}

const ThreadSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Thread title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Thread content is required'],
      minlength: [10, 'Content must be at least 10 characters'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    isSticky: {
      type: Boolean,
      default: false,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
    likes: [{
      type: Schema.Types.ObjectId,
      ref: 'User',
      default: [],
    }],
    lastActivity: {
      type: Date,
      default: Date.now,
    },
    tags: [{
      type: String,
      trim: true,
    }],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for thread replies
ThreadSchema.virtual('replies', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'thread',
});

// Virtual for reply count
ThreadSchema.virtual('replyCount', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'thread',
  count: true,
});

export default mongoose.models.Thread || mongoose.model<IThread>('Thread', ThreadSchema);
