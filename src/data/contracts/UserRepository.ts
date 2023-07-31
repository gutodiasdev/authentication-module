export interface CreateUserRepository {
    createUser(input: CreateUserRepository.Input): Promise<CreateUserRepository.Ouput>
}

export namespace CreateUserRepository {
    export type Input = {
        email: string
        hashedPassword: string
        agreeWithPolicies: boolean
    }
    export type Ouput = {
        id: string
    }
}
