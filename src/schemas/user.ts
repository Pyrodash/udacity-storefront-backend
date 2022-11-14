import { AllowedSchema } from 'express-json-validator-middleware'

export const addSchema: AllowedSchema = {
    type: 'object',
    required: ['firstName', 'lastName', 'password'],
    properties: {
        firstName: {
            type: 'string',
        },
        lastName: {
            type: 'string',
        },
        password: {
            type: 'string',
        },
    },
}
