import dotenv from 'dotenv'

dotenv.config()

import 'express-async-errors'
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './router'
import { logger } from './utils/logger'
import { ValidationError } from 'express-json-validator-middleware'

const app = express()
const port = 3000

app.use(cors())
app.use(bodyParser.json())
app.use(router)
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidationError) {
        res.status(400).send(error.validationErrors)
    } else if (error) {
        logger.error(error.stack || error.message)
        res.status(500).send({ message: 'Server Error' })
    } else {
        next()
    }
})

app.listen(port, function () {
    logger.info(`API is listening on port ${port}`)
})
