'use client';

import Link from 'next/link';
import { useState, Suspense, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { GraduationCap, LogOut, User as UserIcon, Bug, Loader2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from '@/app/(login)/actions';
import { useRouter } from 'next/navigation';
import { User } from '@/lib/db/schema';
import useSWR, { mutate } from 'swr';
import ThemeControls from './theme-controls';
import { siteConfig } from '@/lib/config';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  
  const { data: user, mutate: mutateUser, isLoading, error } = useSWR<User>('/api/user', fetcher, {
    // BugX: Balanced revalidation - fixed session sync but not spammy
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    refreshInterval: 0,
    dedupingInterval: 5000,
    errorRetryCount: 2,
    errorRetryInterval: 1000
  });
  
  const router = useRouter();
  
  // BugX: Force revalidation on URL auth parameter change
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('_auth')) {
      console.log('⚡ BugX: Auth parameter detected, forcing user data refresh');
      mutateUser();
      const cleanUrl = window.location.pathname;
      window.history.replaceState({}, '', cleanUrl);
    }
  }, [mutateUser]);

  async function handleSignOut() {
    if (isSigningOut) return; // Prevent double-clicks
    
    console.log('💪 BugX: Starting comprehensive logout process');
    setIsSigningOut(true);
    
    try {
      // Clear client-side session data first
      mutateUser(undefined, false);
      await mutate('/api/user', null, false);
      
      // Call server-side logout
      await signOut();
      
      // Force complete cache invalidation
      await mutateUser();
      await mutate('/api/user');
      
      console.log('✅ BugX: Logout complete, redirecting');
      router.push(`/?_logout=${Date.now()}`);
    } catch (error) {
      console.error('❌ BugX: Logout error:', error);
      router.push('/');
    } finally {
      setIsSigningOut(false);
    }
  }

  // BugX: Proper loading state
  if (isLoading) {
    return (
      <div className="flex items-center space-x-4">
        <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
      </div>
    );
  }

  // BugX: Error state fallback to sign-in buttons
  if (error || !user) {
    return (
      <div className="flex items-center space-x-4">
        <Button asChild variant="outline" className="rounded-full">
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button asChild className="rounded-full">
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    );
  }

  // BugX: Fixed avatar fallback logic
  const getInitials = (user: User) => {
    if (user.name) {
      return user.name
        .split(' ')
        .filter((n: string) => n.length > 0)
        .map((n: string) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return user.email ? user.email.slice(0, 2).toUpperCase() : 'U';
  };

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full p-0" aria-label="User menu">
          <Avatar className="h-9 w-9">
            <AvatarImage alt={user.name || user.email || 'User'} />
            <AvatarFallback className="text-sm font-medium">
              {getInitials(user)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-2 py-1.5 text-sm font-medium text-foreground">
          <div className="flex items-center">
            <UserIcon className="mr-2 h-4 w-4" />
            <span className="truncate">{user.name || user.email}</span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={handleSignOut}
          disabled={isSigningOut}
          className="cursor-pointer"
        >
          {isSigningOut ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <LogOut className="mr-2 h-4 w-4" />
          )}
          <span>{isSigningOut ? 'Signing out...' : 'Sign Out'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header() {
  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity" aria-label="Home">
          <GraduationCap className="h-7 w-7 text-primary -mt-1" />
          <span className="ml-2 text-xl font-semibold text-foreground">{siteConfig.name}</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400"
            title="Bug Report Tracker"
          >
            <a
              href="https://claude.ai/public/artifacts/e0e7f860-a0b5-4433-9079-213ab3faf93c"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Report a bug"
            >
              <Bug className="h-4 w-4" />
            </a>
          </Button>
          <ThemeControls />
          <Suspense fallback={<div className="h-9 w-9 bg-muted rounded-full animate-pulse" />}>
            <UserMenu />
          </Suspense>
        </div>
      </div>
    </header>
  );
}