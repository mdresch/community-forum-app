import mongoose from 'mongoose';
import User from '../models/User';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test';

async function migrate() {
  await mongoose.connect(MONGODB_URI);
  const users = await User.find({ clerkId: { $exists: false } });
  for (const user of users) {
    // You may want to set this to a real Clerk ID if you have a mapping
    user.clerkId = '';
    await user.save();
    console.log(`Updated user ${user.username} (${user.email}) with empty clerkId.`);
  }
  console.log('Migration complete.');
  await mongoose.disconnect();
}

migrate().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
