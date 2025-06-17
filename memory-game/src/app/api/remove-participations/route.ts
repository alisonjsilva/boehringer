import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from "next/server"
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
    const supabase = createServerSupabaseClient()
    const req = await request.json()
    const { day } = req

    if (!day) return NextResponse.json({ error: 'Day is required' }, { status: 402 })

    try {
        const { count, error } = await supabase
            .from('ranking')
            .delete()
            .eq('day', day)

        if (error) throw error

        revalidatePath('/dashboard')
        return NextResponse.json({ status: 200, rowCount: count, command: 'DELETE' })
    } catch (error) {
        console.error('Error removing participations:', error)
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
    }
}