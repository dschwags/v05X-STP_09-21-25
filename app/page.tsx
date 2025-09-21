'use client';

import { Suspense } from 'react';
import EnhancedSpiderWebHub from '@/components/enhanced-spider-web-hub';
import LandingPage from '@/components/landing-page';
import { User } from '@/lib/db/schema';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function PageContent() {
  const { data: user, isLoading } = useSWR<User>('/api/user', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    refreshInterval: 0,
    dedupingInterval: 5000
  });

  // Show loading state briefly
  if (isLoading) {
    return (
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </main>
    );
  }

  // If user is authenticated, show dashboard
  if (user) {
    return (
      <main className="flex-1">
        <EnhancedSpiderWebHub />
      </main>
    );
  }

  // If not authenticated, show landing page
  return (
    <main className="flex-1">
      <LandingPage />
    </main>
  );
}

export default function HomePage() {
  return (
    <Suspense fallback={
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </main>
    }>
      <PageContent />
    </Suspense>
  );
}