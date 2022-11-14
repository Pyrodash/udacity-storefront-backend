import express, { Request, Response } from 'express'
import authMiddleware from '../middleware/auth'
import { Order, OrderModel, Status } from '../models/order'
import { OrderProductModel } from '../models/order_product'
import { addSchema } from '../schemas/order'
import { logger } from '../utils/logger'
import { validate } from '../utils/validator'

const router = express.Router()

router.use(authMiddleware)

router.post('/', async (req: Request, res: Response) => {
    const userId = req.userId!
    const order: Omit<Order, 'id'> = {
        userId,
        status: Status.Active,
        products: [],
    }

    try {
        res.send({ order: await OrderModel.add(order) })
    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: 'Server Error' })
    }
})

router.post(
    '/:id/products',
    validate({ body: addSchema }),
    async (req: Request, res: Response) => {
        const orderId = Number(req.params.id)

        if (!orderId) {
            return res.status(400).send({ message: 'Invalid order id' })
        }

        try {
            const orderProduct = await OrderProductModel.add(orderId, req.body)

            res.send({ order_product: orderProduct })
        } catch (error) {
            logger.error(error)
            res.status(500).send({ message: 'Server Error' })
        }
    }
)

router.get('/user/:id', async (req: Request, res: Response) => {
    const userId = Number(req.params.id)
        
    if (!userId) {
        return res.status(400).send({ message: 'Invalid user id' })
    }

    try {
        const orders = await OrderModel.getAllByUser(userId)

        res.send({ orders })
    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: 'Server Error' })
    }
})

router.get('/current/user/:id', async (req: Request, res: Response) => {
    const userId = Number(req.params.id)
        
    if (!userId) {
        return res.status(400).send({ message: 'Invalid user id' })
    }

    try {
        const order = await OrderModel.getCurrentByUser(userId)

        if (!order) {
            res.status(404).send({
                order: null,
                message: 'Not Found',
            })
        } else {
            res.send({ order })
        }
    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: 'Server Error' })
    }
})

router.get('/active/user/:id', async (req: Request, res: Response) => {
    const userId = Number(req.params.id)
        
    if (!userId) {
        return res.status(400).send({ message: 'Invalid user id' })
    }

    try {
        const orders = await OrderModel.getAllByUserAndStatus(userId, Status.Active)

        res.send({ orders })
    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: 'Server Error' })
    }
})

router.get('/completed/user/:id', async (req: Request, res: Response) => {
    const userId = Number(req.params.id)
        
    if (!userId) {
        return res.status(400).send({ message: 'Invalid user id' })
    }

    try {
        const orders = await OrderModel.getAllByUserAndStatus(userId, Status.Completed)

        res.send({ orders })
    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: 'Server Error' })
    }
})

export default router
