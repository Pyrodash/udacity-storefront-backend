import { AllowedSchema } from 'express-json-validator-middleware'

export const addSchema: AllowedSchema = {
    type: 'object',
    required: ['firstName', 'lastName', 'password'],
    properties: {
        firstName: {
            type: 'string',
            minLength: 1,
        },
        lastName: {
            type: 'string',
            minLength: 1,
        },
        password: {
            type: 'string',
            minLength: 1,
        },
    },
}
