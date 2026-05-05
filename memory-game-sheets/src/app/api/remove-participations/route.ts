import { deleteRowsByCondition, SHEETS } from '@/lib/google-sheets'
import { NextResponse } from "next/server"

export async function POST(request: Request) {
    const req = await request.json()
    const { day } = req

    if (!day) return NextResponse.json({ error: 'Day is required' }, { status: 400 })

    try {
        // Column index 5 = "day" column in ranking sheet
        // Header: [id, name, userid, moves, time, day, ranking_date]
        const deletedCount = await deleteRowsByCondition(SHEETS.RANKING, 5, String(day))

        console.log(`Successfully deleted ${deletedCount} records for day ${day}`)
        return NextResponse.json({
            status: 200,
            rowCount: deletedCount,
            command: 'DELETE',
            day,
            deletedRows: deletedCount
        })
    } catch (error) {
        console.error('Error removing participations:', error)
        return NextResponse.json({
            error: error instanceof Error ? error.message : 'Unknown error',
            status: 500
        }, { status: 500 })
    }
}
