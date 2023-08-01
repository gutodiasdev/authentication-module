import { hashSync } from "bcrypt"
import { randomUUID } from "crypto"

export class User {
    id: string
    email: string
    password: string
    agreeWithPolicies: boolean
    HASH_SALT = 10

    constructor(input: {
        id: string,
        email: string,
        password: string,
        agreeWithPolicies: boolean
    }) {
        this.id = input.id
        this.email = input.email
        this.password = this.encrypt(input.password)
        this.agreeWithPolicies = input.agreeWithPolicies
    }

    static create(input: Input) {
        const id = randomUUID()
        return new User({ ...input, id })
    }

    private encrypt(password: string): string {
        return hashSync(password, this.HASH_SALT)
    }
}

type Input = {
    email: string,
    password: string,
    agreeWithPolicies: boolean
}