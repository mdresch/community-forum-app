const mongoose = require('mongoose');

const postTagSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: true
  },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tag',
    required: true
  }
}, {
  timestamps: true
});

postTagSchema.index({ post: 1, tag: 1 }, { unique: true });

module.exports = mongoose.models.PostTag || mongoose.model('PostTag', postTagSchema);
