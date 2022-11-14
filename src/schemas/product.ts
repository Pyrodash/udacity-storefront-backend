import { AllowedSchema } from 'express-json-validator-middleware'

export const addSchema: AllowedSchema = {
    type: 'object',
    required: ['name', 'price', 'category'],
    properties: {
        name: {
            type: 'string',
        },
        price: {
            type: 'number',
        },
        category: {
            type: 'number',
        },
    },
}
