# 📐 SCHOLARSHIP TRACKER PRO - STYLE GUIDE

**Comprehensive Design System Documentation for Landing Page & Top Menu Bar**

---

## 🎨 **BRAND IDENTITY**

### **Brand Name & Messaging**
- **Primary Brand**: "Scholarship Tracker Pro" (STP)
- **Tagline**: "Comprehensive Scholarship Management System"
- **Description**: "Track applications, manage requirements, and maximize your scholarship opportunities with our comprehensive platform designed for students, parents, and counselors."

### **Brand Voice**
- **Professional** yet **approachable**
- **Educational** and **empowering**
- **Inclusive** (students, parents, counselors)
- **Results-oriented** with emphasis on **success**

---

## 🌈 **COLOR PALETTE**

### **Primary Colors**
```css
/* Primary Blue Theme (Default) */
--primary: 217 91% 59%;           /* hsl(217, 91%, 59%) - Main brand blue */
--primary-foreground: 0 0% 98%;   /* hsl(0, 0%, 98%) - White text on blue */

/* Primary Blue in RGB */
/* rgb(37, 99, 235) - #2563eb */

/* Gradient Variations */
.gradient-primary {
  background: linear-gradient(to right, #2563eb, #4f46e5); /* blue-600 to indigo-600 */
}

.gradient-hero {
  background: linear-gradient(to bottom right, #dbeafe, #e0e7ff); /* blue-50 to indigo-100 */
}

.gradient-cta {
  background: linear-gradient(to right, #2563eb, #4f46e5); /* blue-600 to indigo-600 */
}
```

### **Semantic Colors**
```css
/* Light Mode */
--background: 0 0% 100%;          /* Pure white */
--foreground: 240 10% 3.9%;      /* Dark gray text */
--card: 0 0% 100%;               /* White cards */
--muted: 240 4.8% 95.9%;         /* Light gray backgrounds */
--muted-foreground: 240 3.8% 46.1%; /* Medium gray text */
--border: 240 5.9% 90%;          /* Light borders */

/* Dark Mode */
--background: 240 10% 3.9%;      /* Dark background */
--foreground: 0 0% 98%;          /* Light text */
--card: 240 10% 3.9%;            /* Dark cards */
--muted: 240 3.7% 15.9%;         /* Dark gray backgrounds */
--border: 240 3.7% 15.9%;        /* Dark borders */
```

### **Feature-Specific Colors**
```css
/* Student Features - Blue */
.student-theme {
  background: hsl(214, 100%, 97%);     /* blue-50 */
  accent: hsl(217, 91%, 59%);          /* blue-600 */
}

/* Parent Features - Green */  
.parent-theme {
  background: hsl(138, 76%, 97%);      /* green-50 */
  accent: hsl(166, 76%, 37%);          /* green-600 */
}

/* Counselor Features - Purple */
.counselor-theme {
  background: hsl(270, 100%, 98%);     /* purple-50 */
  accent: hsl(258, 90%, 66%);          /* purple-600 */
}
```

---

## 🔤 **TYPOGRAPHY**

### **Font Family**
```css
body {
  font-family: "Manrope", Arial, Helvetica, sans-serif;
}
```

### **Font Hierarchy**
```css
/* Hero Headline */
.hero-title {
  font-size: 4rem;        /* text-6xl on desktop */
  font-size: 3rem;        /* text-5xl on tablet */
  font-size: 2.25rem;     /* text-4xl on mobile */
  font-weight: 700;       /* font-bold */
  line-height: 1.1;       /* tracking-tight */
}

/* Section Headlines */
.section-title {
  font-size: 1.875rem;    /* text-3xl */
  font-weight: 700;       /* font-bold */
  line-height: 1.2;
}

/* Feature Titles */
.feature-title {
  font-size: 1.25rem;     /* text-xl */
  font-weight: 600;       /* font-semibold */
  margin-bottom: 0.75rem;
}

/* Body Text */
.body-large {
  font-size: 1.25rem;     /* text-xl */
  line-height: 1.6;
}

.body-regular {
  font-size: 1rem;        /* text-base */
  line-height: 1.6;
}

/* Small Text */
.text-small {
  font-size: 0.875rem;    /* text-sm */
  line-height: 1.5;
}

/* Button Text */
.button-text {
  font-size: 1.125rem;    /* text-lg */
  font-weight: 500;       /* font-medium */
}
```

