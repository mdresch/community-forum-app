import { NextRequest, NextResponse } from 'next/server';
import { Clerk } from '@clerk/nextjs/server';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.CLERK_SECRET_KEY) {
      throw new Error("CLERK_SECRET_KEY is not defined in environment variables");
    }

    // Initialize the Clerk SDK with your secret key
    const clerk = Clerk({ secretKey: process.env.CLERK_SECRET_KEY });
    const { email, password, username } = await request.json();
    
    // Create user in Clerk with proper format using the SDK
    const clerkUser = await clerk.users.create({
      emailAddress: [email],
      password,
      username,
    });
    
    return NextResponse.json({ clerkId: clerkUser.id });
  } catch (error) {
    console.error('Error creating Clerk user:', error);
    return NextResponse.json({ 
      error: 'Failed to create user', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}