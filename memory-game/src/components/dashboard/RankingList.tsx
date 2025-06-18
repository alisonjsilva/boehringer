import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { createServerSupabaseClient } from '@/lib/supabase'

type Props = {
    rows: any;
}

export default async function RankingList() {
    const supabase = createServerSupabaseClient()
    
    const { data: rows, error, count } = await supabase
        .from('ranking')
        .select('id, name, userid, moves, time, day, ranking_date')
        .order('day', { ascending: false })
        .order('moves', { ascending: true })
        .order('ranking_date', { ascending: false })
        .order('time', { ascending: true })

    if (error) {
        console.error('Error fetching ranking:', error)
        return <div>Error loading ranking data</div>
    }

    // Create fields array similar to the original structure
    const fields = [
        { name: 'userid' },
        { name: 'name' },
        { name: 'moves' },
        { name: 'time' },
        { name: 'day' }
    ]

    console.log('rows', rows, count)
    return (
        <Table>
            <TableCaption>A list of all participations.</TableCaption>
            <TableHeader>
                <TableRow>
                    {
                        fields.map((field: any) => (
                            <TableHead key={field.name}>{field.name}</TableHead>
                        ))
                    }
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    rows?.map((row: any) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.userid}</TableCell>
                            <TableCell className="font-medium">{row.name}</TableCell>
                            <TableCell>{row.moves}</TableCell>
                            <TableCell>{row.time}</TableCell>
                            <TableCell>{row.day}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}
