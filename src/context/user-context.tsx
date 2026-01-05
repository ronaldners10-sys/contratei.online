"use client";

import type { User } from '@/lib/types';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { DUMMY_CANDIDATE, DUMMY_COMPANY } from '@/lib/placeholder-data';
import { usePathname, useRouter } from 'next/navigation';

type UserContextType = {
  user: User | null;
  loading: boolean;
  loginAs: (role: 'candidate' | 'company') => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Simulate checking for a logged-in user from a session
    const storedUserRole = localStorage.getItem('userRole');
    if (storedUserRole) {
      if (storedUserRole === 'candidate') {
        setUser(DUMMY_CANDIDATE);
      } else if (storedUserRole === 'company') {
        setUser(DUMMY_COMPANY);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && !user && pathname.startsWith('/dashboard')) {
      router.push('/login');
    }
    if (!loading && user && (pathname === '/login' || pathname === '/signup')) {
      router.push('/dashboard');
    }
  }, [user, loading, pathname, router]);


  const loginAs = (role: 'candidate' | 'company') => {
    const userToSet = role === 'candidate' ? DUMMY_CANDIDATE : DUMMY_COMPANY;
    setUser(userToSet);
    localStorage.setItem('userRole', role);
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userRole');
    router.push('/login');
  };

  return (
    <UserContext.Provider value={{ user, loading, loginAs, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
