export interface SignInUser {
    execute(input: SignInUser.Input): Promise<SignInUser.Output>
}

export namespace SignInUser {
    export type Input = {
        email: string
        password: string
        token: string
    }
    export type Output = {
        id: string
        token: string
        permissions: string[]
    }
}