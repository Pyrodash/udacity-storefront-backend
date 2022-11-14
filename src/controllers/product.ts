import express from 'express'
import authMiddleware from '../middleware/auth'
import ProductModel from '../models/product'
import { addSchema } from '../schemas/product'
import { validate } from '../utils/validator'

const router = express.Router()

router.get('/', async (req, res) => {
    const products = await ProductModel.getAll()

    res.send({ products })
})

router.post(
    '/',
    authMiddleware,
    validate({ body: addSchema }),
    async (req, res) => {
        const product = await ProductModel.add(req.body)

        res.send({ product })
    }
)

router.get('/:id', async (req, res) => {
    const productId = Number(req.params.id)
        
    if (!productId) {
        return res.status(400).send({ message: 'Invalid product id' })
    }

    const product = await ProductModel.get(productId)

    if (!product) {
        res.status(404).send({
            product: null,
            message: 'Not Found',
        })
    } else {
        res.send({ product })
    }
})

router.get('/category/:id', async (req, res) => {
    const categoryId = Number(req.params.id)
        
    if (!categoryId) {
        return res.status(400).send({ message: 'Invalid category id' })
    }

    const products = await ProductModel.getByCategory(categoryId)
    
    res.send({ products })
})

export default router