---

## 🏗️ **LANDING PAGE STRUCTURE**

### **Hero Section**
```tsx
// Layout Structure
<section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
    {/* Brand Icon */}
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full">
      <GraduationCap className="h-12 w-12 text-white" />
    </div>
    
    {/* Headlines */}
    <h1 className="hero-title">
      Welcome to
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
        Scholarship Tracker Pro
      </span>
    </h1>
    
    {/* Description */}
    <p className="body-large text-muted-foreground max-w-3xl mx-auto">
      Track applications, manage requirements, and maximize opportunities...
    </p>
    
    {/* CTA Buttons */}
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      <Button className="primary-gradient">Get Started</Button>
      <Button variant="outline">Sign In</Button>
    </div>
  </div>
</section>
```

### **Features Section - Three-Column Grid**
```tsx
// Grid Layout
<div className="grid md:grid-cols-3 gap-8">
  {/* Student Card */}
  <div className="text-center p-6 rounded-lg bg-blue-50 dark:bg-blue-950/20">
    <GraduationCap className="h-12 w-12 text-blue-600" />
    <h3 className="feature-title">For Students</h3>
    <p className="text-muted-foreground mb-4">Description...</p>
    <ul className="feature-list">
      <li><Award className="h-4 w-4" />Feature item</li>
    </ul>
  </div>
  
  {/* Parent Card */}
  <div className="text-center p-6 rounded-lg bg-green-50 dark:bg-green-950/20">
    <Users className="h-12 w-12 text-green-600" />
    <h3 className="feature-title">For Parents</h3>
    {/* ... */}
  </div>
  
  {/* Counselor Card */}
  <div className="text-center p-6 rounded-lg bg-purple-50 dark:bg-purple-950/20">
    <UserCheck className="h-12 w-12 text-purple-600" />
    <h3 className="feature-title">For Counselors</h3>
    {/* ... */}
  </div>
</div>
```

### **Call-to-Action Section**
```tsx
<section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
  <div className="max-w-4xl mx-auto text-center">
    <h2 className="section-title text-white">Ready to Transform Your Scholarship Journey?</h2>
    <p className="body-large text-blue-100">Join thousands of students...</p>
    <Button className="bg-white text-blue-600 hover:bg-gray-100">
      Start Your Journey
      <ArrowRight className="ml-2 h-5 w-5" />
    </Button>
  </div>
</section>
```

---

## 🧭 **TOP MENU BAR DESIGN**

### **Header Layout Structure**
```tsx
<header className="border-b border-border bg-background">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
    
    {/* Left Section - Logo */}
    <div className="flex items-center space-x-8">
      <Link href="/" className="flex items-center">
        <CircleIcon className="h-6 w-6 text-primary" />
        <div className="ml-2">
          <div className="text-xl font-semibold text-foreground">STP</div>
          <div className="text-xs text-gray-500 -mt-1">Scholarship Tracker Pro</div>
        </div>
      </Link>
    </div>
    
    {/* Right Section - Theme Controls & User Menu */}
    <div className="flex items-center space-x-4">
      <ThemeControls />
      <ConditionalUserMenu />
    </div>
    
  </div>
</header>
```

