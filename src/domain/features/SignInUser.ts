export interface SignInUser {
    execute(input: SignInUser.Input): Promise<SignInUser.Output>
}

export namespace SignInUser {
    export type Input = {
        email: string
        password: string
    }
    export type Output = {
        id: string
        token: string
        refreshToken: string
        permissions: string[]
    }
}