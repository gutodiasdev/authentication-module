export interface CreateUSer {
    execute(input: CreateUser.Input): Promise<CreateUser.Ouput>
}

export namespace CreateUser {
    export type Input = {
        email: string
        password: string
        agreeWithPolicies: boolean
    }
    export type Ouput = {
        token: string
        refreshToken: string
        permissions: string[]
    }
}