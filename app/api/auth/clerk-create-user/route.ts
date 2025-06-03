import { NextRequest, NextResponse } from 'next/server';
import { users } from '@clerk/clerk-sdk-node';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.CLERK_SECRET_KEY) {
      throw new Error("CLERK_SECRET_KEY is not defined in environment variables");
    }

    const { email, password, username } = await request.json();
    const clerkUser = await users.createUser({
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