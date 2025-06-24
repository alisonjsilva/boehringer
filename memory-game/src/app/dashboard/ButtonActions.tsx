'use client'
import { use, useEffect, useState } from "react"

// Buttons to remove rows from the database in table Raking where Day = 1
export default function ActionButtons() {
    const [isDeleting, setIsDeleting] = useState(false)

    async function removeParticipation(day: number) {
        if (!confirm('Are you sure you want to delete this participations?\nAll participations from day ' + day + ' will be deleted.\nThis action cannot be undone.')) {
            console.log('cancel')
            return
        }
        
        console.log('removeParticipation')
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
                    body: JSON.stringify({
                        day,
                    }),
                }
            )
            const result = await response.json()

            if (result.status === 200) {
                console.log('deleted successfully:', result)
                
                // Trigger custom event to refresh the ranking list
                window.dispatchEvent(new CustomEvent('refreshRanking'))
                
                // Show success message
                alert(`Successfully deleted ${result.rowCount || 0} participations for day ${day}`)
            } else {
                console.error('Delete failed:', result)
                alert('Failed to delete participations. Please try again.')
            }
        } catch (error) {
            console.error('Error during delete:', error)
            alert('An error occurred while deleting participations.')
        } finally {
            setIsDeleting(false)
        }

        return
    }

    return (
        <div className="flex flex-row justify-center gap-2 mb-4">
            <button 
                onClick={() => removeParticipation(1)} 
                disabled={isDeleting}
                className={`${
                    isDeleting ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'
                } text-white font-bold py-2 px-4 rounded-md transition-colors`}
            >
                {isDeleting ? 'Deleting...' : 'Delete Day 1'}
            </button>
            <button 
                onClick={() => removeParticipation(2)} 
                disabled={isDeleting}
                className={`${
                    isDeleting ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'
                } text-white font-bold py-2 px-4 rounded-md transition-colors`}
            >
                {isDeleting ? 'Deleting...' : 'Delete Day 2'}
            </button>
            <button 
                onClick={() => removeParticipation(3)} 
                disabled={isDeleting}
                className={`${
                    isDeleting ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-700'
                } text-white font-bold py-2 px-4 rounded-md transition-colors`}
            >
                {isDeleting ? 'Deleting...' : 'Delete Day 3'}
            </button>
        </div>
    )
}