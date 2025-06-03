const mongoose = require('mongoose');

const moderationSchema = new mongoose.Schema({
  moderator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    enum: ['Ban', 'Unban', 'Delete Post', 'Edit Post'],
    required: true
  },
  target_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  target_post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    default: null
  },
  reason: {
    type: String,
    default: ''
  }
}, {
  timestamps: { createdAt: true, updatedAt: false }
});

module.exports = mongoose.models.Moderation || mongoose.model('Moderation', moderationSchema);
