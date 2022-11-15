import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import authMiddleware from '../middleware/auth'
import { UserModel } from '../models/user'
import { addSchema } from '../schemas/user'
import { validate } from '../utils/validator'
import Config from '../config'
import { logger } from '../utils/logger'
import { signToken } from '../utils/auth'

const router = express.Router()

router.get('/', authMiddleware, async (req: Request, res: Response) => {
    try {
        const users = await UserModel.getAll()

        res.send({ users })
    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: 'Server Error' })
    }
})

router.post(
    '/',
    validate({ body: addSchema }),
    async (req: Request, res: Response) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, Config.bcryptSaltRounds)
        
            const user = await UserModel.add(req.body)
            const token = await signToken(user.id)

            res.send({ user, token })
        } catch (error) {
            logger.error(error)
            res.status(500).send({ message: 'Server Error' })
        }
    }
)

router.get('/:id', authMiddleware, async (req, res) => {
    const userId = Number(req.params.id)
        
    if (!userId) {
        return res.status(400).send({ message: 'Invalid user id' })
    }

    try {
        const user = await UserModel.get(userId)

        if (!user) {
            res.status(404).send({
                user: null,
                message: 'Not Found',
            })
        } else {
            res.send({ user })
        }
    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: 'Server Error' })
    }
})

export default router