### **Logo Design Specifications**
```css
/* Logo Container */
.logo-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;         /* space-x-2 */
}

/* Logo Icon */
.logo-icon {
  width: 1.5rem;       /* h-6 w-6 */
  height: 1.5rem;
  color: hsl(217, 91%, 59%); /* text-primary */
}

/* Logo Text */
.logo-primary {
  font-size: 1.25rem;  /* text-xl */
  font-weight: 600;    /* font-semibold */
  color: hsl(240, 10%, 3.9%); /* text-foreground */
}

.logo-subtitle {
  font-size: 0.75rem;  /* text-xs */
  color: hsl(107, 114%, 50%); /* text-gray-500 */
  margin-top: -0.25rem; /* -mt-1 */
}
```

---

## 🎛️ **THEME CONTROLS COMPONENT**

### **Theme Controls Layout**
```tsx
<div className="flex items-center space-x-2">
  {/* Bug Report Button */}
  <Button 
    variant="outline" 
    size="sm" 
    onClick={() => window.open('https://claude.ai/public/artifacts/e0e7f860-a0b5-4433-9079-213ab3faf93c', '_blank')}
    className="rounded-full p-2 h-9 w-9 text-orange-600 hover:text-orange-700"
    title="Report a bug or issue"
  >
    <Bug className="h-4 w-4" />
  </Button>
  
  {/* Dark/Light Mode Toggle */}
  <Button 
    variant="outline" 
    size="sm" 
    className="rounded-full p-2 h-9 w-9"
  >
    {mode === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
  </Button>
  
  {/* Theme Color Picker */}
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="outline" size="sm" className="rounded-full p-2 h-9 w-9">
        <Palette className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
  </DropdownMenu>
</div>
```

### **Icon Specifications**
```css
/* Standard Icon Size */
.icon-standard {
  width: 1rem;         /* h-4 w-4 */
  height: 1rem;
}

/* Large Icon Size (Hero, Features) */
.icon-large {
  width: 3rem;         /* h-12 w-12 */
  height: 3rem;
}

/* Menu Icon Size */
.icon-menu {
  width: 1rem;         /* h-4 w-4 */
  height: 1rem;
  margin-right: 0.5rem; /* mr-2 */
}

/* Button Icon Container */
.button-icon-container {
  width: 2.25rem;      /* h-9 w-9 */
  height: 2.25rem;
  border-radius: 9999px; /* rounded-full */
  padding: 0.5rem;     /* p-2 */
}
```

---

## 👤 **USER MENU COMPONENT**

### **User Avatar & Dropdown**
```tsx
<DropdownMenu>
  <DropdownMenuTrigger>
    <Avatar className="cursor-pointer size-9">
      <AvatarFallback>
        {user.name ? initials : user.email.charAt(0).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  </DropdownMenuTrigger>
  
  <DropdownMenuContent align="end" className="w-48">
    {/* User Info Header */}
    <div className="px-2 py-1.5 text-sm font-medium">
      <UserIcon className="mr-2 h-4 w-4" />
      <span className="truncate">{user.name || user.email}</span>
    </div>
    
    {/* Menu Items */}
    <DropdownMenuItem>
      <Users className="mr-2 h-4 w-4" />
      <span>Family & Counselors</span>
    </DropdownMenuItem>
    
    <DropdownMenuItem>
      <Settings className="mr-2 h-4 w-4" />
      <span>Account Settings</span>
    </DropdownMenuItem>
    
    <DropdownMenuItem>
      <DollarSign className="mr-2 h-4 w-4" />
      <span>Financial Settings</span>
    </DropdownMenuItem>
    
    <DropdownMenuItem>
      <Bell className="mr-2 h-4 w-4" />
      <span>Notifications</span>
    </DropdownMenuItem>
    
    <DropdownMenuSeparator />
    
    <DropdownMenuItem>
      <LogOut className="mr-2 h-4 w-4" />
      <span>Sign Out</span>
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### **Authentication States**
```tsx
/* Unauthenticated State - Sign In/Up Buttons */
<div className="flex items-center space-x-4">
  <Button asChild variant="outline" className="rounded-full">
    <Link href="/sign-in">Sign In</Link>
  </Button>
  <Button asChild className="rounded-full">
    <Link href="/sign-up">Sign Up</Link>
  </Button>
