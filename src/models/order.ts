import db from '../database'
import { OrderProduct, OrderProductModel } from './order_product'

export enum Status {
    Active = 0,
    Completed = 1
}

export interface Order {
    id: number
    userId: number
    status: Status
    products: OrderProduct[]
}

export class OrderModel {
    private static async mapRowToObject(row: Record<string, unknown>): Promise<Order> {
        return {
            id: <number>row.id,
            userId: <number>row.user_id,
            status: <Status>row.status,
            products: await OrderProductModel.getAll(<number>row.id),
        }
    }

    static async getAllByUser(userId: number): Promise<Order[]> {
        const { rows } = await db.query({
            text: 'SELECT * FROM orders WHERE user_id = $1',
            values: [userId],
        })

        return await Promise.all(rows.map(this.mapRowToObject))
    }

    static async getAllByUserAndStatus(userId: number, status: Status): Promise<Order[]> {
        const { rows } = await db.query({
            text: 'SELECT * FROM orders WHERE user_id = $1 AND status = $2',
            values: [userId, status],
        })

        return await Promise.all(rows.map(this.mapRowToObject))
    }

    static async getCurrentByUser(userId: number): Promise<Order | null> {
        const query = await db.query({
            text: 'SELECT * FROM orders WHERE user_id = $1 AND status = 0 ORDER BY id DESC LIMIT 1',
            values: [userId],
        })
        
        if (query.rows[0]) {
            return await this.mapRowToObject(query.rows[0])
        } else {
            return null
        }
    }
}
