import { NextFunction, Request, Response } from 'express'
import jwt from 'jwt-promisify'
import Config from '../config'
import { extractBearerToken } from '../utils/auth'

export default async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const token = extractBearerToken(req.headers.authorization || '')

    try {
        const payload = await jwt.verify(token, Config.jwtPublicKey)
        req.userId = payload.id

        next()
    } catch (err) {
        res.status(401).send({ message: 'Unauthorized' })
    }
}
