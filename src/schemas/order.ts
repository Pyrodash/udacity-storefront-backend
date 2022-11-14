import { AllowedSchema } from 'express-json-validator-middleware'

export const addSchema: AllowedSchema = {
    type: 'object',
    required: ['productId', 'quantity'],
    properties: {
        productId: {
            type: 'number',
        },
        quantity: {
            type: 'number',
        },
    },
}
