import { Order, OrderModel, Status } from '../../models/order'

const userId = 1
let orderId: number

export default function() {
    describe('Order Model Suite', () => {
        it('can add new orders', async () => {
            const data: Omit<Order, 'id'> = {
                userId,
                status: Status.Active,
                products: [],
            }

            const order = await OrderModel.add(data)

            expect(order).toEqual(jasmine.objectContaining(data))

            orderId = order.id
        })

        it('can get a list of orders by user id', async () => {
            const orders = await OrderModel.getAllByUser(userId)

            expect(orders).toContain({
                id: orderId,
                userId,
                status: Status.Active,
                products: [],
            })
        })

        it('can get a list of orders by user id and status', async () => {
            const orders = await OrderModel.getAllByUserAndStatus(userId, Status.Active)

            expect(orders).toContain({
                id: orderId,
                userId,
                status: Status.Active,
                products: [],
            })
        })
        
        it('can get the user\'s current order', async () => {
            const order = await OrderModel.getCurrentByUser(userId)

            expect(order).toEqual({
                id: orderId,
                userId,
                status: Status.Active,
                products: [],
            })
        })
    })
}
