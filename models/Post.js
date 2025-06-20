const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Post content is required'],
    minlength: [1, 'Content cannot be empty'],
    maxlength: [5000, 'Content cannot exceed 5000 characters']
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Author reference is required']
  },
  thread: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Thread',
    required: [true, 'Thread reference is required']
  },
  parentPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    default: null
  },
  isEdited: {
    type: Boolean,
    default: false
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  likes: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    default: []
  },
  reportCount: {
    type: Number,
    default: 0
  },
  reports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Report'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for replies (nested comments)
postSchema.virtual('replies', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'parentPost'
});

// Update thread lastActivity timestamp when a post is created or content is modified
postSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('content')) {
    try {
      await mongoose.model('Thread').updateOne(
        { _id: this.thread },
        { $set: { lastActivity: Date.now() } }
      );
      next();
    } catch (error) {
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

module.exports = mongoose.models.Post || mongoose.model('Post', postSchema);
