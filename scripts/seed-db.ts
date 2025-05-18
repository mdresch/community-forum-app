// scripts/seed-db.ts
import mongoose from 'mongoose';
import path from 'path';
import { config } from 'dotenv';
import * as fs from 'fs';

// Load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  config({ path: envPath });
  console.log('Loaded environment variables from .env.local');
} else {
  console.warn('.env.local file not found');
}

import { connectToDatabase } from '../lib/db';
import { Category, User, Thread, Post } from '../models';
import bcrypt from 'bcrypt';

async function seedData() {
  console.log('Connecting to database...');
  await connectToDatabase();
  
  console.log('Seeding categories...');
  const categories = [
    {
      name: 'General Discussion',
      description: 'Chat about anything and everything',
      slug: 'general-discussion',
      icon: 'MessageSquare',
      order: 1,
    },
    {
      name: 'Introductions',
      description: 'Introduce yourself to the community',
      slug: 'introductions',
      icon: 'Users',
      order: 2,
    },
    {
      name: 'Development',
      description: 'Discuss programming and development',
      slug: 'development',
      icon: 'Code',
      order: 3,
    },
    {
      name: 'Ideas & Feedback',
      description: 'Share your ideas and give feedback',
      slug: 'ideas-feedback',
      icon: 'Lightbulb',
      order: 4,
    },
    {
      name: 'Help & Support',
      description: 'Get help from the community',
      slug: 'help-support',
      icon: 'HelpCircle',
      order: 5,
    },
    {
      name: 'Jobs & Opportunities',
      description: 'Find or post job opportunities',
      slug: 'jobs-opportunities',
      icon: 'Briefcase',
      order: 6,
    },
  ];
  
  // Clear existing categories first
  await Category.deleteMany({});
  
  // Insert new categories
  await Category.insertMany(categories);
  
  console.log('Seeding admin user...');
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  // Create admin user
  const admin = await User.findOneAndUpdate(
    { email: 'admin@example.com' },
    {
      username: 'admin',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
    },
    { upsert: true, new: true }
  );

  // Create regular user
  const regularUser = await User.findOneAndUpdate(
    { email: 'user@example.com' },
    {
      username: 'testuser',
      email: 'user@example.com',
      password: await bcrypt.hash('password123', 10),
      role: 'user',
      bio: 'Just a regular community member who loves to engage in discussions.',
    },
    { upsert: true, new: true }
  );

  console.log('Seeding threads and posts...');
  // Clear existing threads and posts
  await Thread.deleteMany({});
  await Post.deleteMany({});

  // Get the category IDs
  const generalCategory = await Category.findOne({ slug: 'general-discussion' });
  const introCategory = await Category.findOne({ slug: 'introductions' });
  const devCategory = await Category.findOne({ slug: 'development' });

  if (generalCategory && introCategory && devCategory && admin && regularUser) {
    // Create sample threads
    const welcomeThread = new Thread({
      title: 'Welcome to our Community Forum!',
      slug: 'welcome-to-our-community-forum',
      content: 'Hello everyone! Welcome to our new community forum. This is a place where we can all come together to discuss topics, share ideas, and connect with like-minded people. Feel free to introduce yourself and start engaging with the community!',
      author: admin._id,
      category: generalCategory._id,
      isSticky: true,
      viewCount: 125,
      tags: ['welcome', 'announcement'],
    });
    await welcomeThread.save();

    const introThread = new Thread({
      title: 'Introduce Yourself Here',
      slug: 'introduce-yourself-here',
      content: 'Use this thread to introduce yourself to the community! Share your interests, what brought you here, and anything else you\'d like others to know about you.',
      author: admin._id,
      category: introCategory._id,
      isSticky: true,
      viewCount: 85,
      tags: ['introductions', 'community'],
    });
    await introThread.save();

    const devThread = new Thread({
      title: 'What\'s your favorite development stack in 2025?',
      slug: 'favorite-development-stack-2025',
      content: 'As we\'re moving through 2025, I\'m curious what development stacks people are finding most productive. Are you using Next.js? React? Vue? Something else entirely? Let\'s discuss the pros and cons!',
      author: regularUser._id,
      category: devCategory._id,
      viewCount: 42,
      tags: ['development', 'tech', 'discussion'],
    });
    await devThread.save();

    // Create sample posts (replies)
    const welcomeReply1 = new Post({
      content: 'Thanks for creating this forum! Looking forward to engaging with everyone here.',
      author: regularUser._id,
      thread: welcomeThread._id,
    });
    await welcomeReply1.save();

    const welcomeReply2 = new Post({
      content: 'Welcome to all new members! Feel free to ask any questions if you need help navigating the forum.',
      author: admin._id,
      thread: welcomeThread._id,
    });
    await welcomeReply2.save();

    const devReply = new Post({
      content: 'I\'ve been really enjoying the Next.js 15 + React 19 combination. The server components are a game changer for performance!',
      author: admin._id,
      thread: devThread._id,
    });
    await devReply.save();

    const devReply2 = new Post({
      content: 'Vue 4 has also made some great strides. It\'s worth checking out if you haven\'t looked at it recently.',
      author: regularUser._id,
      thread: devThread._id,
    });
    await devReply2.save();
  }
  
  console.log('Seeding complete!');
  await mongoose.disconnect();
}

seedData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error seeding data:', error);
    process.exit(1);
  });
