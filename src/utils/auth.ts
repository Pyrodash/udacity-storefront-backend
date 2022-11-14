import bcrypt from 'bcrypt'
import jwt from 'jwt-promisify'
import Config from '../config'

export function hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, Config.bcryptSaltRounds)
}

export function extractBearerToken(header: string): string {
    if (header.startsWith('Bearer ')){
        return header.substring(7, header.length)
    } else {
        return ''
    }
}

export function signToken(userId: number): Promise<string> {
    return jwt.sign({ id: userId }, Config.jwtPrivateKey, { algorithm: Config.jwtAlgorithm })
}
