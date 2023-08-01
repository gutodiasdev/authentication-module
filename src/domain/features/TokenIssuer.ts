export interface TokenIssuer {
    generateToken(input: TokenIssuer.Input): Promise<TokenIssuer.Ouput>
    verify(token: string): Promise<boolean>
}

export namespace TokenIssuer {
    export type Input = {
        id: string
        permissions: string[]
    }

    export type Ouput = {
        token: string
    }
}