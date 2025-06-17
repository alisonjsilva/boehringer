# Boehringer Ingelheim Memory Game

A memory pair matching game built with Next.js 13, featuring dynamic game themes, user scoring, and ranking system. This project is currently being **migrated from Postgres Neon to Supabase** for enhanced database capabilities.

## 🎯 Project Overview

**Kemory** is an interactive memory game where players match pairs of cards within different themed sets. The game tracks player performance, maintains rankings, and provides a responsive gaming experience across multiple days/themes.

### Key Features
- 🎮 Interactive memory card matching game
- 🏆 Real-time ranking system with move tracking
- 🎨 Multiple theme support (3 different day themes)
- 📱 Responsive design optimized for mobile and desktop
- ⚡ Image preloading for smooth gameplay
- 🗄️ User score persistence and leaderboards

## 🏗️ Project Structure

### Core Architecture
```
src/
├── app/                      # Next.js 13 App Router
│   ├── [day]/               # Dynamic route for different game days/themes
│   ├── api/                 # API endpoints for backend operations
│   ├── dashboard/           # Admin dashboard for game management
│   ├── layout.tsx           # Root layout with image preloading
│   └── page.tsx             # Main landing page
├── components/              # Reusable UI components
├── hooks/                   # Custom React hooks
├── libs/                    # Utility functions and data operations
└── types.d.ts              # TypeScript type definitions
```

### API Routes (`src/app/api/`)
- `add-user/` - Create new user profiles
- `add-user-score/` - Record game scores and moves
- `get-ranking/` - Retrieve leaderboard data
- `get-users/` - Fetch user information
- `create-users-table/` - Database table initialization
- `images-generator/` - Dynamic card image generation
- `remove-participations/` - Clean up user data

### Components (`src/components/`)
- `game.tsx` - Main game orchestrator component
- `list-kards.tsx` - Game board card grid layout
- `kard.tsx` - Individual card component with flip animations
- `kard-form.tsx` - User registration and theme selection
- `users-list.tsx` - User management interface
- `dashboard/` - Administrative components for game oversight

### Game Logic (`src/hooks/`)
- `game.ts` - Core game state management and logic
  - Move tracking and validation
  - Win condition detection
  - Timer functionality
  - Score submission handling

### Utilities (`src/libs/`)
- `cards.ts` - Card generation and image management
- `utils.ts` - Helper functions for game mechanics
- `add-user.ts` - User creation and management

## 🎮 Game Mechanics

### Card System
```typescript
interface IKard {
  id: number
  flipped: boolean
  matched: boolean
  defaultImage: string
  image?: string
}
```

### Game Flow
1. **User Registration** - Players enter name and select theme
2. **Card Generation** - Dynamic image assignment based on selected day/theme
3. **Gameplay** - Turn-based card flipping and matching
4. **Score Tracking** - Move counting and time measurement
5. **Ranking** - Leaderboard updates with best performances

### Themes & Days
- **Day 1** - Theme set with `/icons/1/` image collection
- **Day 2** - Theme set with `/icons/2/` image collection  
- **Day 3** - Theme set with `/icons/3/` image collection

Each theme contains 8 unique images (01.png - 08.png) for pair matching.

## 🗄️ Database Architecture

### Current Migration Status
- **From**: Postgres Neon (`@vercel/postgres`)
- **To**: Supabase (enhanced PostgreSQL with real-time features)

### Data Tables
- **users** - Player profiles and identification
- **Ranking** - Game scores with move count, timing, and day tracking

### Key Database Operations
```sql
-- Ranking retrieval by day
SELECT * FROM Ranking 
WHERE Day = ${day} 
ORDER BY Moves ASC, Ranking_date DESC, Time ASC 
LIMIT 5;

-- User score insertion
INSERT INTO Ranking (Name, Userid, Moves, Time, Day) 
VALUES (${name}, ${userId}, ${moves}, ${time}, ${day});
```

## 🚀 Development Workflow

### Prerequisites
- Node.js 18+ 
- pnpm (preferred) or npm
- Database connection (transitioning to Supabase)

### Getting Started
```bash
# Install dependencies
pnpm install

# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start
```

### Environment Setup
Configure database connection variables for Supabase migration:
```env
# Legacy Postgres Neon (being phased out)
POSTGRES_URL=...

# New Supabase configuration (in progress)
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

## 📱 UI/UX Features

### Responsive Design
- Mobile-first approach with touch-friendly card interactions
- Adaptive grid layout for different screen sizes
- Optimized image loading with preload strategies

### Visual Elements
- Custom SCSS modules for component styling
- Tailwind CSS for utility-first styling approach
- Dynamic background themes based on selected day
- Smooth card flip animations and transitions

### Performance Optimizations
- Image preloading in root layout for all theme assets
- Client-side state management for immediate UI feedback
- Optimized build with Next.js 13 features

## 🔧 Technical Specifications

### Core Dependencies
- **Next.js 13.4.12** - App Router and React Server Components
- **React 18.2.0** - UI library with hooks and suspense
- **TypeScript 5.1.6** - Type safety and developer experience
- **Tailwind CSS 3.3.3** - Utility-first styling
- **@vercel/postgres** - Database connectivity (transitioning out)

### Build Tools
- **PostCSS** - CSS processing and optimization
- **SASS** - Enhanced CSS with modules support
- **ESLint** - Code quality and consistency

## 🎯 Development Guidelines

### Code Organization
- Follow Next.js 13 App Router conventions
- Use TypeScript for all new components and utilities
- Implement proper error boundaries and loading states
- Maintain responsive design principles

### Database Migration Notes
- All new database operations should target Supabase
- Legacy `@vercel/postgres` calls are being phased out
- Real-time features will be implemented with Supabase subscriptions
- Maintain backward compatibility during transition period

### Component Development
- Use client components (`'use client'`) for interactive elements
- Implement proper loading states and error handling
- Follow atomic design principles for reusability
- Ensure accessibility standards compliance

### Styling Conventions
- Prefer Tailwind utilities for common styles
- Use SCSS modules for component-specific styling
- Maintain consistent spacing and color schemes
- Implement responsive breakpoints consistently

## 📊 Performance & Analytics

### Metrics Tracking
- Game completion rates per theme
- Average moves to completion
- Time-based performance analysis
- User engagement across different days

### Optimization Areas
- Image loading and caching strategies
- Database query optimization
- Client-side state management efficiency
- Mobile performance and touch responsiveness

---

This documentation serves as a comprehensive guide for development and maintenance of the Boehringer Ingelheim Memory Game. Keep this updated as the project evolves and the Supabase migration progresses.