import { Pool } from 'pg'
import Config from './config'

const pool = new Pool({
    host: Config.pgHost,
    port: Config.pgPort,
    user: Config.pgUser,
    password: Config.pgPassword,
    database: Config.pgDatabase
})

export default pool
