export interface SaveUserRepository {
    saveUser(input: SaveUserRepository.Input): Promise<SaveUserRepository.Ouput>
}

export namespace SaveUserRepository {
    export type Input = {
        id: string
        email: string
        hashedPassword: string
        agreeWithPolicies: boolean
        permissions?: string[]
    }
    export type Ouput = void
}

export interface CheckUserByEmailRepository {
    checkByEmail(input: CheckUserByEmailRepository.Input): Promise<CheckUserByEmailRepository.Ouput>
}

export namespace CheckUserByEmailRepository {
    export type Input = {
        email: string
    }
    export type Ouput = {
        id: string
    } | undefined
}

export interface FindUserByEmailRepository {
    findByEmail(input: FindUserByEmailRepository.Input): Promise<FindUserByEmailRepository.Ouput>
}

export namespace FindUserByEmailRepository {
    export type Input = {
        email: string
    }
    export type Ouput = {
        id: string
        password: string
        permissions: string[]
    } | undefined
}