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
        console.error('Error getting users:', error)
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
    }
}