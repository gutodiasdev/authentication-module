import { hashSync } from 'bcrypt'
import { v4 as uuid } from 'uuid'

export class User {
    id: string
    email: string
    password: string
    agreeWithPolicies: boolean
    permissions?: string[]
    HASH_SALT = 10

    constructor(input: {
        id: string,
        email: string,
        password: string,
        agreeWithPolicies: boolean,
        permissions?: string[]
    }) {
        this.id = input.id
        this.email = input.email
        this.password = this.encrypt(input.password)
        this.agreeWithPolicies = input.agreeWithPolicies
        this.permissions = input.permissions
    }

    static create(input: Input) {
        const id = uuid()
        let standardPermissions = ['read.info', 'update.info', 'delete.info']
        if(input.permissions) standardPermissions = [...standardPermissions, ...input.permissions]
        return new User({ ...input, permissions: standardPermissions, id })
    }

    private encrypt(password: string): string {
        return hashSync(password, this.HASH_SALT)
    }
}

type Input = {
    email: string,
    password: string,
    agreeWithPolicies: boolean,
    permissions?: string[]
}