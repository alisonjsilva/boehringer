import { createServerSupabaseClient } from '@/lib/supabase'

export default async function UsersQuery() {
    const supabase = createServerSupabaseClient()
    
    const { data: rows, error } = await supabase
        .from('users')
        .select('*')

    if (error) {
        console.error('Error fetching users:', error)
        return (
            <div>
                <h1>Users</h1>
                <p>Error loading users</p>
            </div>
        )
    }

    return (
        <div>
            <h1>Users</h1>
            <p>Users list - {rows?.length || 0} users found</p>
        </div>
    )
}