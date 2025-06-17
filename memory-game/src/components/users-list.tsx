'use client'
import { use, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import UsersQuery from './usersQuery'

const getUsers = async (): Promise<any> => {
    const { data: rows, error } = await supabase
        .from('users')
        .select('*')
    
    if (error) {
        console.error('Error fetching users:', error)
        return []
    }

    return rows
}

export default function Users() {
    
    // const users = use(getUsers())
    // console.log(users)

    return (
        <div>
            {/* <UsersQuery /> */}
            <h1>Users</h1>
            <p>Users list</p>
        </div>
    )
}