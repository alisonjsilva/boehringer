import { appendRow, generateId, SHEETS } from '@/lib/google-sheets'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const req = await request.json()
    const { name, email, phone } = req

    try {
        if (!name) throw new Error('Name is required')

        const id = generateId()
        const createdAt = new Date().toISOString()

        await appendRow(SHEETS.USERS, [id, name, email || '', phone || '', createdAt])

        return NextResponse.json({ rows: [{ id }] }, { status: 200 })
    } catch (error) {
        console.error('Error adding user:', error)
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
    }
}
