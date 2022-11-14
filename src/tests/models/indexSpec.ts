import userSuite from './userSpec'
import productSuite from './productSpec'
import orderSuite from './orderSpec'
import orderProductSuite from './orderProductSpec'

describe('Model Suite', () => {
    userSuite()
    productSuite()
    orderSuite()
    orderProductSuite()
})
