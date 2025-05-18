import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { Category } from '@/models/Category';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    // Use populate to get the threadCount virtual
    const categories = await Category.find({ isActive: true })
      .sort({ order: 1 })
      .populate('threadCount')
      .exec();

    // Map to include threadCount (virtual) for each category
    const categoriesWithThreadCount = categories.map(category => ({
      ...category.toObject(),
      threadCount: category.threadCount || 0
    }));

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