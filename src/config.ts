import dotenv from 'dotenv'

dotenv.config()

import { join } from 'path'
import { readFileSync } from 'fs'
import { Algorithm } from 'jwt-promisify'
import { isTest, readBoolean, readNumber, readString } from './utils/env'

const jwtPublicKeyPath = join(__dirname, '..', 'cert', 'public.pem')
const jwtPrivateKeyPath = join(__dirname, '..', 'cert', 'private.pem')

const jwtUseDisk = readBoolean('JWT_USE_DISK')

export default class Config {
    static port: number = readNumber('PORT', 3000)

    static jwtAlgorithm: Algorithm = readString('JWT_ALGORITHM', 'HS256') as Algorithm
    static jwtPublicKey: string = jwtUseDisk ?
        readFileSync(jwtPublicKeyPath, 'utf8')
        : readString('JWT_PUBLIC_KEY')
    static jwtPrivateKey: string = jwtUseDisk ?
        readFileSync(jwtPrivateKeyPath, 'utf8')
        : readString('JWT_PRIVATE_KEY')

    static pgHost: string = readString('PG_HOST', '127.0.0.1')
    static pgPort: number = readNumber('PG_PORT', 5432)
    static pgUser: string = readString('PG_USER')
    static pgPassword: string = readString('PG_PASSWORD')
    static pgDatabase: string = isTest() ?
        readString('PG_TEST_DATABASE')
        : readString('PG_DATABASE')

    static bcryptSaltRounds: number = readNumber('BCRYPT_SALT_ROUNDS', 10)
}
