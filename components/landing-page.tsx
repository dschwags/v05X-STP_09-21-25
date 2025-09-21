'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

// Glowing Scholar Cap Component
const GlowingScholarCap: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-28 h-28 mx-auto mb-6 mt-4">
      {/* Glow effect background */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-20 blur-xl animate-pulse" style={{animationDuration: '2s'}}></div>
      <div className="absolute inset-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 opacity-30 blur-lg animate-pulse" style={{animationDuration: '2s'}}></div>
      
      {/* Scholar cap icon */}
      <div className="relative z-10 p-5 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200 shadow-xl">
        <GraduationCap 
          className="w-16 h-16 text-blue-600 animate-pulse" 
          strokeWidth={2} 
          style={{animationDuration: '2s'}} 
        />
      </div>
    </div>
  );
};

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="px-4 py-16 mx-auto max-w-6xl">
        <div className="text-center">
          <GlowingScholarCap />
          
          <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Scholarship Tracker Pro
            </span>
          </h1>
          
          <p className="mb-8 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Comprehensive platform designed for students, parents, and counselors to 
            manage scholarship applications and track progress.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full">
              <Link href="/sign-up">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-3 rounded-full border-gray-300">
              <Link href="/sign-in">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Designed for Every User Section */}
      <section className="px-4 py-16 bg-gray-50">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Designed for Every User
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you are a student, parent, or counselor, we have the tools you need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* For Students */}
            <Card className="border-2 border-blue-100 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  For Students
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Track applications, manage deadlines, and maximize your scholarship opportunities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                  Application tracking
                </div>
                <div className="flex items-center text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                  Progress analytics
                </div>
                <div className="flex items-center text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                  Deadline reminders
                </div>
              </CardContent>
            </Card>

            {/* For Parents */}
            <Card className="border-2 border-green-100 dark:border-green-800 hover:border-green-300 dark:hover:border-green-600 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 p-4 bg-green-100 dark:bg-green-900/20 rounded-full">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  For Parents
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Monitor and support your child scholarship journey with transparency
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                  Child progress monitoring
                </div>
                <div className="flex items-center text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                  Financial planning tools
                </div>
                <div className="flex items-center text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                  Real-time updates
                </div>
              </CardContent>
            </Card>

            {/* For Counselors */}
            <Card className="border-2 border-purple-100 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 p-4 bg-purple-100 dark:bg-purple-900/20 rounded-full">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  For Counselors
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Guide students effectively with comprehensive management tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-purple-600 mr-3 flex-shrink-0" />
                  Student portfolio management
                </div>
                <div className="flex items-center text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-purple-600 mr-3 flex-shrink-0" />
                  Success analytics
                </div>
                <div className="flex items-center text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-purple-600 mr-3 flex-shrink-0" />
                  Program oversight
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-8 md:text-4xl">
            Ready to Track Your Scholarship Journey?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600 rounded-full font-medium px-6 py-2"
            >
              <Link href="/sign-in">
                Sign In
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline"
              className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-blue-600 rounded-full font-medium px-6 py-2"
            >
              <Link href="/sign-up">
                Sign Up
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;