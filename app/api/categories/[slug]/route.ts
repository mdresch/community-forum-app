import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Category } from '@/models/Category';
import Thread from '@/models/Thread';
import User from '@/models/User';

// GET /api/categories/[slug]
export async function GET(request, context) {
  const { params } = context;
  const { slug } = await params;
  try {
    await connectToDatabase();

    // Find the category by slug
    const category = await Category.findOne({ slug });
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Find threads for this category, populate author
    const threads = await Thread.find({ category: category._id })
      .populate('author', 'name avatar username')
      .sort({ isPinned: -1, createdAt: -1 });

    // Format threads for the frontend
    const formattedThreads = threads.map(thread => ({
      id: thread._id,
      title: thread.title,
      content: thread.content,
      author: thread.author,
      isPinned: thread.isPinned,
      isLocked: thread.isLocked,
      replies: thread.repliesCount || 0, // You may need to calculate this
      views: thread.views || 0,
      likes: thread.likes || 0,
      lastActivity: thread.updatedAt || thread.createdAt,
      tags: thread.tags || [],
      slug: thread.slug,
    }));

    return NextResponse.json({
      category: {
        _id: category._id,
        name: category.name,
        description: category.description,
        slug: category.slug,
      },
      threads: formattedThreads,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
