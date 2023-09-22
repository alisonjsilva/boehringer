import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { sql } from "@vercel/postgres"


type Props = {
    rows: any;
}

export default async function RankingList() {
    const { rows, fields } = await sql`SELECT id, name, moves, time, day FROM Ranking ORDER BY Day DESC, Moves ASC, Ranking_date DESC, Time;`
    console.log(rows)
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
                    rows.map((row: any) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.userid}</TableCell>
                            <TableCell className="font-medium">{row.name}</TableCell>
                            {/* <TableCell>{row.ranking_date.toString()}</TableCell> */}
                            <TableCell>{row.moves}</TableCell>
                            <TableCell>{row.time}</TableCell>
                            <TableCell>{row.day}</TableCell>
                        </TableRow>
                    ))
                }
                {/* <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                </TableRow> */}
            </TableBody>
        </Table>
    )
}
