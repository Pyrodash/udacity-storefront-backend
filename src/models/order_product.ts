import db from '../database'

export interface OrderProduct {
    productId: number
    quantity: number
}

export class OrderProductModel {
    private static mapRowToObject(row: Record<string, unknown>): OrderProduct {
        return {
            productId: <number>row.product_id,
            quantity: <number>row.quantity
        }
    }

    static async getAll(orderId: number): Promise<OrderProduct[]> {
        const { rows } = await db.query({
            text: 'SELECT product_id, quantity FROM order_products WHERE order_id = $1',
            values: [orderId],
        })

        return rows.map(this.mapRowToObject)
    }
}
