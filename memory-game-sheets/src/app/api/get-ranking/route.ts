import { getRows, SHEETS } from '@/lib/google-sheets'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const day = searchParams.get('day')

    try {
        const rows = await getRows(SHEETS.RANKING)

        if (rows.length <= 1) {
            return NextResponse.json({ rows: [], fields: [] })
        }

        // Header: [id, name, userid, moves, time, day, ranking_date]
        const dataRows = rows.slice(1).map((row) => ({
            id: row[0],
            name: row[1],
            userid: row[2],
            moves: Number(row[3]),
            time: Number(row[4]),
            day: Number(row[5]),
            ranking_date: row[6],
        }))

        let filtered = dataRows

        // Filter by day if provided
        if (day) {
            const dayNumber = Number(day)
            filtered = filtered.filter((row) => row.day === dayNumber)
        }

        // Sort: moves ascending, ranking_date descending, time ascending
        filtered.sort((a, b) => {
            if (a.moves !== b.moves) return a.moves - b.moves
            if (a.ranking_date !== b.ranking_date) return b.ranking_date.localeCompare(a.ranking_date)
            return a.time - b.time
        })

        // Limit to 5 if filtering by day
        if (day) {
            filtered = filtered.slice(0, 5)
        }

        return NextResponse.json({ rows: filtered, fields: [] })
    } catch (error) {
        console.error('Error fetching ranking:', error)
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}
