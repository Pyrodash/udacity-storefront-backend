import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jwt-promisify'
import { UserModel } from '../models/user'
import { authSchema } from '../schemas/auth'
import { validate } from '../utils/validator'
import Config from '../config'

interface AuthPayload {
    id: number
    password: string
}

const router = express.Router()

router.post('/', validate({ body: authSchema }), async (req, res) => {
    const payload = <AuthPayload>req.body
    const user = await UserModel.get(payload.id)

    if (user) {
        const result = await bcrypt.compare(payload.password, user.password)

        if (result) {
            const token = await jwt.sign({ id: user.id }, Config.jwtPrivateKey, { algorithm: Config.jwtAlgorithm })

            return res.send({ token })
        }
    }

    res.status(401).send({ message: 'Invalid id or password' })
})

export default router
