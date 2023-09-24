import { sql } from "@vercel/postgres"
import { NextResponse } from "next/server"
import { revalidatePath } from 'next/cache'

export async function POST(request: Request) {

    const req = await request.json()
    const { day } = req

    if (!day) return NextResponse.json({ error: 'Day is required' }, { status: 402 })

    const { rowCount, command } = await sql`DELETE FROM Ranking WHERE Day = ${day};`
    revalidatePath('/dashboard')
    return NextResponse.json({ status: 200, rowCount, command })
}