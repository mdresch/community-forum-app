const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
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
    enum: ['MessageSquare', 'Users', 'Code', 'Book', 'Globe', 'Settings', 'Lightbulb', 'HelpCircle', 'Briefcase']
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
    type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.models.Category || mongoose.model('Category', categorySchema);
