import { randomUUID } from "crypto"

export class User {
    id: string
    email: string
    password: string
    agreeWithPolicies: boolean

    constructor(input: {
        id: string,
        email: string,
        password: string,
        agreeWithPolicies: boolean
    }) {
        this.id = input.id
        this.email = input.email
        this.password = input.password
        this.agreeWithPolicies = input.agreeWithPolicies
    }

    static create(input: Input) {
        const id = randomUUID()
        return new User({ ...input, id })
    }
}

type Input = {
    email: string,
    password: string,
    agreeWithPolicies: boolean
}

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
        expect(sut).toEqual({
            id: 'any_id',
            email: 'any_email',
            password: 'any_password',
            agreeWithPolicies: true
        })
    })

    test('it should create an User using static creation', function () {
        const sut = User.create({ email: 'any_email', password: 'any_password', agreeWithPolicies: true })
        expect(sut.id).toBeDefined()
        expect(sut.email).toBeDefined()
        expect(sut.password).toBeDefined()
        expect(sut.agreeWithPolicies).toBeDefined()
    })
})