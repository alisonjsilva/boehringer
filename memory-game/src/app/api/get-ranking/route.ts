import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const day = searchParams.get('day')
    
    const supabase = createServerSupabaseClient()

    try {
        let query = supabase
            .from('ranking')
            .select('*')
        
        // Add day filter if provided
        if (day) {
            const dayNumber = Number(day)
            query = query.eq('day', dayNumber)
        }
        
        let finalQuery = query
            .order('moves', { ascending: true })
            .order('ranking_date', { ascending: false })
            .order('time', { ascending: true })
            
        // Add limit only if filtering by day
        if (day) {
            finalQuery = finalQuery.limit(5)
        }
        
        const { data: rows, error } = await finalQuery

        if (error) throw error

        return NextResponse.json({ 
            rows: rows || [],
            fields: [] 
        })
    } catch (error) {
        console.error('Error fetching ranking:', error)
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}