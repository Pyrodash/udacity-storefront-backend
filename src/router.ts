import express from 'express'
import productController from './controllers/product'
import userController from './controllers/user'
import orderController from './controllers/order'

const router = express.Router()

router.use('/products', productController)
router.use('/users', userController)
router.use('/orders', orderController)

export default router
