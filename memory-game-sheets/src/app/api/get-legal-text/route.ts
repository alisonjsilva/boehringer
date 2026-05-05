import { getRows, SHEETS } from '@/lib/google-sheets'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const day = searchParams.get('day') || '1'

    try {
        const rows = await getRows(SHEETS.LEGAL_TEXTS)

        if (rows.length <= 1) {
            return NextResponse.json({ text: '' })
        }

        // Header: [day, text]
        const dayNumber = parseInt(day)
        const found = rows.slice(1).find((row) => Number(row[0]) === dayNumber)

        return NextResponse.json({ text: found ? found[1] : '' })
    } catch (error) {
        console.error('Error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
