import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {

    const { rows, fields } = await sql`SELECT * FROM Ranking ORDER BY Moves AND ORDER BY Ranking_date;`
    // console.log(rows, fields)
    return NextResponse.json({ rows, fields }, { status: 200 })
}