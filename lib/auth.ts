import jwt from 'jsonwebtoken';
import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';
import { IUser } from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30d';

export function generateToken(user: IUser) {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: JWT_EXPIRES_IN,
    }
  );
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function getUserFromRequest(req: NextApiRequest | NextRequest) {
  try {
    // Get token from header
    let token: string | undefined;
    
    if (req instanceof NextRequest) {
      // App Router
      token = req.headers.get('authorization')?.split(' ')[1];
    } else {
      // Pages Router
      token = req.headers.authorization?.split(' ')[1];
    }
    
    if (!token) {
      return null;
    }
    
    // Verify token
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return null;
    }
    
    return decoded;
  } catch (error) {
    return null;
  }
}