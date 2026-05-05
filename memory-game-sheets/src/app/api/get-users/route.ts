import { getRows, SHEETS } from '@/lib/google-sheets'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        const rows = await getRows(SHEETS.RANKING)

        if (rows.length <= 1) {
            return NextResponse.json({ rows: [], fields: [] }, { status: 200 })
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

        // Sort by moves ascending, ranking_date descending
        dataRows.sort((a, b) => {
            if (a.moves !== b.moves) return a.moves - b.moves
            return b.ranking_date.localeCompare(a.ranking_date)
        })

        // Limit to 10
        const limited = dataRows.slice(0, 10)

        return NextResponse.json({ rows: limited, fields: [] }, { status: 200 })
    } catch (error) {
        console.error('Error getting ranking:', error)
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 })
    }
}
