import { createServerSupabaseClient } from '@/lib/supabase'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const supabase = createServerSupabaseClient()
    const req = await request.json()
    const { name, email, phone } = req
    // const { searchParams } = new URL(request.url)
    // const name = searchParams.get('name')
    // const phone = searchParams.get('phone')
    // const email = searchParams.get('email')

    try {
        if (!name) throw new Error('Name is required')
        // const { rowCount, rows } = await sql`SELECT * FROM Users WHERE Email = ${email};`
        // if (rowCount > 0)
        //     return NextResponse.json({ rows }, { status: 200 })

        // Insert user and return the ID
        const { data: insertData, error: insertError } = await supabase
            .from('users')
            .insert({ name, email, phone })
            .select('id')
            .single()

        if (insertError) throw insertError

        return NextResponse.json({ rows: [insertData] }, { status: 200 })
    } catch (error) {
        console.error('Error adding user:', error)
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
    }
}