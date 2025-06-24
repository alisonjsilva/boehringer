import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET() {
    const supabase = createServerSupabaseClient()

    try {
        const { data: rows, error } = await supabase
            .from('ranking')
            .select('*')
            .order('moves', { ascending: true })
            .order('ranking_date', { ascending: false })
            .order('time', { ascending: true })

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