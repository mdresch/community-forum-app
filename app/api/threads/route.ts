import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Thread from '@/models/Thread';
import { getUserFromRequest } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const url = new URL(request.url);
    const categoryId = url.searchParams.get('category');
    
    const query = categoryId ? { category: categoryId } : {};
    
    const threads = await Thread.find(query)
      .populate('author', 'username avatar')
      .sort({ lastActivity: -1 })
      .limit(20);
    
    return NextResponse.json(threads);
  } catch (error) {
    console.error('Error fetching threads:', error);
    return NextResponse.json(
      { message: 'Failed to fetch threads' },
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
    
    const { title, content, category, tags } = await request.json();
    
    // Generate a slug from the title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
    
    const newThread = new Thread({
      title,
      slug,
      content,
      author: user.id,
      category,
      tags: tags || [],
    });
    
    await newThread.save();
    
    return NextResponse.json(newThread, { status: 201 });
  } catch (error) {
    console.error('Error creating thread:', error);
    return NextResponse.json(
      { message: 'Failed to create thread' },
      { status: 500 }
    );
  }
}