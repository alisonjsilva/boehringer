import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {

    const { rows, fields } = await sql`SELECT * FROM users;`
    // console.log(rows, fields)
    return NextResponse.json({ rows, fields }, { status: 200 })
}