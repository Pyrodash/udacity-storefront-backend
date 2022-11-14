import 'jasmine'
import supertest from 'supertest'
import { Order } from '../../models/order'
import { app } from '../../server'
import { signToken } from '../../utils/auth'

const request = supertest(app)
const userId = 1
let order: Order

let token: string
let authHeader: string

export default function() {
    describe('Order Suite', function() {
        beforeAll(async () => {
            token = await signToken(userId)
            authHeader = `Bearer ${token}`
        })

        it('won\'t work without a token', async () => {
            const res = await request.get('/orders/user/1')
            
            expect(res.status).toBe(401)
        })

        it('can add new orders', async () => {
            const res = await request
                .post('/orders')
                .set('Authorization', authHeader)
            
            expect(res.status).toBe(200)

            order = res.body.order
        })

        it('won\'t add an order product with missing data', async () => {
            const data = {
                productId: 1,
                quantity: undefined,
            }

            const res = await request
                .post('/orders/1/products')
                .set('Authorization', authHeader)
                .send(data)
            
            expect(res.status).toBe(400)
        })


        it('can add new order products', async () => {
            const data = {
                productId: 1,
                quantity: 5,
            }

            const res = await request
                .post('/orders/1/products')
                .set('Authorization', authHeader)
                .send(data)
            
            expect(res.status).toBe(200)

            order.products.push(res.body.order_product)
        })

        it('can get a user\'s current order', async () => {
            const res = await request
                .get('/orders/current/user/1')
                .set('Authorization', authHeader)
                
            expect(res.status).toBe(200)
            expect(res.body).toEqual(jasmine.objectContaining({
                order,
            }))
        })

        it('can get a list of orders by user', async () => {
            const res = await request
                .get('/orders/user/1')
                .set('Authorization', authHeader)
                
            expect(res.status).toBe(200)
            expect(res.body).toEqual({
                orders: [order]
            })
        })

        it('can get a list of active orders by user', async () => {
            const res = await request
                .get('/orders/active/user/1')
                .set('Authorization', authHeader)
                
            expect(res.status).toBe(200)
            expect(res.body).toEqual({
                orders: [order]
            })
        })

        it('can get a list of completed orders by user', async () => {
            const res = await request
                .get('/orders/completed/user/1')
                .set('Authorization', authHeader)
                
            expect(res.status).toBe(200)
            expect(res.body).toEqual({
                orders: []
            })
        })
    })
}
