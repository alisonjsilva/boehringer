'use client'
import { use, useEffect, useState } from "react"
import { useRouter } from 'next/navigation'

// Buttons to remove rows from the database in table Raking where Day = 1
export default function ActionButtons() {

    // const [day, setDay] = useState(1)
    const router = useRouter()
    const [deleted, setDeleted] = useState(false)

    useEffect(() => {
        if (deleted) {
            router.refresh()
        }
    }, [deleted, router])


    async function removeParticipation(day: number) {
        if (!confirm('Are you sure you want to delete this participations?\nAll participations from day ' + day + ' will be deleted.\nThis action cannot be undone.')) {
            console.log('cancel')
            return
        }
        console.log('removeParticipation')
        if (!day) return

        const response = await fetch(
            '/api/remove-participations',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    day,
                }),
            }
        )
        const result = await response.json()

        if (result.status === 200) {
            setDeleted(true)
            console.log('deleted')
        }

        return result
    }

    return (
        <div className="flex flex-row justify-center gap-2">
            <button onClick={() => removeParticipation(1)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                Delete Day 1
            </button>
            <button onClick={() => removeParticipation(2)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                Delete Day 2
            </button>
            <button onClick={() => removeParticipation(3)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md">
                Delete Day 3
            </button>
        </div>
    )
}