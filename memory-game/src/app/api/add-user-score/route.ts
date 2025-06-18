import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const supabase = createServerSupabaseClient()
    const req = await request.json()
    const { userId, name, moves, time, day } = req

    try {
        if (!userId || !name || !moves) throw new Error('UserId, name and moves are required')
        
        console.log('userId', userId)
        
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
        console.error('Error adding user score:', error)
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
    }
}