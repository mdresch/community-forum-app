import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './User';
import { IThread } from './Thread';

export interface IPost extends Document {
  content: string;
  author: mongoose.Types.ObjectId | IUser;
  thread: mongoose.Types.ObjectId | IThread;
  parentPost?: mongoose.Types.ObjectId;
  isEdited: boolean;
  isDeleted: boolean;
  likes: mongoose.Types.ObjectId[];
}

const PostSchema: Schema = new Schema(
  {
    content: {
      type: String,
      required: [true, 'Post content is required'],
      minlength: [1, 'Content cannot be empty'],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Author reference is required'],
    },
    thread: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Thread',
      required: [true, 'Thread reference is required'],
    },
    parentPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      default: null,
    },
    isEdited: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
      default: []
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for replies (nested comments)
PostSchema.virtual('replies', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'parentPost',
});

// Update thread lastActivity timestamp when a post is created or content is modified
PostSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('content')) {
    try {
      await mongoose.model('Thread').updateOne(
        { _id: this.thread },
        { $set: { lastActivity: Date.now() } }
      );
      next();
    } catch (error: unknown) {
      console.error('Error in Post pre-save hook:', {
        error: error instanceof Error ? error.message : String(error),
        operation: this.isNew ? 'new_post' : 'content_modification',
        threadId: this.thread,
        stack: error instanceof Error ? error.stack : undefined
      });
      next(error);
    }
  } else {
    next();
  }
});

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
