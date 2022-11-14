import { AllowedSchema } from 'express-json-validator-middleware'

export const authSchema: AllowedSchema = {
    type: 'object',
    required: ['id', 'password'],
    properties: {
        id: {
            type: 'number',
        },
        password: {
            type: 'string',
        },
    },
}
