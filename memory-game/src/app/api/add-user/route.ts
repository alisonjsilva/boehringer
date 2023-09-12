import { sql } from '@vercel/postgres'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    const req = await request.json()
    const { name, email, phone } = req
    // const { searchParams } = new URL(request.url)
    // const name = searchParams.get('name')
    // const phone = searchParams.get('phone')
    // const email = searchParams.get('email')

    try {
        if (!name || !phone || !email) throw new Error('All data required')
        const { rowCount, rows } = await sql`SELECT * FROM Users WHERE Email = ${email};`
        if (rowCount > 0)
            return NextResponse.json({ rows }, { status: 200 })

        await sql`INSERT INTO Users (Name, Phone, Email) VALUES (${name}, ${phone}, ${email});`
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error, "assd": "as" }, { status: 500 })
    }

    const { rows } = await sql`SELECT ID FROM Users WHERE Email = ${email};`
    // console.log('user', user)
    return NextResponse.json({ rows }, { status: 200 })
}