'use client'
import { use, useEffect } from 'react'
import { sql } from '@vercel/postgres'
import UsersQuery from './usersQuery'

const getUsers = async (): Promise<any> => {
    // const data = await fetch("https://jsonplaceholder.typicode.com/posts")
    const { rows, fields } = await sql`SELECT * FROM users;`
    // const users = await data.json()

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