import ProductModel, { Product } from '../../models/product'

let productId: number

export default function() {
    describe('Product Model Suite', () => {
        it('can add new products', async () => {
            const data: Omit<Product, 'id'> = {
                name: 'Telescope',
                price: 200.5,
                category: 1,
            }

            const product = await ProductModel.add(data)

            expect(product).toEqual(jasmine.objectContaining(data))

            productId = product.id
        })

        it('can get a list of products', async () => {
            const products = await ProductModel.getAll()

            expect(products).toContain({
                id: productId,
                name: 'Telescope',
                price: 200.5,
                category: 1,
            })
        })

        it('can get a specific product by id', async () => {
            const product = await ProductModel.get(productId)

            expect(product).toEqual({
                id: productId,
                name: 'Telescope',
                price: 200.5,
                category: 1,
            })
        })
        
        it('can get a list of products in a category', async () => {
            const products = await ProductModel.getByCategory(1)

            expect(products).toContain({
                id: productId,
                name: 'Telescope',
                price: 200.5,
                category: 1,
            })
        })
    })
}
