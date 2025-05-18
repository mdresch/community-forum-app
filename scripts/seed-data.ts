// scripts/seed-data.ts
import mongoose from 'mongoose';
import connectToDatabase from '../lib/db';
import { Category, User } from '../models';
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
    // Add more categories as needed
  ];
  
  // Clear existing categories first
  await Category.deleteMany({});
  
  // Insert new categories
  await Category.insertMany(categories);
  
  console.log('Seeding admin user...');
  const adminPassword = await bcrypt.hash('admin123', 10);
  
  // Create admin user
  await User.findOneAndUpdate(
    { email: 'admin@example.com' },
    {
      username: 'admin',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin',
    },
    { upsert: true, new: true }
  );
  
  console.log('Seeding complete!');
  await mongoose.disconnect();
}

seedData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Error seeding data:', error);
    process.exit(1);
  });