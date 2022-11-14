import express from 'express'
import authController from './controllers/auth'
import productController from './controllers/product'
import userController from './controllers/user'
import orderController from './controllers/order'

const router = express.Router()

router.use('/auth', authController)
router.use('/products', productController)
router.use('/users', userController)
router.use('/orders', orderController)

export default router
