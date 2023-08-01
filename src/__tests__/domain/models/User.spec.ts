import { User } from "../../../domain/models"

describe('User', function () {
    let sut: User
    const input = {
        id: 'any_id',
        email: 'any_email',
        password: 'any_password',
        agreeWithPolicies: true
    }

    beforeEach(() => {
        sut = new User(input)
    })

    test('it should create an User with full params', function () {
        expect(sut.id).toBe('any_id')
        expect(sut.email).toBe('any_email')
        expect(sut.agreeWithPolicies).toBe(true)
        expect(sut.password).toBeDefined()
    })

    test('it should create an User using static creation', function () {
        const sut = User.create({ email: 'any_email', password: 'any_password', agreeWithPolicies: true })
        expect(sut.id).toBeDefined()
        expect(sut.email).toBeDefined()
        expect(sut.password).toBeDefined()
        expect(sut.agreeWithPolicies).toBeDefined()
    })
})