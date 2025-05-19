"use client";

import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { useUser, useAuth as useClerkAuth } from '@clerk/nextjs';
import { auth as apiAuth } from '@/lib/api';

interface User {
  id: string;
  username?: string;
  email?: string;
  role?: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user: clerkUser, isLoaded } = useUser();
  const { signOut } = useClerkAuth();
  const [mongoUser, setMongoUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('[AuthProvider] Clerk user:', clerkUser, 'isLoaded:', isLoaded);
    async function syncMongoUser() {
      if (!clerkUser) {
        setMongoUser(null);
        setIsLoading(false);
        console.log('[AuthProvider] No Clerk user, set mongoUser to null');
        return;
      }
      setIsLoading(true);
      try {
        let user = await apiAuth.getUserByClerkId(clerkUser.id);
        console.log('[AuthProvider] MongoDB user fetched:', user);
        if (!user) {
          user = await apiAuth.createUserFromClerk({
            id: clerkUser.id,
            username: clerkUser.username || clerkUser.primaryEmailAddress?.emailAddress?.split('@')[0],
            email: clerkUser.primaryEmailAddress?.emailAddress,
            avatar: clerkUser.imageUrl,
          });
          console.log('[AuthProvider] MongoDB user created:', user);
        }
        setMongoUser(user);
      } catch (e) {
        setMongoUser(null);
        console.error('[AuthProvider] Error fetching/creating MongoDB user:', e);
      } finally {
        setIsLoading(false);
      }
    }
    if (isLoaded) {
      syncMongoUser();
    }
  }, [clerkUser, isLoaded]);

  useEffect(() => {
    console.log('[AuthProvider] mongoUser state changed:', mongoUser);
  }, [mongoUser]);

  const logout = () => {
    signOut();
  };

  return (
    <AuthContext.Provider value={{ user: mongoUser, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
