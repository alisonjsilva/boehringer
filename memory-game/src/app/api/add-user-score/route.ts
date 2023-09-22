import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const req = await request.json()
    const { userId, name, moves, time, day } = req

    try {
        if (!userId || !name || !moves) throw new Error('All data required')
        console.log('userId', userId)
        await sql`INSERT INTO Ranking (Name, Userid, Moves, Time, Day) VALUES (${name}, ${userId}, ${moves}, ${time}, ${day});`
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error }, { status: 500 })
    }

    return NextResponse.json({ status: 200 })
}