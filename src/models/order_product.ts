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

    static async add(orderId: number, orderProduct: OrderProduct): Promise<OrderProduct> {
        await db.query({
            text: 'INSERT INTO order_products(order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING id',
            values: [orderId, orderProduct.productId, orderProduct.quantity]
        })

        return orderProduct
    }
}
