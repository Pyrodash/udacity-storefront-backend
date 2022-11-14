import { User, UserModel } from '../../models/user'

let userId: number

export default function() {
    describe('User Model Suite', () => {
        it('can add new users', async () => {
            const data: Omit<User, 'id'> = {
                firstName: 'Jeremy',
                lastName: 'Corbyn',
                password: 'test',
            }

            const user = await UserModel.add(data)

            expect(user).toEqual(jasmine.objectContaining({
                firstName: 'Jeremy',
                lastName: 'Corbyn',
            }))

            userId = user.id
        })

        it('can get a list of users', async () => {
            const users = await UserModel.getAll()

            expect(users).toContain(jasmine.objectContaining({
                id: userId,
                firstName: 'Jeremy',
                lastName: 'Corbyn',
            }))
        })

        it('can get a specific user by id', async () => {
            const user = await UserModel.get(userId)

            expect(user).toEqual(jasmine.objectContaining({
                id: userId,
                firstName: 'Jeremy',
                lastName: 'Corbyn',
            }))
        })
    })
}
