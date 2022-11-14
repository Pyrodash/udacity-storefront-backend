import express, { Request, Response } from 'express'
import authMiddleware from '../middleware/auth'
import ProductModel from '../models/product'
import { addSchema } from '../schemas/product'
import { logger } from '../utils/logger'
import { validate } from '../utils/validator'

const router = express.Router()

router.get('/', async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.getAll()

        res.send({ products })
    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: 'Server Error' })
    }
})

router.post(
    '/',
    authMiddleware,
    validate({ body: addSchema }),
    async (req: Request, res: Response) => {
        try {
            const product = await ProductModel.add(req.body)

            res.send({ product })
        } catch (error) {
            logger.error(error)
            res.status(500).send({ message: 'Server Error' })
        }
    }
)

router.get('/:id', async (req: Request, res: Response) => {
    const productId = Number(req.params.id)
        
    if (!productId) {
        return res.status(400).send({ message: 'Invalid product id' })
    }

    try {
        const product = await ProductModel.get(productId)

        if (!product) {
            res.status(404).send({
                product: null,
                message: 'Not Found',
            })
        } else {
            res.send({ product })
        }
    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: 'Server Error' })
    }
})

router.get('/category/:id', async (req: Request, res: Response) => {
    const categoryId = Number(req.params.id)
        
    if (!categoryId) {
        return res.status(400).send({ message: 'Invalid category id' })
    }

    try {
        const products = await ProductModel.getByCategory(categoryId)
    
        res.send({ products })
    } catch (error) {
        logger.error(error)
        res.status(500).send({ message: 'Server Error' })
    }
})

export default router
