# Supabase Migration Guide
## Boehringer Ingelheim Memory Game - Database Migration from Postgres Neon to Supabase

This comprehensive guide provides step-by-step instructions for migrating the Boehringer Memory Game from Postgres Neon to Supabase, including all necessary code changes, database schema setup, and testing procedures.

## 📋 Migration Overview

### Current State
- **Database**: Postgres Neon via `@vercel/postgres`
- **Connection**: Direct SQL queries using template literals
- **Tables**: `Users`, `Ranking`
- **API Routes**: 7 endpoints with direct SQL operations

### Target State
- **Database**: Supabase PostgreSQL
- **Connection**: Supabase JavaScript client
- **Authentication**: Optional Supabase Auth integration
- **Real-time**: Potential for live leaderboard updates
- **Type Safety**: Generated TypeScript types

## 🎯 Pre-Migration Checklist

### Environment Setup
- [x] Create Supabase account at [supabase.com](https://supabase.com)
- [x] Create new Supabase project
- [x] Note project URL and anon key
- [x] Install Supabase CLI (optional for local development)
- [x] Export existing data from Postgres Neon (if needed)

### Project Analysis Completed
- [ ] ✅ Identified 12 files using `@vercel/postgres`
- [ ] ✅ Documented 2 main database tables: `Users`, `Ranking`
- [ ] ✅ Analyzed 7 API routes requiring migration
- [ ] ✅ Identified all SQL query patterns used

## 🗄️ Database Schema Migration

### Step 1: Create Supabase Tables

#### 1.1 Users Table
```sql
-- Execute in Supabase SQL Editor
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS (Row Level Security) policies if needed
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Example policy (adjust based on requirements)
CREATE POLICY "Users can read all profiles" ON users
  FOR SELECT USING (true);
```

#### 1.2 Ranking Table
```sql
-- Execute in Supabase SQL Editor
CREATE TABLE ranking (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  userid INTEGER REFERENCES users(id),
  moves INTEGER NOT NULL,
  time INTEGER,
  day INTEGER DEFAULT 1,
  ranking_date TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE ranking ENABLE ROW LEVEL SECURITY;

-- Example policies
CREATE POLICY "Anyone can read rankings" ON ranking
  FOR SELECT USING (true);

CREATE POLICY "Anyone can insert rankings" ON ranking
  FOR INSERT WITH CHECK (true);
```

#### 1.3 Generate TypeScript Types
```bash
# Install Supabase CLI
npm install -g supabase

# Login and link project
supabase login
supabase link --project-ref YOUR_PROJECT_REF

# Generate types
supabase gen types typescript --project-id YOUR_PROJECT_ID --schema public > src/types/supabase.ts
```

### Step 2: Database Schema Checklist
- [x] Users table created with proper constraints
- [x] Ranking table created with foreign key to users
- [x] RLS policies configured (if authentication required)
- [x] TypeScript types generated
- [x] Test data inserted for validation

## 📦 Package Installation & Configuration

### Step 3: Install Supabase Dependencies

```bash
# Install Supabase JavaScript client
npm install @supabase/supabase-js

# Optional: Install Supabase Auth helpers for Next.js
npm install @supabase/auth-helpers-nextjs @supabase/auth-helpers-react
```

### Step 4: Environment Configuration

#### 4.1 Update Environment Variables
```env
# .env.local - Add these variables
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Keep existing Postgres Neon during transition (optional)
POSTGRES_URL=your-existing-postgres-url
```

#### 4.2 Create Supabase Client
```typescript
// src/lib/supabase.ts
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// For server-side operations
export const createServerSupabaseClient = () => {
  return createClient<Database>(supabaseUrl, supabaseAnonKey)
}
```

### Step 5: Configuration Checklist
- [x] Supabase packages installed
- [x] Environment variables configured
- [x] Supabase client created
- [x] TypeScript types imported
- [x] Test connection successful

## 🔄 API Routes Migration

### Step 6: Migrate Each API Route

#### 6.1 Add User Route (`src/app/api/add-user/route.ts`)
```typescript
// BEFORE: Using @vercel/postgres
import { sql } from '@vercel/postgres'

export async function POST(request: Request) {
    const req = await request.json()
    const { name } = req
    
    await sql`INSERT INTO Users (Name) VALUES (${name});`
    const { rows } = await sql`SELECT ID FROM Users WHERE Name = ${name};`
    
    return NextResponse.json({ rows }, { status: 200 })
}

// AFTER: Using Supabase
import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const supabase = createServerSupabaseClient()
    const req = await request.json()
    const { name } = req

    try {
        if (!name) throw new Error('Name is required')

        // Insert user
        const { data: insertData, error: insertError } = await supabase
            .from('users')
            .insert({ name })
            .select('id')
            .single()

        if (insertError) throw insertError

        return NextResponse.json({ rows: [insertData] }, { status: 200 })
    } catch (error) {
        console.error('Error adding user:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
```

#### 6.2 Add User Score Route (`src/app/api/add-user-score/route.ts`)
```typescript
// AFTER: Using Supabase
import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const supabase = createServerSupabaseClient()
    const req = await request.json()
    const { userId, name, moves, time, day } = req

    try {
        if (!userId || !name || !moves) throw new Error('All data required')

        const { error } = await supabase
            .from('ranking')
            .insert({
                name,
                userid: userId,
                moves,
                time,
                day
            })

        if (error) throw error

        return NextResponse.json({ status: 200 })
    } catch (error) {
        console.error('Error adding score:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
```

#### 6.3 Get Ranking Route (`src/app/api/get-ranking/route.ts`)
```typescript
// AFTER: Using Supabase
import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const supabase = createServerSupabaseClient()

    try {
        const { data: rows, error } = await supabase
            .from('users')
            .select('*')

        if (error) throw error

        return NextResponse.json({ rows, fields: [] }, { status: 200 })
    } catch (error) {
        console.error('Error fetching ranking:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
```

#### 6.4 Get Users Route (`src/app/api/get-users/route.ts`)
```typescript
// AFTER: Using Supabase
import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const supabase = createServerSupabaseClient()

    try {
        const { data: rows, error } = await supabase
            .from('ranking')
            .select('*')
            .order('moves', { ascending: true })
            .order('ranking_date', { ascending: false })
            .limit(10)

        if (error) throw error

        return NextResponse.json({ rows, fields: [] }, { status: 200 })
    } catch (error) {
        console.error('Error fetching users:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
```

#### 6.5 Remove Participations Route (`src/app/api/remove-participations/route.ts`)
```typescript
// AFTER: Using Supabase
import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function DELETE(request: Request) {
    const supabase = createServerSupabaseClient()
    const { searchParams } = new URL(request.url)
    const day = searchParams.get('day')

    if (!day) {
        return NextResponse.json({ error: 'Day parameter required' }, { status: 400 })
    }

    try {
        const { count, error } = await supabase
            .from('ranking')
            .delete()
            .eq('day', parseInt(day))

        if (error) throw error

        return NextResponse.json({ 
            rowCount: count, 
            command: 'DELETE' 
        }, { status: 200 })
    } catch (error) {
        console.error('Error removing participations:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
```

### Step 7: API Routes Migration Checklist
- [ ] `add-user/route.ts` migrated and tested
- [ ] `add-user-score/route.ts` migrated and tested
- [ ] `get-ranking/route.ts` migrated and tested
- [ ] `get-users/route.ts` migrated and tested
- [ ] `remove-participations/route.ts` migrated and tested
- [ ] `create-users-table/route.ts` removed (tables created in Supabase)
- [ ] All error handling implemented
- [ ] Response formats maintained for compatibility

## 🎮 Component & Page Migration

### Step 8: Update Server Components

#### 8.1 Main Page (`src/app/page.tsx`)
```typescript
// BEFORE
import { sql } from '@vercel/postgres'

export default async function Home({ params }: Props) {
  const { rows, fields } = await sql`SELECT * FROM Ranking WHERE Day = ${params.day} ORDER BY Moves ASC, Ranking_date DESC, Time ASC LIMIT 5;`
  
  return (
    <main>
      <Game users={rows} day={params.day ? params.day : 1} />
    </main>
  )
}

// AFTER
import { createServerSupabaseClient } from '@/lib/supabase'

export default async function Home({ params }: Props) {
  const supabase = createServerSupabaseClient()
  
  const { data: rows, error } = await supabase
    .from('ranking')
    .select('*')
    .eq('day', params.day || 1)
    .order('moves', { ascending: true })
    .order('ranking_date', { ascending: false })
    .order('time', { ascending: true })
    .limit(5)

  if (error) {
    console.error('Error fetching ranking:', error)
    // Handle error appropriately
  }

  return (
    <main>
      <Game users={rows || []} day={params.day ? params.day : 1} />
    </main>
  )
}
```

#### 8.2 Day Page (`src/app/[day]/page.tsx`)
```typescript
// Similar migration pattern as main page
import { createServerSupabaseClient } from '@/lib/supabase'

export default async function DayPage({ params }: Props) {
  const supabase = createServerSupabaseClient()
  
  const { data: rows, error } = await supabase
    .from('ranking')
    .select('*')
    .eq('day', params.day)
    .order('moves', { ascending: true })
    .order('ranking_date', { ascending: false })
    .order('time', { ascending: true })
    .limit(5)

  if (error) {
    console.error('Error fetching day ranking:', error)
  }

  return (
    <main>
      <Game users={rows || []} day={params.day} />
    </main>
  )
}
```

#### 8.3 Dashboard Page (`src/app/dashboard/page.tsx`)
```typescript
// AFTER: Using Supabase
import { createServerSupabaseClient } from '@/lib/supabase'

export default async function Dashboard() {
  const supabase = createServerSupabaseClient()
  
  const { data: rows, error } = await supabase
    .from('ranking')
    .select('id, name, moves, time, day')
    .order('day', { ascending: false })
    .order('moves', { ascending: true })
    .order('ranking_date', { ascending: false })
    .order('time', { ascending: true })

  if (error) {
    console.error('Error fetching dashboard data:', error)
  }

  return (
    <div>
      <RankingList users={rows || []} />
      <ButtonActions />
    </div>
  )
}
```

### Step 9: Update Components

#### 9.1 Users List Component (`src/components/users-list.tsx`)
```typescript
// BEFORE
import { sql } from '@vercel/postgres'

async function UsersList() {
  const { rows, fields } = await sql`SELECT * FROM users;`
  
  return (
    <div>
      {rows.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}

// AFTER
import { createServerSupabaseClient } from '@/lib/supabase'

async function UsersList() {
  const supabase = createServerSupabaseClient()
  
  const { data: rows, error } = await supabase
    .from('users')
    .select('*')

  if (error) {
    console.error('Error fetching users:', error)
    return <div>Error loading users</div>
  }

  return (
    <div>
      {rows?.map(user => (
        <div key={user.id}>{user.name}</div>
      )) || <div>No users found</div>}
    </div>
  )
}
```

### Step 10: Component Migration Checklist
- [ ] `src/app/page.tsx` updated
- [ ] `src/app/[day]/page.tsx` updated
- [ ] `src/app/dashboard/page.tsx` updated
- [ ] `src/components/users-list.tsx` updated
- [ ] `src/components/usersQuery.tsx` updated
- [ ] `src/components/dashboard/RankingList.tsx` updated
- [ ] All imports updated from `@vercel/postgres` to Supabase
- [ ] Error handling added for all database operations
- [ ] Type safety maintained with generated types

## 🔄 Client-Side Integration (Optional Enhancements)

### Step 11: Real-time Features (Optional)

#### 11.1 Real-time Leaderboard Updates
```typescript
// src/components/real-time-ranking.tsx
'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Database } from '@/types/supabase'

type Ranking = Database['public']['Tables']['ranking']['Row']

export function RealTimeRanking({ day }: { day: number }) {
  const [rankings, setRankings] = useState<Ranking[]>([])

  useEffect(() => {
    // Fetch initial data
    const fetchRankings = async () => {
      const { data } = await supabase
        .from('ranking')
        .select('*')
        .eq('day', day)
        .order('moves', { ascending: true })
        .limit(5)
      
      if (data) setRankings(data)
    }

    fetchRankings()

    // Subscribe to real-time changes
    const subscription = supabase
      .channel('ranking_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'ranking',
          filter: `day=eq.${day}`
        },
        () => {
          fetchRankings() // Refetch when new score is added
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [day])

  return (
    <div>
      <h3>Live Rankings - Day {day}</h3>
      {rankings.map(ranking => (
        <div key={ranking.id}>
          {ranking.name}: {ranking.moves} moves
        </div>
      ))}
    </div>
  )
}
```

### Step 12: Enhanced Features Checklist
- [ ] Real-time subscriptions implemented (optional)
- [ ] Client-side Supabase integration added
- [ ] Type safety with generated types confirmed
- [ ] Performance optimization completed

## 🧪 Testing & Validation

### Step 13: Migration Testing Protocol

#### 13.1 Database Operations Testing
```typescript
// src/tests/migration-test.ts (create for testing)
import { createServerSupabaseClient } from '@/lib/supabase'

export async function testMigration() {
  const supabase = createServerSupabaseClient()
  
  console.log('🧪 Testing Supabase Migration...')
  
  try {
    // Test 1: Create user
    const { data: userData, error: userError } = await supabase
      .from('users')
      .insert({ name: 'Test User Migration' })
      .select()
      .single()
    
    if (userError) throw userError
    console.log('✅ User creation successful')
    
    // Test 2: Add score
    const { error: scoreError } = await supabase
      .from('ranking')
      .insert({
        name: 'Test User Migration',
        userid: userData.id,
        moves: 10,
        time: 120,
        day: 1
      })
    
    if (scoreError) throw scoreError
    console.log('✅ Score insertion successful')
    
    // Test 3: Fetch rankings
    const { data: rankings, error: rankingError } = await supabase
      .from('ranking')
      .select('*')
      .eq('day', 1)
      .limit(5)
    
    if (rankingError) throw rankingError
    console.log('✅ Ranking retrieval successful', rankings?.length)
    
    // Cleanup test data
    await supabase.from('ranking').delete().eq('userid', userData.id)
    await supabase.from('users').delete().eq('id', userData.id)
    console.log('✅ Test cleanup successful')
    
    console.log('🎉 All migration tests passed!')
    
  } catch (error) {
    console.error('❌ Migration test failed:', error)
    throw error
  }
}
```

#### 13.2 API Endpoints Testing
```bash
# Test API endpoints manually or with curl
curl -X POST http://localhost:3000/api/add-user \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User"}'

curl -X GET http://localhost:3000/api/get-ranking

curl -X POST http://localhost:3000/api/add-user-score \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"name":"Test User","moves":15,"time":180,"day":1}'
```

### Step 14: Testing Checklist
- [ ] Database connection verified
- [ ] All CRUD operations tested
- [ ] API endpoints returning correct responses
- [ ] Error handling working properly
- [ ] Performance comparison with previous setup
- [ ] Data integrity maintained
- [ ] Migration test script created and passed

## 🚀 Deployment & Go-Live

### Step 15: Production Deployment

#### 15.1 Environment Variables Setup
```bash
# Production Environment Variables
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key

# Optional: Remove old Postgres variables after migration
# POSTGRES_URL=... (remove after successful migration)
```

#### 15.2 Database Migration in Production
```sql
-- If migrating existing data, use these queries in Supabase SQL Editor

-- Example: Migrate existing user data (adjust based on your current schema)
INSERT INTO users (name, email, phone, created_at)
SELECT name, email, phone, COALESCE(created_at, NOW())
FROM old_users_table;

-- Example: Migrate existing ranking data
INSERT INTO ranking (name, userid, moves, time, day, ranking_date)
SELECT name, userid, moves, time, day, COALESCE(ranking_date, NOW())
FROM old_ranking_table;
```

### Step 16: Deployment Checklist
- [ ] Production Supabase project configured
- [ ] Environment variables updated in deployment platform
- [ ] Database tables created in production
- [ ] Data migration completed (if applicable)
- [ ] Production deployment successful
- [ ] All features tested in production environment
- [ ] Monitoring and logging configured

## 🔧 Post-Migration Optimization

### Step 17: Performance & Security

#### 17.1 Database Optimization
```sql
-- Add indexes for better query performance
CREATE INDEX idx_ranking_day_moves ON ranking(day, moves);
CREATE INDEX idx_ranking_userid ON ranking(userid);
CREATE INDEX idx_users_name ON users(name);

-- Optimize RLS policies if needed
CREATE POLICY "Optimized ranking read policy" ON ranking
  FOR SELECT USING (true);
```

#### 17.2 Connection Pooling (if needed)
```typescript
// src/lib/supabase-server.ts - Enhanced server client
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY! // Server-only

export const supabaseServer = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})
```

### Step 18: Optimization Checklist
- [ ] Database indexes added for performance
- [ ] RLS policies optimized
- [ ] Connection pooling configured (if needed)
- [ ] Query performance analyzed and optimized
- [ ] Security best practices implemented

## 📊 Migration Validation & Rollback Plan

### Step 19: Final Validation

#### 19.1 Comprehensive Testing
- [ ] All game functionality working
- [ ] User registration flow complete
- [ ] Score submission and ranking accurate
- [ ] Dashboard displaying correct data
- [ ] Real-time features functioning (if implemented)
- [ ] Mobile and desktop compatibility confirmed

#### 19.2 Performance Comparison
- [ ] Response times compared (before/after)
- [ ] Database query performance analyzed
- [ ] Error rates monitored
- [ ] User experience validated

### Step 20: Rollback Plan (Emergency)

#### 20.1 Quick Rollback Steps
```bash
# If immediate rollback needed:
# 1. Revert environment variables to Postgres Neon
# 2. Restore previous deployment
# 3. Update DNS if necessary

# Emergency environment revert
POSTGRES_URL=your-original-postgres-url
# Remove Supabase variables temporarily
```

#### 20.2 Rollback Checklist
- [ ] Original database credentials secured
- [ ] Rollback procedure documented
- [ ] Emergency contacts identified
- [ ] Data backup strategy confirmed

## 🎉 Migration Complete

### Final Success Criteria
- [ ] All Postgres Neon dependencies removed
- [ ] All functionality migrated to Supabase
- [ ] Performance meets or exceeds previous setup
- [ ] Real-time features implemented (optional)
- [ ] Documentation updated
- [ ] Team trained on new architecture
- [ ] Monitoring and alerting configured
- [ ] Migration marked as successful in project documentation

---

## 📚 Additional Resources

### Supabase Documentation
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)
- [Next.js Integration](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

### Migration Tools
- [Supabase CLI](https://supabase.com/docs/reference/cli)
- [Database Migration Scripts](https://supabase.com/docs/guides/database/migrating-and-upgrading-projects)

This migration guide provides comprehensive coverage of all aspects needed to successfully migrate from Postgres Neon to Supabase while maintaining functionality and improving capabilities. 