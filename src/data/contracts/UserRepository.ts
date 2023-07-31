export interface CreateUserRepository {
    createUser(input: CreateUserRepository.Input): Promise<CreateUserRepository.Ouput>
}

export namespace CreateUserRepository {
    export type Input = {
        email: string
        hashedPassword: string
        agreeWithPolicies: boolean
        permissions?: string[]
    }
    export type Ouput = {
        id: string
    }
}
