'use client'

import { useEffect, useState } from "react"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

type RankingRow = {
    id: string;
    name: string;
    userid: string;
    moves: number;
    time: number;
    day: number;
    ranking_date: string;
}

export default function RankingList() {
    const [rows, setRows] = useState<RankingRow[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchData = async () => {
        try {
            setLoading(true)
            const response = await fetch('/api/get-ranking', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
            })

            if (!response.ok) {
                throw new Error('Failed to fetch ranking data')
            }

            const data = await response.json()
            setRows(data.rows || [])
            setError(null)
        } catch (err) {
            console.error('Error fetching ranking:', err)
            setError('Error loading ranking data')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        const handleRefresh = () => {
            fetchData()
        }

        window.addEventListener('refreshRanking', handleRefresh)
        
        return () => {
            window.removeEventListener('refreshRanking', handleRefresh)
        }
    }, [])

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <div className='loading-spinner'></div>
                <p className="text-white/60 mt-4">Loading ranking data...</p>
            </div>
        )
    }

    if (error) {
        return <div className="text-center py-4 text-red-400">{error}</div>
    }

    const fields = [
        { name: 'userid' },
        { name: 'name' },
        { name: 'moves' },
        { name: 'time' },
        { name: 'day' }
    ]

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
