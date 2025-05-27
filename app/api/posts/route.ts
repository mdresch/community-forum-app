import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Post from '@/models/Post';
import { currentUser } from "@clerk/nextjs/server"; // or "@clerk/nextjs/api" for API routes
import User from '@/models/User'; // Changed from { User } to default import

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const url = new URL(request.url);
    const threadId = url.searchParams.get('thread');
    const today = url.searchParams.get('today');
    
    // Handle 'today' parameter for admin dashboard
    if (today === '1') {
      // Get posts from today (last 24 hours)
      const oneDayAgo = new Date();
      oneDayAgo.setDate(oneDayAgo.getDate() - 1);
      
      const todayPosts = await Post.find({
        createdAt: { $gte: oneDayAgo }
      });
      
      return NextResponse.json(todayPosts);
    }
    
    // Regular post fetching by thread ID
    if (!threadId) {
      return NextResponse.json(
        { message: 'Thread ID is required when not using other filters' },
        { status: 400 }
      );
    }
    
    const posts = await Post.find({ thread: threadId, parentPost: null })
      .populate({
        path: 'author',
        select: '_id username avatar bio joinDate'
      })
      .sort({ createdAt: 1 });
    
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json(
      { message: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the authenticated user from Clerk
    const user = await currentUser();
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Connect to the database
    await connectToDatabase();
    
    // Get the request body
    const { content, thread } = await request.json();
    
    // Find the internal user ID based on the Clerk ID
    const dbUser = await User.findOne({ clerkId: user.id });
    if (!dbUser) {
      return NextResponse.json(
        { message: 'User not found in database' },
        { status: 404 }
      );
    }

    // Create the post with the internal user ID
    const newPost = await Post.create({
      content,
      thread,
      author: dbUser._id, // Use the MongoDB ObjectId here
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { message: 'Failed to create post', error: (error as Error).message },
      { status: 500 }
    );
  }
}