</div>

/* Loading State */
<div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
```

---

## 🔲 **BUTTON SPECIFICATIONS**

### **Primary Buttons**
```css
/* Primary CTA Button */
.btn-primary {
  background: linear-gradient(to right, #2563eb, #4f46e5);
  color: white;
  font-size: 1.125rem;    /* text-lg */
  border-radius: 9999px;  /* rounded-full */
  padding: 0.75rem 2rem;  /* px-8 py-3 */
  font-weight: 500;       /* font-medium */
}

.btn-primary:hover {
  background: linear-gradient(to right, #1d4ed8, #4338ca);
}

/* Outline Button */
.btn-outline {
  border: 1px solid hsl(240, 5.9%, 90%);
  background: transparent;
  color: hsl(240, 10%, 3.9%);
  font-size: 1.125rem;    /* text-lg */
  border-radius: 9999px;  /* rounded-full */
  padding: 0.75rem 2rem;  /* px-8 py-3 */
}

/* Small Icon Button */
.btn-icon-sm {
  width: 2.25rem;         /* h-9 w-9 */
  height: 2.25rem;
  border-radius: 9999px;  /* rounded-full */
  padding: 0.5rem;        /* p-2 */
  border: 1px solid hsl(240, 5.9%, 90%);
}
```

---

## 🌓 **DARK MODE SPECIFICATIONS**

### **Theme Transitions**
```css
/* Smooth transitions for theme changes */
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* Disable transitions for form inputs */
input, textarea, select {
  transition: none;
}
```

### **Dark Mode Overrides**
```css
/* Dark mode card backgrounds */
.dark [data-slot="card"] {
  background-color: hsl(240 10% 3.9%) !important;
}

/* Force dark backgrounds for white elements */
.dark .bg-white {
  background-color: hsl(240 10% 3.9%) !important;
}
```

---

## 📱 **RESPONSIVE DESIGN**

### **Breakpoint System**
```css
/* Mobile First Approach */
.container {
  max-width: 100%;
  padding: 0 1rem;         /* px-4 */
}

/* Tablet: 640px+ */
@media (min-width: 640px) {
  .container {
    padding: 0 1.5rem;     /* sm:px-6 */
  }
}

/* Desktop: 1024px+ */
@media (min-width: 1024px) {
  .container {
    padding: 0 2rem;       /* lg:px-8 */
    max-width: 80rem;      /* max-w-6xl */
  }
}

/* Large Desktop: 1280px+ */
@media (min-width: 1280px) {
  .container {
    max-width: 88rem;      /* max-w-7xl */
  }
}
```

### **Responsive Typography**
```css
/* Hero Title Responsive Sizing */
.hero-title {
  font-size: 2.25rem;     /* text-4xl - mobile */
}

@media (min-width: 640px) {
  .hero-title {
    font-size: 3rem;       /* sm:text-5xl - tablet */
  }
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 3.75rem;    /* md:text-6xl - desktop */
  }
}
```

### **Grid Responsiveness**
```css
/* Feature Grid */
.features-grid {
  display: grid;
  grid-template-columns: 1fr;    /* Single column on mobile */
  gap: 2rem;                     /* gap-8 */
}

@media (min-width: 768px) {
  .features-grid {
    grid-template-columns: repeat(3, 1fr); /* md:grid-cols-3 */
  }
}

/* Button Layout */
.cta-buttons {
  display: flex;
  flex-direction: column;        /* Default: stacked */
  gap: 1rem;                     /* gap-4 */
}

@media (min-width: 640px) {
  .cta-buttons {
    flex-direction: row;          /* sm:flex-row */
    justify-content: center;
  }
}
```

---

## 🔗 **BUG REPORT INTEGRATION**

### **Bug Report Button Specifications**
```tsx
// Complete Bug Report Button Implementation
<Button
  variant="outline"
  size="sm"
  onClick={() => window.open('https://claude.ai/public/artifacts/e0e7f860-a0b5-4433-9079-213ab3faf93c', '_blank')}
  className="rounded-full p-2 h-9 w-9 text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300"
  title="Report a bug or issue"
>
  <Bug className="h-4 w-4" />
</Button>
```

### **Bug Report Configuration**
- **URL**: `https://claude.ai/public/artifacts/e0e7f860-a0b5-4433-9079-213ab3faf93c`
- **Target**: Opens in new tab (`_blank`)
- **Purpose**: Direct link to external bug reporting system
- **Icon**: `Bug` from Lucide React
- **Colors**: 
  - Light mode: `text-orange-600 hover:text-orange-700`
  - Dark mode: `dark:text-orange-400 dark:hover:text-orange-300`
- **Accessibility**: Descriptive title attribute for screen readers
- **Positioning**: Located in top menu bar theme controls section

---

## 🎯 **ICON SYSTEM**

### **Lucide React Icons Used**
```typescript
// Navigation & UI Icons
import { 
  CircleIcon,      // Logo
  ArrowRight,      // CTAs
  Moon, Sun,       // Theme toggle
  Palette,         // Theme picker
  Bug,             // Bug report
  Check,           // Checkmarks
  User as UserIcon,// User avatar
  Settings,        // Settings menu
  LogOut,          // Sign out
  Bell,            // Notifications
  Users,           // Family/counselors
  DollarSign,      // Financial
} from 'lucide-react';

// Feature & Brand Icons
import {
  GraduationCap,   // Students, main brand
  Award,           // Achievement/scholarships
  TrendingUp,      // Analytics/progress
  Shield,          // Security/protection
  UserCheck,       // Counselors
} from 'lucide-react';
```

### **Icon Usage Patterns**
```tsx
/* Large Feature Icons */
<div className="flex justify-center mb-4">
  <GraduationCap className="h-12 w-12 text-blue-600" />
</div>

/* Menu Item Icons */
<DropdownMenuItem>
  <Settings className="mr-2 h-4 w-4" />
  <span>Account Settings</span>
</DropdownMenuItem>

/* Button Icons */
<Button>
  Get Started
  <ArrowRight className="ml-2 h-5 w-5" />
</Button>

/* Feature List Icons */
<li className="flex items-center gap-2">
  <Award className="h-4 w-4 text-blue-600" />
  Application tracking
</li>
```

---

## 📐 **SPACING & LAYOUT**

### **Container System**
```css
/* Page Containers */
.page-container {
  max-width: 80rem;       /* max-w-6xl */
  margin: 0 auto;         /* mx-auto */
  padding: 0 1rem;        /* px-4 */
}

.page-container-wide {
  max-width: 88rem;       /* max-w-7xl */
  margin: 0 auto;         /* mx-auto */
  padding: 0 1rem;        /* px-4 */
}

/* Section Spacing */
.section {
  padding: 5rem 0;        /* py-20 */
}

.section-compact {
  padding: 3rem 0;        /* py-12 */
}

/* Component Spacing */
.component-spacing {
  margin-bottom: 1.5rem;  /* mb-6 */
}

.element-spacing {
  margin-bottom: 1rem;    /* mb-4 */
}
```

### **Grid & Flexbox Patterns**
```css
/* Feature Cards Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* grid-cols-3 */
  gap: 2rem;                             /* gap-8 */
}

/* CTA Button Group */
.cta-group {
  display: flex;
  flex-direction: column;    /* flex-col */
  gap: 1rem;                /* gap-4 */
  justify-content: center;  /* justify-center */
}

@media (min-width: 640px) {
  .cta-group {
    flex-direction: row;     /* sm:flex-row */
  }
}

/* Header Layout */
.header-layout {
  display: flex;
  justify-content: space-between; /* justify-between */
  align-items: center;           /* items-center */
}

/* Logo Layout */
.logo-layout {
  display: flex;
  align-items: center;     /* items-center */
  gap: 2rem;              /* space-x-8 */
}
```

---

## 🎨 **COMPONENT LIBRARY**

### **Card Component**
```css
.card {
  background: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: 0.5rem;           /* rounded-lg */
  padding: 1.5rem;                 /* p-6 */
  text-align: center;
}

.card-blue {
  background: hsl(214, 100%, 97%);  /* bg-blue-50 */
}

.card-green {
  background: hsl(138, 76%, 97%);   /* bg-green-50 */
}

.card-purple {
  background: hsl(270, 100%, 98%);  /* bg-purple-50 */
}

/* Dark mode variants */
.dark .card-blue {
  background: hsl(214, 100%, 4%);   /* dark:bg-blue-950/20 */
}

.dark .card-green {
  background: hsl(138, 76%, 4%);    /* dark:bg-green-950/20 */
}

.dark .card-purple {
  background: hsl(270, 100%, 4%);   /* dark:bg-purple-950/20 */
}
```

### **Avatar Component**
```css
.avatar {
  width: 2.25rem;          /* size-9 */
  height: 2.25rem;
  border-radius: 50%;
  cursor: pointer;
  background: hsl(var(--muted));
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
}

.avatar-fallback {
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;     /* text-sm */
}
```

### **Loading States**
```css
.loading-skeleton {
  background: hsl(var(--muted));
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  border-radius: 50%;
}

.loading-avatar {
  width: 2.25rem;          /* w-9 h-9 */
  height: 2.25rem;
}

/* Dark mode loading states */
.dark .loading-skeleton {
  background: hsl(240, 3.7%, 15.9%); /* dark:bg-gray-700 */
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

---

## ✨ **INTERACTION PATTERNS**

### **Hover States**
```css
/* Button Hover */
.btn:hover {
  transform: translateY(-1px);
  transition: all 200ms ease;
}

/* Card Hover */
.card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
  transition: all 300ms ease;
}

