import 'jasmine'
import supertest from 'supertest'
import { User } from '../../models/user'
import { app } from '../../server'

const request = supertest(app)

let token: string
let authHeader: string

export default function() {
    describe('User Suite', function() {
        it('won\'t work without a token', async () => {
            const res = await request.get('/users')
            
            expect(res.status).toBe(401)
        })

        it('won\'t add a user with missing data', async () => {
            const data: Omit<User, 'id'> = {
                firstName: '',
                lastName: 'Test',
                password: 'test',
            }

            const res = await request
                .post('/users')
                .send(data)
            
            expect(res.status).toBe(400)
        })

        it('can add new users', async () => {
            const data: Omit<User, 'id'> = {
                firstName: 'Jeremy',
                lastName: 'Corbyn',
                password: 'test',
            }

            const res = await request
                .post('/users')
                .send(data)
            
            expect(res.status).toBe(200)
            expect(res.body).toEqual(jasmine.objectContaining({
                user: jasmine.objectContaining({
                    id: 1,
                    firstName: data.firstName,
                    lastName: data.lastName,
                })
            }))

            token = res.body.token
            authHeader = `Bearer ${token}`
        })

        it('can get a list of users', async () => {            
            const res = await request
                .get('/users')
                .set('Authorization', authHeader)
                
            expect(res.status).toBe(200)
            expect(res.body).toEqual(jasmine.objectContaining({
                users: [
                    jasmine.objectContaining({
                        id: 1,
                        firstName: 'Jeremy',
                        lastName: 'Corbyn',
                    }),
                ]
            }))
        })

        it('returns 404 when you try to fetch a non-existing user', async () => {
            const res = await request
                .get('/users/2')
                .set('Authorization', authHeader)
                
            expect(res.status).toBe(404)
        })

        it('can get a specific user', async () => {
            const res = await request
                .get('/users/1')
                .set('Authorization', authHeader)
            
            expect(res.status).toBe(200)
            expect(res.body).toEqual({
                user: jasmine.objectContaining({
                    id: 1,
                    firstName: 'Jeremy',
                    lastName: 'Corbyn',
                }),
            })
        })
    })
}
