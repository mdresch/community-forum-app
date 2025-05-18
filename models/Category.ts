import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  description: string;
  slug: string;
  icon: string;
  order: number;
  isActive: boolean;
  threads: mongoose.Types.ObjectId[];
  threadCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  icon: {
    type: String,
    required: true,
    enum: ['MessageSquare', 'Users', 'Code', 'Book', 'Globe', 'Settings']
  },
  order: {
    type: Number,
    required: true,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  threads: [{
    type: Schema.Types.ObjectId,
    ref: 'Thread'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for thread count
categorySchema.virtual('threadCount', {
  ref: 'Thread',
  localField: '_id',
  foreignField: 'category',
  count: true
});

export const Category = mongoose.models.Category || mongoose.model<ICategory>('Category', categorySchema);