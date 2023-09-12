import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {

    const { rows, fields } = await sql`SELECT * FROM Ranking ORDER BY Moves ASC, Ranking_date DESC LIMIT 10;`
    // console.log(rows, fields)
    return NextResponse.json({ rows, fields }, { status: 200 })
}