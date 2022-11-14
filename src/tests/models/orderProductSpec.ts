import { OrderProduct, OrderProductModel } from '../../models/order_product'

const orderId = 1
const orderProduct: OrderProduct = {
    productId: 1,
    quantity: 7,
}

export default function() {
    describe('Order Product Suite', () => {
        it('can add a product to an order', () => {
            return expectAsync(OrderProductModel.add(orderId, orderProduct))
                .toBeResolvedTo(orderProduct)
        })

        it('can get a list of products in an order', async () => {
            const orderProducts = await OrderProductModel.getAll(orderId)

            expect(orderProducts).toContain(orderProduct)
        })
    })
}
