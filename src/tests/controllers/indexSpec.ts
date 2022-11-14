import 'jasmine'
import userSuite from './userSpec'
import productSuite from './productSpec'
import orderSuite from './orderSpec'

describe('API Suite', () => {
    userSuite()
    productSuite()
    orderSuite()
})