/* Icon Hover */
.icon-button:hover {
  color: hsl(var(--primary));
  background: hsl(var(--accent));
}
```

### **Focus States**
```css
/* Keyboard Focus */
.focusable:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Button Focus */
.btn:focus-visible {
  box-shadow: 0 0 0 2px hsl(var(--ring));
}
```

### **Animation Specifications**
```css
/* Smooth transitions */
.transition-colors {
  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 200ms;
}

/* Loading pulse animation */
@keyframes pulse {
  50% { opacity: 0.5; }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Gradient text animation */
.gradient-text {
  background: linear-gradient(45deg, #2563eb, #4f46e5);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

---

## 🎪 **CONDITIONAL DISPLAY PATTERNS**

### **Landing Page Logic**
```typescript
// Hide user menu on landing page
const pathname = usePathname();
const isLandingPage = pathname === '/';

if (isLandingPage) {
  return null; // Don't show auth UI in header
}
```

### **Authentication States**
```typescript
// Show different UI based on auth state
if (user && user.email) {
  return <UserMenu />; // Authenticated user dropdown
}

if (shouldShowSignInButtons) {
  return <SignInButtons />; // Sign in/up buttons
}

return <LoadingState />; // Loading skeleton
```

### **Theme-Based Rendering**
```typescript
// Theme mode dependent icons
{mode === 'light' ? (
  <Moon className="h-4 w-4" />
) : (
  <Sun className="h-4 w-4" />
)}

// Theme color indicator
<div 
  className="w-4 h-4 rounded-full border"
  style={{ backgroundColor: `hsl(${color.primary})` }}
/>
```

---

This style guide provides comprehensive documentation of the existing Scholarship Tracker Pro design system, enabling consistent implementation across new components and pages while maintaining the established visual identity and user experience patterns.