import 'jasmine'
import supertest from 'supertest'
import { Product } from '../../models/product'
import { User } from '../../models/user'
import { app } from '../../server'
import { hashPassword, signToken } from '../../utils/auth'

const request = supertest(app)

let token: string
let authHeader: string

export default function() {
    describe('Product Suite', function() {
        beforeAll(async () => {
            token = await signToken(0)
            authHeader = `Bearer ${token}`
        })

        it('won\'t add a product without a token', async () => {
            const res = await request.post('/products')
            
            expect(res.status).toBe(401)
        })

        it('won\'t add a product with missing data', async () => {
            const data = {
                name: null,
                price: 200.5,
                category: 1,
            }

            const res = await request
                .post('/products')
                .set('Authorization', authHeader)
                .send(data)
            
            expect(res.status).toBe(400)
        })

        it('won\'t add a product with incorrect data', async () => {
            const data = {
                name: 123,
                price: 200.5,
                category: 1,
            }

            const res = await request
                .post('/products')
                .set('Authorization', authHeader)
                .send(data)
            
            expect(res.status).toBe(400)
        })

        it('can add new products', async () => {
            const data: Omit<Product, 'id'> = {
                name: 'Telescope',
                price: 200.5,
                category: 1,
            }

            const res = await request
                .post('/products')
                .set('Authorization', authHeader)
                .send(data)
            
            expect(res.status).toBe(200)
            expect(res.body).toEqual({
                product: {
                    id: 1,
                    ...data,
                }
            })
        })

        it('can get a list of products', async () => {
            const res = await request.get('/products')
            
            expect(res.status).toBe(200)
            expect(res.body).toEqual({
                products: [
                    {
                        id: 1,
                        name: 'Telescope',
                        price: 200.5,
                        category: 1,
                    },
                ]
            })
        })

        it('can get a list of products in a certain category', async () => {
            const res = await request.get('/products/category/1')
            
            expect(res.status).toBe(200)
            expect(res.body).toEqual({
                products: [
                    {
                        id: 1,
                        name: 'Telescope',
                        price: 200.5,
                        category: 1,
                    },
                ]
            })
        })

        it('returns 404 when you try to fetch a non-existing product', async () => {
            const res = await request.get('/products/2')
                
            expect(res.status).toBe(404)
        })

        it('can get a specific product', async () => {
            const res = await request.get('/products/1')
            
            expect(res.status).toBe(200)
            expect(res.body).toEqual({
                product: {
                    id: 1,
                    name: 'Telescope',
                    price: 200.5,
                    category: 1,
                },
            })
        })
    })
}
