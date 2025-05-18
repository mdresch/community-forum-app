// scripts/seed.ts
import mongoose, { Document } from "mongoose"; // Import Document
import dotenv from "dotenv";
import bcrypt from 'bcrypt';
// Import your models and their interfaces
import { User, Category, Thread } from '../models'; // Removed IUser, ICategory as they are not exported

dotenv.config({ path: '.env.local' });

interface CategoryDoc extends Document {
  slug: string;
}


const seedData = {
  users: [
    {
      username: "alice92",
      email: "alice@example.com",
      name: "Alice Johnson",
      avatar: "https://avatars.githubusercontent.com/u/1?v=4",
      password: 'password123'
    },
    {
      username: "developer_bob",
      email: "bob@example.com",
      name: "Bob Smith",
      avatar: "https://avatars.githubusercontent.com/u/2?v=4",
      password: 'password123'
    },
  ],
  categories: [
    {
      name: "General Discussion",
      description: "Chat about anything and everything",
      slug: "general-discussion"
    },
    {
      name: "Development",
      description: "Discuss programming and development",      
      slug: "development",
    },
    {
      name: 'Introductions',
      description: 'Introduce yourself to the community',
      slug: 'introductions',
    },
  ],  
  threads: [
    {
      title: "How to improve code performance?",
      content: "I'm working on a Node.js application and I'm having trouble with performance. Any tips?",
      author: "alice92",
      category: "development",
      slug: "how-to-improve-code-performance"
    },
    {
      title: "Best practices for API design",
      content: "What are some best practices for designing RESTful APIs?",
      author: "developer_bob",
      category: "development",
      slug: "best-practices-for-api-design"
    }
  ]
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
await mongoose.connect(process.env.MONGODB_URI || "", {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000
    });

    console.log("Connected to MongoDB");

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Thread.deleteMany({}),
      Category.deleteMany({})
    ]);
    console.log("Cleared existing data");

    // Create users with hashed passwords
    const usersToCreate = await Promise.all(
      seedData.users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return { ...user, password: hashedPassword };
      })
    );
    const users = await User.insertMany(usersToCreate);
    console.log(`Created ${users.length} users`);

    // Create categories
    const categories = await Category.insertMany(seedData.categories);
    console.log(`Created ${categories.length} categories`);

    // Create threads with references to users and categories
    const createdThreads = await Promise.all(
      seedData.threads.map(async (thread) => {
        const author = users.find(u => u.username === thread.author); // Let TypeScript infer the type of u
        const category = categories.find((c: CategoryDoc) => c.slug === thread.category); // Explicitly type c
        
        if (!author) {
          console.warn(`Author with username "${thread.author}" not found for thread "${thread.title}". Skipping thread.`);
          return null;
        }
        if (!category) {
          console.warn(`Category with slug "${thread.category}" not found for thread "${thread.title}". Skipping thread.`);
          return null;
        }
        
        return Thread.create({
          title: thread.title,
          content: thread.content,
          author: author._id, // Use the ObjectId of the author document
          category: category._id, // Use the ObjectId of the category document
          slug: thread.slug,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      })
    );
    // Filter out any nulls if threads were skipped
    const validThreads = createdThreads.filter(t => t !== null);
    console.log(`Created ${validThreads.length} threads`);

    console.log("Database seeding completed successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    // Close the database connection
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

seedDatabase();