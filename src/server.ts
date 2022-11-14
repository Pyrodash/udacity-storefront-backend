import express, { Request, Response, NextFunction } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import router from './router'
import { logger } from './utils/logger'
import Config from './config'
import { ValidationError } from 'express-json-validator-middleware'

export const app = express()
const port = Config.port

app.use(cors())
app.use(bodyParser.json())
app.use(router)
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof ValidationError) {
        res.status(400).send(error.validationErrors)
    } else {
        next()
    }
})


app.listen(port, function () {
    logger.info(`API is listening on port ${port}`)
})
