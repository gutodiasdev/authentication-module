export interface TokenRefresher {
    execute(input: TokenRefresher.Input): Promise<TokenRefresher.Output>
}

export namespace TokenRefresher {
    export type Input = {
        refreshToken: string
        id: string
        persmissions: string[]
    }
    export type Output = {
        token: string
        refreshToken: string
    }
}