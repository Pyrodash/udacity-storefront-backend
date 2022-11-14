import db from '../database'

export interface User {
    id: number
    firstName: string
    lastName: string
    password: string
}

export class UserModel {
    private static mapRowToObject(row: Record<string, unknown>): User {
        return {
            id: <number>row.id,
            firstName: <string>row.first_name,
            lastName: <string>row.last_name,
            password: <string>row.password
        }
    }

    static async getAll(): Promise<User[]> {
        const { rows } = await db.query('SELECT * FROM users')

        return rows.map(this.mapRowToObject)
    }

    static async get(id: number): Promise<User | null> {
        const query = await db.query({
            text: 'SELECT * FROM users WHERE id = $1 LIMIT 1',
            values: [id],
        })
        
        if (query.rows[0]) {
            return this.mapRowToObject(query.rows[0])
        } else {
            return null
        }
    }

    static async add(user: Omit<User, 'id'>): Promise<User> {
        const query = await db.query({
            text: 'INSERT INTO users(first_name, last_name, password) VALUES($1, $2, $3) RETURNING id',
            values: [user.firstName, user.lastName, user.password]
        })

        return {
            id: query.rows[0].id,
            ...user,
        }
    }
}
