import db from '../database'

export interface Product {
    id: number
    name: string
    price: number
    category: number
}

export default class ProductModel {
    private static mapRowToObject(row: Record<string, unknown>): Product {
        return {
            id: <number>row.id,
            name: <string>row.name,
            price: Number(row.price),
            category: <number>row.category_id
        }
    }

    static async getAll(): Promise<Product[]> {
        const { rows } = await db.query('SELECT * FROM products')

        return rows.map(this.mapRowToObject)
    }

    static async get(id: number): Promise<Product | null> {
        const query = await db.query({
            text: 'SELECT * FROM products WHERE id = $1 LIMIT 1',
            values: [id],
        })
        
        if (query.rows[0]) {
            return this.mapRowToObject(query.rows[0])
        } else {
            return null
        }
    }

    static async getByCategory(categoryId: number): Promise<Product[]> {
        const { rows } = await db.query({
            text: 'SELECT * FROM products WHERE category_id = $1',
            values: [categoryId],
        })

        return rows.map(this.mapRowToObject)
    }

    static async add(product: Omit<Product, 'id'>): Promise<Product> {
        const query = await db.query({
            text: 'INSERT INTO products(name, price, category_id) VALUES($1, $2, $3) RETURNING id',
            values: [product.name, product.price, product.category]
        })

        return {
            id: query.rows[0].id,
            ...product,
        }
    }
}
