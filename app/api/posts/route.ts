import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import Post from '@/models/Post';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const url = new URL(request.url);
    const threadId = url.searchParams.get('thread');
    
    if (!threadId) {
      return NextResponse.json(
        { message: 'Thread ID is required' },
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
    await connectToDatabase();
    
    const user = await getUserFromRequest(request);
    if (!user) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { content, thread, parentPost } = await request.json();
    
    // Use user._id if available, otherwise fallback to user.id or user.sub
    const authorId = (user && (user._id || user.id || user.sub)) ? (user._id || user.id || user.sub) : user;

    const newPost = new Post({
      content,
      author: authorId,
      thread,
      parentPost: parentPost || null,
    });
    
    await newPost.save();
    
    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json(
      { message: 'Failed to fetch posts' },
      { status: 500 }
    );
  }
}