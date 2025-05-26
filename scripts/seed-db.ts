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
    // New categories
    {
      name: 'Bug Reports',
      description: 'Report bugs and issues with the platform',
      slug: 'bug-reports',
      icon: 'HelpCircle', // changed from 'Bug'
      order: 7,
    },
    {
      name: 'Showcase',
      description: 'Show off your projects and achievements',
      slug: 'showcase',
      icon: 'Lightbulb', // changed from 'Star'
      order: 8,
    },
    {
      name: 'Help Needed',
      description: 'Ask for help on specific problems',
      slug: 'help-needed',
      icon: 'HelpCircle', // changed from 'LifeBuoy'
      order: 9,
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
      clerkId: 'seed-admin', // ensure unique clerkId
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
      clerkId: 'seed-user', // ensure unique clerkId
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
  const bugCategory = await Category.findOne({ slug: 'bug-reports' });
  const showcaseCategory = await Category.findOne({ slug: 'showcase' });
  const helpNeededCategory = await Category.findOne({ slug: 'help-needed' });

  if (generalCategory && introCategory && devCategory && admin && regularUser && bugCategory && showcaseCategory && helpNeededCategory) {
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

    // New: Bug Reports thread
    const bugThread = new Thread({
      title: 'Login page throws error on mobile',
      slug: 'login-page-mobile-error',
      content: 'I encountered a bug where the login page fails to load on iOS Safari. Anyone else seeing this?',
      author: regularUser._id,
      category: bugCategory._id,
      isSticky: true,
      viewCount: 30,
      tags: ['bug', 'login', 'mobile', 'Bug Reports'],
    });
    await bugThread.save();

    // New: Showcase thread
    const showcaseThread = new Thread({
      title: 'My Portfolio: Built with Next.js & Tailwind',
      slug: 'portfolio-nextjs-tailwind',
      content: 'Excited to share my new portfolio site! Built with Next.js 15, Tailwind CSS, and deployed on Vercel. Feedback welcome!',
      author: admin._id,
      category: showcaseCategory._id,
      isSticky: false,
      viewCount: 60,
      tags: ['showcase', 'portfolio', 'nextjs', 'Showcase'],
    });
    await showcaseThread.save();

    // New: Help Needed thread
    const helpThread = new Thread({
      title: 'Help Needed: Debugging React hydration error',
      slug: 'help-needed-react-hydration',
      content: 'I keep getting a hydration error in my React app after upgrading to React 19. Any tips on how to debug this?',
      author: regularUser._id,
      category: helpNeededCategory._id,
      isSticky: false,
      viewCount: 22,
      tags: ['help', 'react', 'hydration', 'Help Needed'],
    });
    await helpThread.save();

    // Add more sample threads for density
    const threadDocs = [];
    const threads = [
      {
        title: 'Showcase: Open Source Task Manager',
        slug: 'showcase-open-source-task-manager',
        content: 'Check out my open source task manager app! Built with MongoDB, Express, React, and Node.js.',
        author: admin._id,
        category: showcaseCategory._id,
        isSticky: false,
        viewCount: 40,
        tags: ['showcase', 'mern', 'open-source', 'Showcase'],
      },
      {
        title: 'Bug: Polls not saving votes',
        slug: 'bug-polls-not-saving',
        content: 'When I vote in a poll, the vote doesn\'t seem to be saved. Anyone else?',
        author: regularUser._id,
        category: bugCategory._id,
        isSticky: false,
        viewCount: 18,
        tags: ['bug', 'polls', 'Bug Reports'],
      },
      {
        title: 'Help Needed: CSS Grid vs Flexbox',
        slug: 'help-css-grid-vs-flexbox',
        content: 'Which layout system do you prefer for responsive design, and why? I\'m struggling to choose.',
        author: admin._id,
        category: helpNeededCategory._id,
        isSticky: false,
        viewCount: 25,
        tags: ['help', 'css', 'layout', 'Help Needed'],
      },
      {
        title: 'Showcase: Community Forum Dark Mode',
        slug: 'showcase-forum-dark-mode',
        content: 'Just launched a dark mode toggle for our forum! Try it out and let me know what you think.',
        author: regularUser._id,
        category: showcaseCategory._id,
        isSticky: false,
        viewCount: 33,
        tags: ['showcase', 'dark-mode', 'feature', 'Showcase'],
      },
      {
        title: 'Bug: Notification emails delayed',
        slug: 'bug-notification-emails-delayed',
        content: 'I\'ve noticed that notification emails are sometimes delayed by several hours.',
        author: admin._id,
        category: bugCategory._id,
        isSticky: false,
        viewCount: 12,
        tags: ['bug', 'notifications', 'Bug Reports'],
      },
    ];
    for (const t of threads) {
      const threadDoc = new Thread(t);
      await threadDoc.save();
      threadDocs.push(threadDoc);
    }

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

    // Add more replies to new threads for density
    const replies = [
      {
        content: 'Thanks for reporting this bug! We\'re looking into the login issue.',
        author: admin._id,
        thread: bugThread._id,
      },
      {
        content: 'Great portfolio! Love the clean design and fast load times.',
        author: regularUser._id,
        thread: showcaseThread._id,
      },
      {
        content: 'Try using React DevTools to inspect hydration issues. Also, check for mismatched server/client markup.',
        author: admin._id,
        thread: helpThread._id,
      },
      {
        content: 'I prefer CSS Grid for complex layouts, but Flexbox is great for 1D alignment.',
        author: regularUser._id,
        thread: helpThread._id,
      },
      {
        content: 'We\'re aware of the poll bug and are working on a fix.',
        author: admin._id,
        thread: threadDocs[1]._id, // bug-polls-not-saving
      },
      {
        content: 'Dark mode looks awesome! Thanks for adding this feature.',
        author: admin._id,
        thread: threadDocs[3]._id, // showcase-forum-dark-mode
      },
      {
        content: 'We\'ll investigate the email delay issue. Thanks for your patience.',
        author: regularUser._id,
        thread: threadDocs[4]._id, // bug-notification-emails-delayed
      },
    ];
    for (const r of replies) {
      const post = new Post(r);
      await post.save();
    }
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
