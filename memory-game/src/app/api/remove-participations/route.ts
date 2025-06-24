import { createAdminSupabaseClient } from '@/lib/supabase'
import { NextResponse } from "next/server"
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {
    const supabase = createAdminSupabaseClient()
    const req = await request.json()
    const { day } = req

    if (!day) return NextResponse.json({ error: 'Day is required' }, { status: 400 })

    try {
        const { data, count, error } = await supabase
            .from('ranking')
            .delete()
            .eq('day', day)
            .select() // This ensures we get the count

        if (error) throw error

        // Revalidate multiple paths to ensure proper cache clearing
        revalidatePath('/dashboard')
        revalidatePath('/')
        
        console.log(`Successfully deleted ${count} records for day ${day}`)
        return NextResponse.json({ 
            status: 200, 
            rowCount: count, 
            command: 'DELETE', 
            day,
            deletedRows: data?.length || 0 
        })
    } catch (error) {
        console.error('Error removing participations:', error)
        return NextResponse.json({ 
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 500 
        }, { status: 500 })
    }
}