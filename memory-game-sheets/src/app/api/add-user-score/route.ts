import { appendRow, generateId, SHEETS } from '@/lib/google-sheets'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const req = await request.json()
    const { userId, name, moves, time, day } = req

    try {
        if (!userId || !name || !moves) throw new Error('UserId, name and moves are required')

        const id = generateId()
        const rankingDate = new Date().toISOString()

        await appendRow(SHEETS.RANKING, [id, name, userId, moves, time, day, rankingDate])

        return NextResponse.json({ status: 200 })
    } catch (error) {
        console.error('Error adding user score:', error)
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
    }
}
