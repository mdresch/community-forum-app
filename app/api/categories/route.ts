import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Category } from '@/models/Category';
import Thread from '@/models/Thread';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Get all active categories
    const categories = await Category.find({ isActive: true }).sort({ order: 1 }).lean();

    // For each category, count threads
    const categoriesWithThreadCount = await Promise.all(
      categories.map(async (category: any) => {
        const threadCount = await Thread.countDocuments({ category: category._id });
        return {
          ...category,
          threadCount,
        };
      })
    );

    return NextResponse.json(categoriesWithThreadCount);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { message: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const { name, description, slug, icon, parentCategory } = await request.json();
    
    const newCategory = new Category({
      name,
      description,
      slug,
      icon,
      parentCategory: parentCategory || null,
    });
    
    await newCategory.save();
    
    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    return NextResponse.json(
      { message: 'Failed to create category' },
      { status: 500 }
    );
  }
}