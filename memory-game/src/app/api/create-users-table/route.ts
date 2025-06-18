import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        // Tables are now managed through Supabase migrations
        // Check supabase/migrations/ directory for schema definitions
        return NextResponse.json({ 
            message: "Tables are now managed through Supabase migrations. Check supabase/migrations/ directory for schema definitions.",
            migrated: true 
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
    }
}