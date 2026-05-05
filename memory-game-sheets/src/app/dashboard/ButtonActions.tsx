'use client'
import { useState } from "react"

export default function ActionButtons() {
    const [isDeleting, setIsDeleting] = useState(false)

    async function removeParticipation(day: number) {
        if (!confirm('Are you sure you want to delete this participations?\nAll participations from day ' + day + ' will be deleted.\nThis action cannot be undone.')) {
            return
        }
        
        setIsDeleting(true)
        
        if (!day) return

        try {
            const response = await fetch(
                '/api/remove-participations',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ day }),
                }
            )
            const result = await response.json()

            if (result.status === 200) {
                window.dispatchEvent(new CustomEvent('refreshRanking'))
                alert(`Successfully deleted ${result.rowCount || 0} participations for day ${day}`)
            } else {
                alert('Failed to delete participations. Please try again.')
            }
        } catch (error) {
            console.error('Error during delete:', error)
            alert('An error occurred while deleting participations.')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <div className="flex flex-row justify-center gap-2 mb-4">
            {[1, 2, 3].map((day) => (
                <button
                    key={day}
                    onClick={() => removeParticipation(day)}
                    disabled={isDeleting}
                    className={`${
                        isDeleting ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500'
                    } text-white font-medium py-2 px-4 rounded-lg transition-colors`}
                >
                    {isDeleting ? 'Deleting...' : `Delete Day ${day}`}
                </button>
            ))}
        </div>
    )
}