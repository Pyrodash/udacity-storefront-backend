import express from 'express'
import authMiddleware from '../middleware/auth'
import { OrderModel, Status } from '../models/order'

const router = express.Router()

router.use(authMiddleware)

router.get('/user/:id', async (req, res) => {
    const userId = Number(req.params.id)
        
    if (!userId) {
        return res.status(400).send({ message: 'Invalid user id' })
    }

    const orders = await OrderModel.getAllByUser(userId)

    res.send({ orders })
})

router.get('/current/user/:id', async (req, res) => {
    const userId = Number(req.params.id)
        
    if (!userId) {
        return res.status(400).send({ message: 'Invalid user id' })
    }

    const order = await OrderModel.getCurrentByUser(userId)

    if (!order) {
        res.status(404).send({
            order: null,
            message: 'Not Found',
        })
    } else {
        res.send({ order })
    }
})

router.get('/active/user/:id', async (req, res) => {
    const userId = Number(req.params.id)
        
    if (!userId) {
        return res.status(400).send({ message: 'Invalid user id' })
    }

    const orders = await OrderModel.getAllByUserAndStatus(userId, Status.Active)

    res.send({ orders })
})

router.get('/completed/user/:id', async (req, res) => {
    const userId = Number(req.params.id)
        
    if (!userId) {
        return res.status(400).send({ message: 'Invalid user id' })
    }

    const orders = await OrderModel.getAllByUserAndStatus(userId, Status.Completed)

    res.send({ orders })
})

export default router
