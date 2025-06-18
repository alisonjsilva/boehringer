import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const supabase = createServerSupabaseClient()

    try {
        const { data: rows, error } = await supabase
            .from('ranking')
            .select('id, name, userid, moves, time, day, ranking_date')
            .order('day', { ascending: false })
            .order('moves', { ascending: true })
            .order('ranking_date', { ascending: false })
            .order('time', { ascending: true })

        if (error) throw error

        return NextResponse.json({ rows, fields: [] }, { status: 200 })
    } catch (error) {
        console.error('Error getting ranking:', error)
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
    }
}