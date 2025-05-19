import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  clerkId: string;
  username: string;
  email: string;
  password?: string; // Optional when using Clerk
  avatar?: string;
  bio?: string;
  joinDate: Date;
  role: 'user' | 'moderator' | 'admin';
  isActive: boolean;
  comparePassword(candidatePassword: string): Promise<boolean>;
  name?: string;
  location?: string;
  website?: string;
  postCount?: number;
  threadCount?: number;
  reputation?: number;
  badges?: { id: number; name: string; count: number; variant: string }[];
}

const UserSchema: Schema = new Schema(
  {
    clerkId: { type: String, unique: true, index: true, default: '' }, // Clerk user ID for Clerk integration
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [30, 'Username cannot exceed 30 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address'],
    },
    password: {
      type: String,
      required: function() {
        // Password is only required if there's no Clerk ID
        return !(this as any).clerkId;
      },
      minlength: [8, 'Password must be at least 8 characters'],
    },
    avatar: {
      type: String,
      default: '', // Default avatar URL can be set here
    },
    bio: {
      type: String,
      maxlength: [500, 'Bio cannot exceed 500 characters'],
      default: '',
    },
    joinDate: {
      type: Date,
      default: Date.now,
    },
    role: {
      type: String,
      enum: ['user', 'moderator', 'admin'],
      default: 'user',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    name: {
      type: String,
      maxlength: [100, 'Name cannot exceed 100 characters'],
      default: '',
    },
    location: {
      type: String,
      maxlength: [100, 'Location cannot exceed 100 characters'],
      default: '',
    },
    website: {
      type: String,
      maxlength: [200, 'Website cannot exceed 200 characters'],
      default: '',
    },
    postCount: {
      type: Number,
      default: 0,
    },
    threadCount: {
      type: Number,
      default: 0,
    },
    reputation: {
      type: Number,
      default: 0,
    },
    badges: [
      {
        id: Number,
        name: String,
        count: Number,
        variant: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Password hashing middleware
UserSchema.pre('save', async function (next) {
  // Skip if password isn't modified or if it's undefined/null
  if (!this.isModified('password') || !this.password) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as string, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function (candidatePassword: string) {
  // If there's no password (Clerk user), always return false
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password as string);
};

// If the model already exists, use it. Otherwise, create it.
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
