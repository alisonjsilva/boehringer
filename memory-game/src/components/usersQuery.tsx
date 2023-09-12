import { sql } from '@vercel/postgres'
export default async function UsersQuery() {

    const { rows, fields } = await sql`SELECT * FROM users;`
    return (
        <div>
            <h1>Users</h1>
            <p>Users list</p>
        </div>
    )
}